-- The legacy PayPal orders table is intentionally discarded before replacing it.
-- Do not add CASCADE: unexpected dependencies should stop this migration safely.
drop table if exists public.orders;

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  access_token_hash text not null unique,
  customer_email text not null,
  status text not null default 'pending_payment'
    check (status in ('pending_payment', 'paid', 'payment_failed', 'cancelled', 'fulfilled', 'refunded')),
  subtotal_cents integer not null check (subtotal_cents >= 0),
  shipping_cents integer not null default 0 check (shipping_cents >= 0),
  total_cents integer not null check (total_cents > 0 and total_cents = subtotal_cents + shipping_cents),
  currency text not null default 'eur' check (currency = 'eur'),
  stripe_payment_intent_id text unique,
  shipping_name text not null,
  shipping_address_line1 text not null,
  shipping_address_line2 text,
  shipping_city text not null,
  shipping_region text not null,
  shipping_postal_code text not null,
  shipping_country_code text not null default 'ES' check (shipping_country_code = 'ES'),
  shipping_phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  product_name text not null,
  unit_price_cents integer not null check (unit_price_cents > 0),
  quantity integer not null check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (order_id, product_id)
);

create table public.stock_reservations (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  quantity integer not null check (quantity > 0),
  status text not null default 'active'
    check (status in ('active', 'consumed', 'released')),
  expires_at timestamptz not null,
  created_at timestamptz not null default now(),
  unique (order_id, product_id)
);

create table public.stripe_events (
  id text primary key,
  type text not null,
  received_at timestamptz not null default now(),
  processed_at timestamptz,
  processing_error text,
  attempts integer not null default 0 check (attempts >= 0)
);

create index orders_status_created_at_idx
  on public.orders (status, created_at desc);
create index order_items_product_id_idx
  on public.order_items (product_id);
create index stock_reservations_order_id_idx
  on public.stock_reservations (order_id);
create index stock_reservations_product_id_idx
  on public.stock_reservations (product_id);
create index stock_reservations_active_product_expiry_idx
  on public.stock_reservations (product_id, expires_at)
  where status = 'active';

alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.stock_reservations enable row level security;
alter table public.stripe_events enable row level security;

revoke all on table public.orders, public.order_items, public.stock_reservations, public.stripe_events
  from public, anon, authenticated, service_role;
grant select, insert, update on table public.orders to service_role;
grant select, insert on table public.order_items to service_role;
grant select, insert, update on table public.stock_reservations to service_role;
grant select, insert, update on table public.stripe_events to service_role;

create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := pg_catalog.now();
  return new;
end;
$$;

revoke all on function public.set_updated_at() from public, anon, authenticated, service_role;

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create function public.reserve_stock(
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

  select r.*
  into v_existing
  from public.stock_reservations as r
  where r.order_id = p_order_id
    and r.product_id = p_product_id
  for update;

  if found then
    if v_existing.status = 'active'
      and v_existing.expires_at > pg_catalog.now()
      and v_existing.quantity = p_quantity then
      return v_existing.id;
    end if;

    if v_existing.status = 'consumed' then
      raise exception 'This order already consumed its reservation';
    end if;
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

  select coalesce(sum(r.quantity), 0)::integer
  into v_reserved
  from public.stock_reservations as r
  where r.product_id = p_product_id
    and r.status = 'active'
    and r.expires_at > pg_catalog.now();

  if v_stock - v_reserved < p_quantity then
    raise exception 'Insufficient stock';
  end if;

  if v_existing.id is not null then
    update public.stock_reservations
    set quantity = p_quantity,
        status = 'active',
        expires_at = pg_catalog.now() + p_ttl
    where id = v_existing.id
    returning id into v_reservation_id;
  else
    insert into public.stock_reservations (order_id, product_id, quantity, expires_at)
    values (p_order_id, p_product_id, p_quantity, pg_catalog.now() + p_ttl)
    returning id into v_reservation_id;
  end if;

  return v_reservation_id;
end;
$$;

revoke all on function public.reserve_stock(uuid, uuid, integer, interval) from public, anon, authenticated;
grant execute on function public.reserve_stock(uuid, uuid, integer, interval) to service_role;
