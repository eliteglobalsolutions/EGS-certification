create table if not exists public.order_consents (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  tos_accepted boolean not null,
  privacy_accepted boolean not null,
  auth_accepted boolean not null,
  accepted_at timestamptz not null default now(),
  accepted_ip text,
  accepted_user_agent text,
  accepted_locale text,
  tos_version text not null,
  privacy_version text not null,
  auth_version text not null,
  tos_sha256 text not null,
  privacy_sha256 text not null,
  auth_sha256 text not null,
  acceptance_source text not null default 'web_checkout'
);

create unique index if not exists ux_order_consents_order_id on public.order_consents(order_id);
create index if not exists idx_order_consents_accepted_at on public.order_consents(accepted_at desc);

alter table public.order_consents enable row level security;
drop policy if exists "deny all order consents" on public.order_consents;
create policy "deny all order consents"
on public.order_consents
for all
to public
using (false)
with check (false);

-- Expand legacy text status check to allow requires_manual_review.
do $$
declare
  c record;
begin
  for c in
    select conname
    from pg_constraint
    where conrelid = 'public.orders'::regclass
      and contype = 'c'
      and pg_get_constraintdef(oid) like '%status%'
  loop
    execute format('alter table public.orders drop constraint %I', c.conname);
  end loop;

  execute $sql$
    alter table public.orders
      add constraint orders_status_check
      check (status in ('created','paid','processing','need_more_docs','completed','cancelled','requires_manual_review'))
  $sql$;
end $$;
