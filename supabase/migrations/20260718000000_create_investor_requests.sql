-- Investor access requests submitted from the public one-pager form.
create table public.investor_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  investor_type text not null
    constraint investor_requests_investor_type_check
    check (investor_type in ('Angel', 'VC', 'Individual', 'Other')),
  investment_range text not null
    constraint investor_requests_investment_range_check
    check (investment_range in ('Under $10k', '$10k – $50k', '$50k – $100k', '$100k+')),
  heard_about text,
  created_at timestamptz not null default now()
);

comment on table public.investor_requests is
  'Investor access requests from the DirectCuts one-pager contact form.';

alter table public.investor_requests enable row level security;

-- The public form may submit requests; nobody can read them anonymously.
-- Reading is reserved for the service role / dashboard.
create policy "Anyone can submit an investor request"
  on public.investor_requests
  for insert
  to anon
  with check (true);

create index investor_requests_created_at_idx
  on public.investor_requests (created_at desc);
