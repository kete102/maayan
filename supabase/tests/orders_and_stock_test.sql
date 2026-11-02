BEGIN;
SELECT plan(23);

select has_table('public', 'orders', 'orders table exists');
select has_table('public', 'order_items', 'order_items table exists');
select has_table('public', 'stock_reservations', 'stock_reservations table exists');
select has_table('public', 'stripe_events', 'stripe_events table exists');

select ok(
  not has_table_privilege('anon', 'public.orders', 'select')
  and not has_table_privilege('anon', 'public.orders', 'insert')
  and not has_table_privilege('anon', 'public.orders', 'update')
  and not has_table_privilege('anon', 'public.orders', 'delete')
  and not has_table_privilege('authenticated', 'public.orders', 'select')
  and not has_table_privilege('authenticated', 'public.orders', 'insert')
  and not has_table_privilege('authenticated', 'public.orders', 'update')
  and not has_table_privilege('authenticated', 'public.orders', 'delete'),
  'orders is inaccessible to client roles'
);
select ok(
  not has_table_privilege('anon', 'public.order_items', 'select')
  and not has_table_privilege('anon', 'public.order_items', 'insert')
  and not has_table_privilege('anon', 'public.order_items', 'update')
  and not has_table_privilege('anon', 'public.order_items', 'delete')
  and not has_table_privilege('authenticated', 'public.order_items', 'select')
  and not has_table_privilege('authenticated', 'public.order_items', 'insert')
  and not has_table_privilege('authenticated', 'public.order_items', 'update')
  and not has_table_privilege('authenticated', 'public.order_items', 'delete'),
  'order_items is inaccessible to client roles'
);
select ok(
  not has_table_privilege('anon', 'public.stock_reservations', 'select')
  and not has_table_privilege('anon', 'public.stock_reservations', 'insert')
  and not has_table_privilege('anon', 'public.stock_reservations', 'update')
  and not has_table_privilege('anon', 'public.stock_reservations', 'delete')
  and not has_table_privilege('authenticated', 'public.stock_reservations', 'select')
  and not has_table_privilege('authenticated', 'public.stock_reservations', 'insert')
  and not has_table_privilege('authenticated', 'public.stock_reservations', 'update')
  and not has_table_privilege('authenticated', 'public.stock_reservations', 'delete'),
  'stock_reservations is inaccessible to client roles'
);
select ok(
  not has_table_privilege('anon', 'public.stripe_events', 'select')
  and not has_table_privilege('anon', 'public.stripe_events', 'insert')
  and not has_table_privilege('anon', 'public.stripe_events', 'update')
  and not has_table_privilege('anon', 'public.stripe_events', 'delete')
  and not has_table_privilege('authenticated', 'public.stripe_events', 'select')
  and not has_table_privilege('authenticated', 'public.stripe_events', 'insert')
  and not has_table_privilege('authenticated', 'public.stripe_events', 'update')
  and not has_table_privilege('authenticated', 'public.stripe_events', 'delete'),
  'stripe_events is inaccessible to client roles'
);
select ok(
  has_table_privilege('service_role', 'public.orders', 'select')
  and has_table_privilege('service_role', 'public.orders', 'insert')
  and has_table_privilege('service_role', 'public.orders', 'update')
  and not has_table_privilege('service_role', 'public.orders', 'delete')
  and has_table_privilege('service_role', 'public.order_items', 'select')
  and has_table_privilege('service_role', 'public.order_items', 'insert')
  and not has_table_privilege('service_role', 'public.order_items', 'update')
  and not has_table_privilege('service_role', 'public.order_items', 'delete')
  and has_table_privilege('service_role', 'public.stock_reservations', 'select')
  and has_table_privilege('service_role', 'public.stock_reservations', 'insert')
  and has_table_privilege('service_role', 'public.stock_reservations', 'update')
  and not has_table_privilege('service_role', 'public.stock_reservations', 'delete')
  and has_table_privilege('service_role', 'public.stripe_events', 'select')
  and has_table_privilege('service_role', 'public.stripe_events', 'insert')
  and has_table_privilege('service_role', 'public.stripe_events', 'update')
  and not has_table_privilege('service_role', 'public.stripe_events', 'delete'),
  'service_role has only the required table privileges'
);
select ok(
  not has_function_privilege('anon', 'public.reserve_stock(uuid,uuid,integer,interval)', 'execute')
  and not has_function_privilege('authenticated', 'public.reserve_stock(uuid,uuid,integer,interval)', 'execute')
  and has_function_privilege('service_role', 'public.reserve_stock(uuid,uuid,integer,interval)', 'execute'),
  'only service_role can execute reserve_stock'
);

select ok(
  (select relrowsecurity from pg_class where oid = 'public.orders'::regclass)
  and (select relrowsecurity from pg_class where oid = 'public.order_items'::regclass)
  and (select relrowsecurity from pg_class where oid = 'public.stock_reservations'::regclass)
  and (select relrowsecurity from pg_class where oid = 'public.stripe_events'::regclass),
  'RLS is enabled on every commerce table'
);

select ok(
  (select pg_get_constraintdef(oid) like '%pending_payment%'
    and pg_get_constraintdef(oid) like '%paid%'
    and pg_get_constraintdef(oid) like '%payment_failed%'
    and pg_get_constraintdef(oid) like '%cancelled%'
    and pg_get_constraintdef(oid) like '%fulfilled%'
    and pg_get_constraintdef(oid) like '%refunded%'
   from pg_constraint
   where conrelid = 'public.orders'::regclass and conname = 'orders_status_check')
  and (select pg_get_constraintdef(oid) like '%active%'
    and pg_get_constraintdef(oid) like '%consumed%'
    and pg_get_constraintdef(oid) like '%released%'
   from pg_constraint
   where conrelid = 'public.stock_reservations'::regclass and conname = 'stock_reservations_status_check'),
  'database status checks match the application status constants'
);

insert into public.orders (
  id, access_token_hash, customer_email, subtotal_cents, shipping_cents, total_cents,
  shipping_name, shipping_address_line1, shipping_city, shipping_region, shipping_postal_code
) values (
  '10000000-0000-0000-0000-000000000001', 'hash-1', 'test@example.com', 2000, 500, 2500,
  'Test User', '1 Test Street', 'Madrid', 'Madrid', '28001'
);

insert into public.order_items (order_id, product_id, product_name, unit_price_cents, quantity)
select '10000000-0000-0000-0000-000000000001', id, name, price_cents, 2
from public.products where slug = 'origen';

select throws_ok(
  $$insert into public.orders (
    access_token_hash, customer_email, subtotal_cents, shipping_cents, total_cents,
    shipping_name, shipping_address_line1, shipping_city, shipping_region, shipping_postal_code
  ) values (
    'invalid-total', 'test@example.com', 2000, 500, 2400,
    'Test User', '1 Test Street', 'Madrid', 'Madrid', '28001'
  )$$,
  '23514', null,
  'order total must equal subtotal plus shipping'
);

select throws_ok(
  $$insert into public.orders (
    access_token_hash, customer_email, status, subtotal_cents, total_cents,
    shipping_name, shipping_address_line1, shipping_city, shipping_region, shipping_postal_code
  ) values (
    'invalid-status', 'test@example.com', 'unknown', 2000, 2000,
    'Test User', '1 Test Street', 'Madrid', 'Madrid', '28001'
  )$$,
  '23514', null,
  'order status must be one of the supported values'
);

set local role service_role;
select ok(
  public.reserve_stock(
    '10000000-0000-0000-0000-000000000001',
    (select id from public.products where slug = 'origen'),
    2
  ) is not null,
  'service_role can reserve stock and receives an id'
);
reset role;

select is(
  public.reserve_stock(
    '10000000-0000-0000-0000-000000000001',
    (select id from public.products where slug = 'origen'),
    2
  ),
  (select id from public.stock_reservations where order_id = '10000000-0000-0000-0000-000000000001'),
  'repeating a live reservation returns the same reservation id'
);

select is(
  (select count(*)::integer from public.stock_reservations where order_id = '10000000-0000-0000-0000-000000000001'),
  1,
  'repeating a live reservation does not create another row'
);

select throws_ok(
  $$select public.reserve_stock(
    '10000000-0000-0000-0000-000000000001',
    (select id from public.products where slug = 'origen'),
    1
  )$$,
  'P0001', 'Reservation quantity must match the order item',
  'reservation quantity must match the order line'
);

update public.stock_reservations
set expires_at = now() - interval '1 minute'
where order_id = '10000000-0000-0000-0000-000000000001';

select lives_ok(
  $$select public.reserve_stock(
    '10000000-0000-0000-0000-000000000001',
    (select id from public.products where slug = 'origen'),
    2
  )$$,
  'expired reservation can be renewed'
);

select ok(
  (select expires_at > now() and status = 'active'
   from public.stock_reservations where order_id = '10000000-0000-0000-0000-000000000001'),
  'renewed reservation is active and has a future expiry'
);

insert into public.orders (
  id, access_token_hash, customer_email, subtotal_cents, total_cents,
  shipping_name, shipping_address_line1, shipping_city, shipping_region, shipping_postal_code
) values (
  '10000000-0000-0000-0000-000000000002', 'hash-2', 'test@example.com', 2800, 2800,
  'Test User', '1 Test Street', 'Madrid', 'Madrid', '28001'
);
insert into public.order_items (order_id, product_id, product_name, unit_price_cents, quantity)
select '10000000-0000-0000-0000-000000000002', id, name, price_cents, 31
from public.products where slug = 'origen';

select throws_ok(
  $$select public.reserve_stock(
    '10000000-0000-0000-0000-000000000002',
    (select id from public.products where slug = 'origen'),
    31
  )$$,
  'P0001', 'Insufficient stock',
  'reservation fails when available stock is insufficient'
);

insert into public.orders (
  id, access_token_hash, customer_email, status, subtotal_cents, total_cents,
  shipping_name, shipping_address_line1, shipping_city, shipping_region, shipping_postal_code
) values (
  '10000000-0000-0000-0000-000000000003', 'hash-3', 'test@example.com', 'paid', 2800, 2800,
  'Test User', '1 Test Street', 'Madrid', 'Madrid', '28001'
);
insert into public.order_items (order_id, product_id, product_name, unit_price_cents, quantity)
select '10000000-0000-0000-0000-000000000003', id, name, price_cents, 1
from public.products where slug = 'origen';

select throws_ok(
  $$select public.reserve_stock(
    '10000000-0000-0000-0000-000000000003',
    (select id from public.products where slug = 'origen'),
    1
  )$$,
  'P0001', 'Stock can only be reserved for a pending order',
  'paid order cannot reserve stock'
);

select throws_ok(
  $$insert into public.stock_reservations (order_id, product_id, quantity, status, expires_at)
  select '10000000-0000-0000-0000-000000000003', id, 1, 'unknown', now() + interval '1 minute'
  from public.products where slug = 'origen'$$,
  '23514', null,
  'reservation status must be one of the supported values'
);

SELECT * FROM finish();
ROLLBACK;
