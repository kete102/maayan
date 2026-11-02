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
    select coalesce(sum(r.quantity), 0)
    into v_reserved_by_others
    from public.stock_reservations as r
    where r.product_id = v_item.product_id
      and r.order_id <> p_order_id
      and r.status = 'active'
      and r.expires_at > pg_catalog.now();

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
    select oi.order_id, oi.product_id, oi.quantity, 'consumed', pg_catalog.now()
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

  if v_order_status <> 'pending_payment' then
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
