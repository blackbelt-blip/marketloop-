-- MarketLoop schema
create type public.event_kind as enum ('view', 'click', 'order');

create table public.stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  phone text not null,
  category text not null,
  location text not null,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.stores to authenticated;
grant select on public.stores to anon;
grant all on public.stores to service_role;

alter table public.stores enable row level security;
create policy "stores public read" on public.stores for select to anon, authenticated using (true);
create policy "stores owner write" on public.stores for all to authenticated
  using (auth.uid() = owner_id) with check (auth.uid() = owner_id);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  price numeric not null,
  image_url text,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete on public.products to authenticated;
grant select on public.products to anon;
grant all on public.products to service_role;

alter table public.products enable row level security;
create policy "products public read" on public.products for select to anon, authenticated using (true);
create policy "products owner write" on public.products for all to authenticated
  using (exists (select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid()))
  with check (exists (select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid()));

create table public.store_events (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  kind public.event_kind not null,
  created_at timestamptz not null default now()
);

grant select on public.store_events to authenticated;
grant insert on public.store_events to anon, authenticated;
grant all on public.store_events to service_role;

alter table public.store_events enable row level security;
create policy "events insert anyone" on public.store_events for insert to anon, authenticated with check (true);
create policy "events owner read" on public.store_events for select to authenticated
  using (exists (select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid()));

create index store_events_store_day on public.store_events (store_id, created_at desc);
