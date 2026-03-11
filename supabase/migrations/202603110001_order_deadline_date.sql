alter table if exists public.orders
  add column if not exists latest_scanned_copy_deadline date;

create index if not exists idx_orders_latest_scanned_copy_deadline
  on public.orders(latest_scanned_copy_deadline);

comment on column public.orders.latest_scanned_copy_deadline
  is 'Latest date by which the customer needs to receive the scanned copy of the apostille/authenticated document.';
