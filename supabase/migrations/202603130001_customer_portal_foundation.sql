create table if not exists public.customer_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  company_name text,
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.orders
  add column if not exists customer_user_id uuid references auth.users(id) on delete set null,
  add column if not exists checkout_mode text not null default 'guest' check (checkout_mode in ('guest', 'customer_portal', 'admin')),
  add column if not exists customer_profile_snapshot jsonb not null default '{}'::jsonb;

create index if not exists idx_orders_customer_user_id on public.orders(customer_user_id);
create index if not exists idx_orders_checkout_mode on public.orders(checkout_mode);

alter table public.customer_profiles enable row level security;

drop policy if exists "customer profiles self read" on public.customer_profiles;
create policy "customer profiles self read"
on public.customer_profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "customer profiles self insert" on public.customer_profiles;
create policy "customer profiles self insert"
on public.customer_profiles
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "customer profiles self update" on public.customer_profiles;
create policy "customer profiles self update"
on public.customer_profiles
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "customer orders self read" on public.orders;
create policy "customer orders self read"
on public.orders
for select
to authenticated
using (auth.uid() = customer_user_id);

drop policy if exists "customer orders self update" on public.orders;
create policy "customer orders self update"
on public.orders
for update
to authenticated
using (auth.uid() = customer_user_id)
with check (auth.uid() = customer_user_id);

drop policy if exists "customer order files self read" on public.order_files;
create policy "customer order files self read"
on public.order_files
for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_files.order_id
      and o.customer_user_id = auth.uid()
  )
);

drop policy if exists "customer order events self read" on public.order_events;
create policy "customer order events self read"
on public.order_events
for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_events.order_id
      and o.customer_user_id = auth.uid()
  )
);
