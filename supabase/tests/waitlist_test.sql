begin;
select plan(27);

select has_table('public', 'waitlist', 'waitlist table exists');

select ok(
  (select relrowsecurity from pg_class where oid = 'public.waitlist'::regclass),
  'RLS is enabled on waitlist'
);

select ok(
  not has_table_privilege('anon', 'public.waitlist', 'select')
  and not has_table_privilege('anon', 'public.waitlist', 'insert')
  and not has_table_privilege('anon', 'public.waitlist', 'update')
  and not has_table_privilege('anon', 'public.waitlist', 'delete')
  and not has_table_privilege('authenticated', 'public.waitlist', 'select')
  and not has_table_privilege('authenticated', 'public.waitlist', 'insert')
  and not has_table_privilege('authenticated', 'public.waitlist', 'update')
  and not has_table_privilege('authenticated', 'public.waitlist', 'delete'),
  'waitlist is inaccessible to client roles'
);

select ok(
  not has_function_privilege('anon', 'public.register_waitlist(text,text,text,boolean)', 'execute')
  and not has_function_privilege('authenticated', 'public.register_waitlist(text,text,text,boolean)', 'execute')
  and has_function_privilege('service_role', 'public.register_waitlist(text,text,text,boolean)', 'execute')
  and not has_function_privilege('anon', 'public.claim_waitlist_email(text)', 'execute')
  and not has_function_privilege('authenticated', 'public.claim_waitlist_email(text)', 'execute')
  and has_function_privilege('service_role', 'public.claim_waitlist_email(text)', 'execute'),
  'waitlist RPCs are restricted to service_role'
);

select ok(
  (select proconfig @> array['search_path=""']
   from pg_proc
   where oid = 'public.register_waitlist(text,text,text,boolean)'::regprocedure)
  and (select proconfig @> array['search_path=""']
   from pg_proc
   where oid = 'public.claim_waitlist_email(text)'::regprocedure),
  'waitlist SECURITY DEFINER RPCs use an empty search_path'
);

delete from public.waitlist;

select is(
  (select count(*)::integer
   from (
     select public.register_waitlist(
       'First',
       'Fifty',
       'waitlist-first-' || g || '@example.com',
       false
     )
     from generate_series(1, 50) as g
   ) registrations),
  50,
  'the first 50 registrations are accepted'
);

select is(
  (select count(*)::integer from public.waitlist),
  50,
  'the first 50 registrations create 50 rows'
);

select is(
  (select count(*)::integer from public.waitlist where discount_code is not null),
  50,
  'the first 50 registrations receive codes'
);

select is(
  (select count(*)::integer
   from public.waitlist
   where discount_code ~ '^MAAYAN-[A-F0-9]{12}$'),
  50,
  'codes use the expected unique format'
);

select is(
  (select count(*)::integer
   from public.waitlist
   where discount_code_expires_at = timestamptz '2027-01-01 08:00:00+00'),
  50,
  'coded registrations share the campaign expiry'
);

select is(
  (select privacy_accepted_at is not null
   and commercial_communications_accepted_at is null
   from public.waitlist
   where user_email = 'waitlist-first-1@example.com'),
  true,
  'commercial consent remains optional'
);

select is(
  (public.register_waitlist(
    'After',
    'Fifty',
    'waitlist-after-50@example.com',
    false
  )->>'status'),
  'created',
  'the 51st registration is accepted'
);

select is(
  (select discount_code from public.waitlist where user_email = 'waitlist-after-50@example.com'),
  null,
  'the 51st registration has no discount code'
);

select is(
  (select discount_code_expires_at from public.waitlist where user_email = 'waitlist-after-50@example.com'),
  null,
  'the 51st registration has no discount expiry'
);

select is(
  (public.register_waitlist(
    'After',
    'Fifty Two',
    'waitlist-after-51@example.com',
    true
  )->>'status'),
  'created',
  'registrations after the code limit remain open'
);

select ok(
  (select commercial_communications_accepted_at is not null
   from public.waitlist
   where user_email = 'waitlist-after-51@example.com'),
  'accepted commercial consent stores a timestamp'
);

select is(
  (public.register_waitlist(
    'After',
    'Fifty Again',
    'waitlist-after-50@example.com',
    true
  )->>'status'),
  'existing',
  'duplicate email registration is idempotent'
);

select is(
  (select count(*)::integer from public.waitlist),
  52,
  'duplicate registration does not create another row'
);

select is(
  (select count(*)::integer from public.stock_reservations),
  0,
  'waitlist registration does not reserve stock'
);

set local role service_role;

with claim as (
  select claim_waitlist_email('waitlist-after-50@example.com') as payload
)
select ok(
  (select (payload->>'code') is null and (payload->>'expiresAt') is null from claim),
  'a no-code registration can be claimed for email delivery'
);

select ok(
  public.finish_waitlist_email(
    'waitlist-after-50@example.com',
    (select confirmation_email_claim_token
     from public.waitlist
     where user_email = 'waitlist-after-50@example.com'),
    true
  ),
  'a no-code email claim can be finalized successfully'
);

select is(
  (select confirmation_email_status
   from public.waitlist
   where user_email = 'waitlist-after-50@example.com'),
  'sent',
  'successful no-code email delivery is marked sent'
);

with claim as (
  select claim_waitlist_email('waitlist-first-1@example.com') as payload
)
select ok(
  (select (payload->>'code') is not null and (payload->>'expiresAt') is not null from claim),
  'a coded registration returns its code and expiry'
);

select ok(
  public.finish_waitlist_email(
    'waitlist-first-1@example.com',
    (select confirmation_email_claim_token
     from public.waitlist
     where user_email = 'waitlist-first-1@example.com'),
    false
  ),
  'a failed email claim can be finalized for retry'
);

select is(
  (select confirmation_email_status
   from public.waitlist
   where user_email = 'waitlist-first-1@example.com'),
  'failed',
  'failed email delivery is marked failed'
);

select is(
  (select confirmation_email_attempts
   from public.waitlist
   where user_email = 'waitlist-first-1@example.com'),
  1,
  'failed delivery increments email attempts'
);

select ok(
  (select confirmation_email_next_retry_at > now()
   from public.waitlist
   where user_email = 'waitlist-first-1@example.com'),
  'failed delivery schedules a future retry'
);

reset role;

select * from finish();
rollback;
