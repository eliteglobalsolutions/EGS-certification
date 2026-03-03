-- Global coordination upgrade (minimal, additive)
-- Safe to run multiple times where supported by IF NOT EXISTS checks.

alter table if exists public.orders
  add column if not exists issuing_country text,
  add column if not exists speed text,
  add column if not exists translation_required boolean default false,
  add column if not exists original_handling boolean default false,
  add column if not exists intake_completed boolean default false,
  add column if not exists agreements jsonb default '{}'::jsonb,
  add column if not exists customer_phone text,
  add column if not exists delivery_address jsonb;

create index if not exists idx_orders_order_code on public.orders(order_code);
create index if not exists idx_orders_client_status on public.orders(client_status);
create index if not exists idx_orders_updated_at on public.orders(updated_at desc);

create or replace view public.order_public_view as
select
  o.order_code,
  coalesce(o.client_status, o.status) as client_status,
  o.client_note,
  o.estimated_days,
  o.updated_at
from public.orders o;

grant select on public.order_public_view to anon, authenticated;
