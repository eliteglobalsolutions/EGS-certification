create table if not exists public.feedback_submissions (
  id uuid primary key default gen_random_uuid(),
  locale text not null default 'en' check (locale in ('en', 'zh')),
  name text not null,
  service_type text,
  quote text not null,
  rating integer not null check (rating between 1 and 5),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  admin_note text,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_feedback_status_created
  on public.feedback_submissions(status, created_at desc);

create index if not exists idx_feedback_locale_status
  on public.feedback_submissions(locale, status, reviewed_at desc);

alter table public.feedback_submissions enable row level security;

drop policy if exists "deny all feedback submissions" on public.feedback_submissions;
create policy "deny all feedback submissions"
on public.feedback_submissions
for all
to public
using (false)
with check (false);
