begin;
select plan(29);

select ok(
  not has_function_privilege('anon', 'public.consume_reservation(uuid)', 'execute')
  and not has_function_privilege('authenticated', 'public.consume_reservation(uuid)', 'execute')
  and has_function_privilege('service_role', 'public.consume_reservation(uuid)', 'execute'),
  'only service_role can execute consume_reservation'
);

select ok(
  not has_function_privilege('anon', 'public.release_reservation(uuid)', 'execute')
  and not has_function_privilege('authenticated', 'public.release_reservation(uuid)', 'execute')
  and has_function_privilege('service_role', 'public.release_reservation(uuid)', 'execute'),
  'only service_role can execute release_reservation'
);

select ok(
  (select proconfig @> array['search_path=""']
   from pg_proc where oid = 'public.consume_reservation(uuid)'::regprocedure)
  and (select proconfig @> array['search_path=""']
   from pg_proc where oid = 'public.release_reservation(uuid)'::regprocedure),
  'both RPCs use an empty search_path'
);

select ok(
  (select pg_get_constraintdef(oid) like '%pending_refund%'
   from pg_constraint
   where conrelid = 'public.orders'::regclass and conname = 'orders_status_check'),
  'orders status check allows pending_refund'
);

insert into public.products (slug, name, short_description, description, price_cents, stock)
values
  ('lifecycle-a', 'Lifecycle A', 'Test product', 'Test product', 100, 5),
  ('lifecycle-b', 'Lifecycle B', 'Test product', 'Test product', 100, 4),
  ('lifecycle-empty', 'Lifecycle Empty', 'Test product', 'Test product', 100, 0);

insert into public.orders (
  id, access_token_hash, customer_email, subtotal_cents, total_cents,
  shipping_name, shipping_address_line1, shipping_city, shipping_region, shipping_postal_code
) values
  ('20000000-0000-0000-0000-000000000001', 'lifecycle-1', 'lifecycle@example.com', 200, 200, 'Test', 'Street 1', 'Madrid', 'Madrid', '28001'),
  ('20000000-0000-0000-0000-000000000002', 'lifecycle-2', 'lifecycle@example.com', 100, 100, 'Test', 'Street 1', 'Madrid', 'Madrid', '28001'),
  ('20000000-0000-0000-0000-000000000003', 'lifecycle-3', 'lifecycle@example.com', 100, 100, 'Test', 'Street 1', 'Madrid', 'Madrid', '28001'),
  ('20000000-0000-0000-0000-000000000004', 'lifecycle-4', 'lifecycle@example.com', 300, 300, 'Test', 'Street 1', 'Madrid', 'Madrid', '28001'),
  ('20000000-0000-0000-0000-000000000005', 'lifecycle-5', 'lifecycle@example.com', 100, 100, 'Test', 'Street 1', 'Madrid', 'Madrid', '28001'),
  ('20000000-0000-0000-0000-000000000006', 'lifecycle-6', 'lifecycle@example.com', 300, 300, 'Test', 'Street 1', 'Madrid', 'Madrid', '28001'),
  ('20000000-0000-0000-0000-000000000008', 'lifecycle-8', 'lifecycle@example.com', 100, 100, 'Test', 'Street 1', 'Madrid', 'Madrid', '28001');

insert into public.orders (
  id, access_token_hash, customer_email, status, subtotal_cents, total_cents,
  shipping_name, shipping_address_line1, shipping_city, shipping_region, shipping_postal_code
) values (
  '20000000-0000-0000-0000-000000000007', 'lifecycle-7', 'lifecycle@example.com', 'payment_failed',
  100, 100, 'Test', 'Street 1', 'Madrid', 'Madrid', '28001'
);

insert into public.order_items (order_id, product_id, product_name, unit_price_cents, quantity)
select '20000000-0000-0000-0000-000000000001'::uuid, id, name, 100, 2 from public.products where slug = 'lifecycle-a'
union all
select '20000000-0000-0000-0000-000000000002'::uuid, id, name, 100, 1 from public.products where slug = 'lifecycle-a'
union all
select '20000000-0000-0000-0000-000000000003'::uuid, id, name, 100, 1 from public.products where slug = 'lifecycle-b'
union all
select '20000000-0000-0000-0000-000000000004'::uuid, id, name, 100, 2 from public.products where slug = 'lifecycle-a'
union all
select '20000000-0000-0000-0000-000000000004'::uuid, id, name, 100, 1 from public.products where slug = 'lifecycle-empty'
union all
select '20000000-0000-0000-0000-000000000006'::uuid, id, name, 100, 1 from public.products where slug = 'lifecycle-a'
union all
select '20000000-0000-0000-0000-000000000006'::uuid, id, name, 100, 2 from public.products where slug = 'lifecycle-b';

insert into public.order_items (order_id, product_id, product_name, unit_price_cents, quantity)
select '20000000-0000-0000-0000-000000000007', id, name, 100, 1 from public.products where slug = 'lifecycle-a';

insert into public.order_items (order_id, product_id, product_name, unit_price_cents, quantity)
select '20000000-0000-0000-0000-000000000008', id, name, 100, 1 from public.products where slug = 'lifecycle-empty';

insert into public.stock_reservations (order_id, product_id, quantity, expires_at)
select '20000000-0000-0000-0000-000000000001', id, 2, now() + interval '15 minutes'
from public.products where slug = 'lifecycle-a';

insert into public.stock_reservations (order_id, product_id, quantity, expires_at)
select '20000000-0000-0000-0000-000000000002', id, 1, now() - interval '1 minute'
from public.products where slug = 'lifecycle-a';

insert into public.stock_reservations (order_id, product_id, quantity, status, expires_at)
select '20000000-0000-0000-0000-000000000003', id, 1, 'active', now() + interval '15 minutes'
from public.products where slug = 'lifecycle-b';

insert into public.stock_reservations (order_id, product_id, quantity, expires_at)
select '20000000-0000-0000-0000-000000000006', id, 1, now() + interval '15 minutes'
from public.products where slug = 'lifecycle-a';

insert into public.stock_reservations (order_id, product_id, quantity, status, expires_at)
select '20000000-0000-0000-0000-000000000004', id, 2, 'released', now() - interval '1 minute'
from public.products where slug = 'lifecycle-a';

insert into public.stock_reservations (order_id, product_id, quantity, expires_at)
select '20000000-0000-0000-0000-000000000007', id, 1, now() + interval '15 minutes'
from public.products where slug = 'lifecycle-a';

insert into public.stock_reservations (order_id, product_id, quantity, expires_at)
select '20000000-0000-0000-0000-000000000008', id, 1, now() - interval '1 minute'
from public.products where slug = 'lifecycle-empty';

set local role service_role;
select public.consume_reservation('20000000-0000-0000-0000-000000000001');
reset role;

select is(
  (select stock from public.products where slug = 'lifecycle-a'),
  3,
  'successful consumption decrements physical stock'
);
select is(
  (select status from public.stock_reservations where order_id = '20000000-0000-0000-0000-000000000001'),
  'consumed',
  'successful consumption marks the reservation consumed'
);

set local role service_role;
select public.consume_reservation('20000000-0000-0000-0000-000000000001');
reset role;
select is(
  (select stock from public.products where slug = 'lifecycle-a'),
  3,
  'retrying successful consumption does not decrement stock twice'
);

set local role service_role;
select public.consume_reservation('20000000-0000-0000-0000-000000000002');
reset role;
select is(
  (select stock from public.products where slug = 'lifecycle-a'),
  2,
  'expired reservation can be consumed when stock remains available'
);
select is(
  (select status from public.stock_reservations where order_id = '20000000-0000-0000-0000-000000000002'),
  'consumed',
  'expired reservation transitions to consumed'
);

set local role service_role;
select public.consume_reservation('20000000-0000-0000-0000-000000000006');
reset role;
select is(
  (select stock from public.products where slug = 'lifecycle-a'),
  1,
  'multi-item order consumes stock for every available product'
);
select is(
  (select stock from public.products where slug = 'lifecycle-b'),
  2,
  'multi-item order decrements the second product stock'
);
select is(
  (select count(*)::integer from public.stock_reservations
   where order_id = '20000000-0000-0000-0000-000000000006' and status = 'consumed'),
  2,
  'multi-item order creates consumed reservations for missing reservations'
);

set local role service_role;
select public.release_reservation('20000000-0000-0000-0000-000000000003');
reset role;
select is(
  (select status from public.orders where id = '20000000-0000-0000-0000-000000000003'),
  'cancelled',
  'explicit release cancels a pending order'
);
select is(
  (select status from public.stock_reservations where order_id = '20000000-0000-0000-0000-000000000003'),
  'released',
  'explicit release releases active reservations'
);

set local role service_role;
select public.release_reservation('20000000-0000-0000-0000-000000000003');
reset role;
select is(
  (select status from public.orders where id = '20000000-0000-0000-0000-000000000003'),
  'cancelled',
  'release retry is idempotent'
);

set local role service_role;
select public.consume_reservation('20000000-0000-0000-0000-000000000003');
reset role;
select is(
  (select status from public.orders where id = '20000000-0000-0000-0000-000000000003'),
  'paid',
  'late successful payment can consume stock after release when available'
);
select is(
  (select status from public.stock_reservations where order_id = '20000000-0000-0000-0000-000000000003'),
  'consumed',
  'late successful payment converts the released reservation to consumed'
);

set local role service_role;
select public.release_reservation('20000000-0000-0000-0000-000000000001');
reset role;
select is(
  (select status from public.stock_reservations where order_id = '20000000-0000-0000-0000-000000000001'),
  'consumed',
  'release never changes a consumed reservation'
);
select is(
  (select status from public.orders where id = '20000000-0000-0000-0000-000000000001'),
  'paid',
  'release does not overwrite a paid order'
);

set local role service_role;
select public.consume_reservation('20000000-0000-0000-0000-000000000004');
reset role;
select is(
  (select status from public.orders where id = '20000000-0000-0000-0000-000000000004'),
  'pending_refund',
  'insufficient stock marks the entire order pending_refund'
);
select is(
  (select stock from public.products where slug = 'lifecycle-a'),
  1,
  'insufficient stock leaves stock for other order items unchanged'
);
select is(
  (select status from public.stock_reservations
   where order_id = '20000000-0000-0000-0000-000000000004'),
  'released',
  'insufficient stock leaves an existing released reservation unchanged'
);

set local role service_role;
select public.consume_reservation('20000000-0000-0000-0000-000000000004');
reset role;
select is(
  (select status from public.orders where id = '20000000-0000-0000-0000-000000000004'),
  'pending_refund',
  'retry keeps pending_refund so the webhook can retry the refund'
);

set local role service_role;
select public.release_reservation('20000000-0000-0000-0000-000000000004');
reset role;
select is(
  (select status from public.orders where id = '20000000-0000-0000-0000-000000000004'),
  'pending_refund',
  'release does not overwrite pending_refund'
);

set local role service_role;
select public.release_reservation('20000000-0000-0000-0000-000000000007');
reset role;
select is(
  (select status from public.orders where id = '20000000-0000-0000-0000-000000000007'),
  'payment_failed',
  'release does not cancel an order after a retryable payment failure'
);
select is(
  (select status from public.stock_reservations where order_id = '20000000-0000-0000-0000-000000000007'),
  'active',
  'retryable payment failure keeps its stock reservation active'
);

set local role service_role;
select public.consume_reservation('20000000-0000-0000-0000-000000000008');
reset role;
select is(
  (select status from public.orders where id = '20000000-0000-0000-0000-000000000008'),
  'pending_refund',
  'expired reservation with no available stock marks the order pending_refund'
);
select is(
  (select status from public.stock_reservations where order_id = '20000000-0000-0000-0000-000000000008'),
  'active',
  'failed consumption leaves an expired reservation unchanged'
);

select throws_ok(
  $$select public.consume_reservation('20000000-0000-0000-0000-000000000005')$$,
  'P0001', 'Order has no items',
  'an order without items is rejected'
);

select * from finish();
rollback;
