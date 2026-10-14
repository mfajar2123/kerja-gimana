begin;

-- Profile writes must use the guarded RPCs. The old UPDATE policy allowed a
-- suspended owner to set status='active' and regain write access.
revoke update on public.profiles from authenticated;
drop policy profile_update_self on public.profiles;
alter table private.rate_limits enable row level security;

-- Cover ownership checks, account deletion, and foreign-key lookups.
create index companies_created_by_idx on public.companies(created_by);
create index representatives_author_idx on public.company_representatives(author_id);
create index representatives_verified_by_idx on public.company_representatives(verified_by);
create index responses_author_idx on public.company_responses(author_id);
create index responses_company_idx on public.company_responses(company_id);
create index contacts_author_idx on public.contact_messages(author_id);
create index reports_author_idx on public.review_reports(author_id);
create index moderation_actor_idx on public.moderation_actions(actor_id);
create index audit_actor_idx on public.audit_logs(actor_id);

commit;
