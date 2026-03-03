create table if not exists public.order_submission_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  actor text not null default 'customer',
  event_type text not null,
  channel text not null check (channel in ('portal', 'email')),
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_order_submission_events_order_id
  on public.order_submission_events(order_id);

create index if not exists idx_order_submission_events_created_at
  on public.order_submission_events(created_at desc);

alter table public.order_submission_events enable row level security;

drop policy if exists "order submission owner select" on public.order_submission_events;
create policy "order submission owner select"
on public.order_submission_events
for select
to authenticated
using (
  exists (
    select 1
    from public.orders o
    where o.id = order_submission_events.order_id
      and lower(coalesce(o.customer_email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
);

drop policy if exists "order submission owner insert" on public.order_submission_events;
create policy "order submission owner insert"
on public.order_submission_events
for insert
to authenticated
with check (
  actor = 'customer'
  and exists (
    select 1
    from public.orders o
    where o.id = order_submission_events.order_id
      and lower(coalesce(o.customer_email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  )
);

drop policy if exists "order submission admin select all" on public.order_submission_events;
create policy "order submission admin select all"
on public.order_submission_events
for select
to authenticated
using (
  coalesce(auth.jwt() ->> 'role', '') in ('admin', 'service_role')
);
