create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_no text unique not null,
  access_token text not null,
  status text not null default 'created' check (status in ('created','paid','processing','need_more_docs','completed','cancelled')),
  customer_email text,
  stripe_session_id text unique,
  amount_total integer,
  currency text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_files (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  role text not null check (role in ('customer','admin')),
  file_name text not null,
  storage_path text not null,
  public_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  type text not null,
  message text,
  meta jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_orders_order_no on public.orders(order_no);
create index if not exists idx_order_files_order_id on public.order_files(order_id);
create index if not exists idx_order_events_order_id on public.order_events(order_id);

alter table public.orders enable row level security;
alter table public.order_files enable row level security;
alter table public.order_events enable row level security;

-- By default no anon/authenticated access; server APIs use service-role key.
drop policy if exists "deny all orders" on public.orders;
create policy "deny all orders" on public.orders for all to public using (false) with check (false);

drop policy if exists "deny all files" on public.order_files;
create policy "deny all files" on public.order_files for all to public using (false) with check (false);

drop policy if exists "deny all events" on public.order_events;
create policy "deny all events" on public.order_events for all to public using (false) with check (false);

insert into storage.buckets (id, name, public)
values ('order-uploads', 'order-uploads', false)
on conflict (id) do nothing;

-- Lock bucket to service role only.
drop policy if exists "deny all order-uploads objects" on storage.objects;
create policy "deny all order-uploads objects"
on storage.objects
for all
to public
using (bucket_id = 'order-uploads' and false)
with check (bucket_id = 'order-uploads' and false);
