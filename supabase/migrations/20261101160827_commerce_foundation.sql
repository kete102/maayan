create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text not null,
  description text not null,
  price_cents integer not null check (price_cents > 0),
  stock integer not null default 0 check (stock >= 0),
  image_paths text[] not null default '{}',
  features text[] not null default '{}',
  contents text[] not null default '{}',
  specs jsonb not null default '[]'::jsonb,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

revoke all on public.products from anon, authenticated;
grant select on public.products to anon, authenticated;

create policy "Anyone can read active products"
on public.products
for select
to anon, authenticated
using (active);
