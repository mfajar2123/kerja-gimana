-- A curated lookup lets contribution forms preserve a company selected in the directory.
create function public.company_by_id(p_id uuid) returns jsonb
language sql stable security definer set search_path = '' as $$
 select public.company_detail(c.slug) from public.companies c where c.id=p_id and c.status='approved';
$$;
revoke all on function public.company_by_id(uuid) from public;
grant execute on function public.company_by_id(uuid) to anon,authenticated;
