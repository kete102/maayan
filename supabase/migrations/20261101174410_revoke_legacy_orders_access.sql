do $$
begin
  if to_regclass('public.orders') is not null then
    alter table public.orders enable row level security;
    revoke all on table public.orders from anon, authenticated;
  end if;
end
$$;
