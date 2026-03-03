alter table if exists public.feedback_submissions
  add column if not exists source_ip text,
  add column if not exists user_agent text;

create index if not exists idx_feedback_source_ip_created
  on public.feedback_submissions(source_ip, created_at desc);
