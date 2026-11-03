-- Allow orders to enter pending_refund when payment succeeded but stock could not be consumed.
alter table public.orders drop constraint orders_status_check;
alter table public.orders add constraint orders_status_check
  check (status in (
    'pending_payment',
    'paid',
    'payment_failed',
    'cancelled',
    'fulfilled',
    'refunded',
    'pending_refund'
));

create or replace function public.reserve_stock(
  p_order_id uuid,
  p_product_id uuid,
  p_quantity integer,
  p_ttl interval default interval '15 minutes'
)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  v_order_status text;
  v_order_quantity integer;
  v_stock integer;
  v_reserved integer;
  v_existing public.stock_reservations%rowtype;
  v_reservation_id uuid;
  v_now timestamptz;
begin
  if p_order_id is null
    or p_product_id is null
    or p_quantity is null
    or p_quantity <= 0
    or p_ttl is null
    or p_ttl <= interval '0'
    or p_ttl > interval '1 day' then
    raise exception 'Invalid stock reservation parameters';
  end if;

  select o.status
  into v_order_status
  from public.orders as o
  where o.id = p_order_id
  for update;

  if not found or v_order_status <> 'pending_payment' then
    raise exception 'Stock can only be reserved for a pending order';
  end if;

  select oi.quantity
  into v_order_quantity
  from public.order_items as oi
  where oi.order_id = p_order_id
    and oi.product_id = p_product_id;

  if not found or v_order_quantity <> p_quantity then
    raise exception 'Reservation quantity must match the order item';
  end if;

  select p.stock
  into v_stock
  from public.products as p
  where p.id = p_product_id
    and p.active
  for update;

  if not found then
    raise exception 'Product is unavailable';
  end if;

  select r.*
  into v_existing
  from public.stock_reservations as r
  where r.order_id = p_order_id
    and r.product_id = p_product_id
  for update;

  v_now := pg_catalog.clock_timestamp();

  if found then
    if v_existing.status = 'active'
      and v_existing.expires_at > v_now
      and v_existing.quantity = p_quantity then
      update public.stock_reservations
      set expires_at = v_now + p_ttl
      where id = v_existing.id
      returning id into v_reservation_id;

      return v_reservation_id;
    end if;

    if v_existing.status = 'consumed' then
      raise exception 'This order already consumed its reservation';
    end if;
  end if;

  select coalesce(sum(r.quantity), 0)::integer
  into v_reserved
  from public.stock_reservations as r
  where r.product_id = p_product_id
    and r.status = 'active'
    and r.expires_at > v_now;

  if v_stock - v_reserved < p_quantity then
    raise exception 'Insufficient stock';
  end if;

  if v_existing.id is not null then
    update public.stock_reservations
    set quantity = p_quantity,
        status = 'active',
        expires_at = v_now + p_ttl
    where id = v_existing.id
    returning id into v_reservation_id;
  else
    insert into public.stock_reservations (order_id, product_id, quantity, expires_at)
    values (p_order_id, p_product_id, p_quantity, v_now + p_ttl)
    returning id into v_reservation_id;
  end if;

  return v_reservation_id;
end;
$$;

revoke all on function public.reserve_stock(uuid, uuid, integer, interval) from public, anon, authenticated;
grant execute on function public.reserve_stock(uuid, uuid, integer, interval) to service_role;

create or replace function public.consume_reservation(p_order_id uuid)
returns text
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_order_status text;
  v_item record;
  v_reserved_by_others bigint;
  v_all_available boolean := true;
  v_now timestamptz;
begin
  select o.status
  into v_order_status
  from public.orders as o
  where o.id = p_order_id
  for update;

  if not found then
    raise exception 'Order not found';
  end if;

  if v_order_status not in ('pending_payment', 'payment_failed', 'cancelled') then
    return v_order_status;
  end if;

  if not exists (
    select 1 from public.order_items as oi where oi.order_id = p_order_id
  ) then
    raise exception 'Order has no items';
  end if;

  for v_item in
    select oi.product_id, oi.quantity, p.stock
    from public.order_items as oi
    join public.products as p on p.id = oi.product_id
    where oi.order_id = p_order_id
    order by oi.product_id
    for update of p
  loop
    v_now := pg_catalog.clock_timestamp();

    select coalesce(sum(r.quantity), 0)
    into v_reserved_by_others
    from public.stock_reservations as r
    where r.product_id = v_item.product_id
      and r.order_id <> p_order_id
      and r.status = 'active'
      and r.expires_at > v_now;

    if v_item.stock - v_reserved_by_others < v_item.quantity then
      v_all_available := false;
    end if;
  end loop;

  if not v_all_available then
    update public.orders
    set status = 'pending_refund'
    where id = p_order_id;

    return 'pending_refund';
  end if;

  update public.products as p
  set stock = p.stock - oi.quantity
  from public.order_items as oi
  where oi.order_id = p_order_id
    and oi.product_id = p.id;

  insert into public.stock_reservations (order_id, product_id, quantity, status, expires_at)
  select oi.order_id, oi.product_id, oi.quantity, 'consumed', pg_catalog.clock_timestamp()
  from public.order_items as oi
  where oi.order_id = p_order_id
  on conflict (order_id, product_id)
  do update set status = 'consumed', quantity = excluded.quantity;

  update public.orders
  set status = 'paid'
  where id = p_order_id;

  return 'paid';
end;
$$;

revoke all on function public.consume_reservation(uuid) from public, anon, authenticated;
grant execute on function public.consume_reservation(uuid) to service_role;

create or replace function public.release_reservation(p_order_id uuid)
returns text
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_order_status text;
begin
  select o.status
  into v_order_status
  from public.orders as o
  where o.id = p_order_id
  for update;

  if not found then
    raise exception 'Order not found';
  end if;

  if v_order_status not in ('pending_payment', 'payment_failed') then
    return v_order_status;
  end if;

  update public.stock_reservations
  set status = 'released'
  where order_id = p_order_id
    and status = 'active';

  update public.orders
  set status = 'cancelled'
  where id = p_order_id;

  return 'cancelled';
end;
$$;

revoke all on function public.release_reservation(uuid) from public, anon, authenticated;
grant execute on function public.release_reservation(uuid) to service_role;
