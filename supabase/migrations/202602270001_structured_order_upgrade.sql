alter table if exists public.orders
  add column if not exists order_code text unique,
  add column if not exists locale text default 'en',
  add column if not exists destination_country text,
  add column if not exists service_type text,
  add column if not exists document_type text,
  add column if not exists document_quantity integer default 1,
  add column if not exists delivery_method text,
  add column if not exists estimated_days text,
  add column if not exists subtotal_amount integer,
  add column if not exists service_fee integer,
  add column if not exists internal_status text,
  add column if not exists client_status text,
  add column if not exists internal_note text,
  add column if not exists client_note text,
  add column if not exists paid_at timestamptz,
  add column if not exists invoice_url text;

update public.orders
set order_code = coalesce(order_code, order_no)
where order_code is null;

update public.orders
set internal_status = coalesce(
    internal_status,
    case
      when status in ('created') then 'received'
      when status in ('paid') then 'initial_verification'
      when status in ('processing') then 'processing'
      when status in ('need_more_docs') then 'awaiting_documents'
      when status in ('completed') then 'completed'
      when status in ('cancelled') then 'cancelled'
      else 'initial_verification'
    end
  ),
  client_status = coalesce(
    client_status,
    case
      when status in ('created') then 'received'
      when status in ('paid') then 'under_verification'
      when status in ('processing') then 'submitted_processing'
      when status in ('need_more_docs') then 'action_required'
      when status in ('completed') then 'completed'
      when status in ('cancelled') then 'cancelled'
      else 'under_verification'
    end
  )
where internal_status is null or client_status is null;

create table if not exists public.orders_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  client_status text not null,
  note text,
  created_by text default 'system',
  created_at timestamptz not null default now()
);

create index if not exists idx_orders_history_order on public.orders_history(order_id);

insert into public.orders_history (order_id, client_status, note, created_at)
select o.id,
       coalesce(o.client_status, 'under_verification'),
       coalesce(o.client_note, 'Initial record imported from legacy status.'),
       o.updated_at
from public.orders o
where not exists (
  select 1 from public.orders_history h where h.order_id = o.id
);

alter table public.orders_history enable row level security;
drop policy if exists "deny all orders history" on public.orders_history;
create policy "deny all orders history"
on public.orders_history
for all
to public
using (false)
with check (false);
