alter table if exists public.orders
  add column if not exists invoice_number text,
  add column if not exists invoice_issue_date timestamptz,
  add column if not exists invoice_pdf_path text,
  add column if not exists invoice_pdf_url text,
  add column if not exists invoice_generated_at timestamptz,
  add column if not exists paid_email_sent_at timestamptz,
  add column if not exists email_last_error text;

create table if not exists public.invoice_line_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  description text not null,
  qty integer not null default 1,
  unit_amount_cents integer not null default 0,
  amount_cents integer not null default 0,
  sort_order integer not null default 100,
  created_at timestamptz not null default now()
);

create index if not exists idx_invoice_line_items_order on public.invoice_line_items(order_id, sort_order, created_at);

alter table public.invoice_line_items enable row level security;

drop policy if exists "deny all invoice line items" on public.invoice_line_items;
create policy "deny all invoice line items"
on public.invoice_line_items
for all
to public
using (false)
with check (false);

insert into storage.buckets (id, name, public)
values ('invoices', 'invoices', false)
on conflict (id) do nothing;

drop policy if exists "deny all invoices objects" on storage.objects;
create policy "deny all invoices objects"
on storage.objects
for all
to public
using (bucket_id = 'invoices' and false)
with check (bucket_id = 'invoices' and false);
