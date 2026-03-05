create table if not exists public.order_payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null default 'stripe',
  event_type text not null,
  status text,
  amount integer,
  currency text,
  stripe_event_id text,
  stripe_session_id text,
  stripe_payment_intent_id text,
  stripe_charge_id text,
  stripe_refund_id text,
  stripe_dispute_id text,
  receipt_url text,
  risk_level text,
  risk_score integer,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_order_payments_order on public.order_payments(order_id, created_at desc);
create index if not exists idx_order_payments_session on public.order_payments(stripe_session_id);
create index if not exists idx_order_payments_payment_intent on public.order_payments(stripe_payment_intent_id);
create index if not exists idx_order_payments_charge on public.order_payments(stripe_charge_id);
create index if not exists idx_order_payments_dispute on public.order_payments(stripe_dispute_id);
create unique index if not exists ux_order_payments_stripe_event on public.order_payments(stripe_event_id) where stripe_event_id is not null;

alter table public.order_payments enable row level security;
drop policy if exists "deny all order payments" on public.order_payments;
create policy "deny all order payments"
on public.order_payments
for all
to public
using (false)
with check (false);
