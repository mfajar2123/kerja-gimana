-- Keep curated detail/compare payloads consistent with the directory contract.
create or replace function public.company_detail(p_slug text) returns jsonb language sql stable security definer set search_path = '' as $$
 select jsonb_build_object('id',c.id,'name',c.name,'slug',c.slug,'description',c.description,'website',c.website,
  'verified',c.verified,'industry',i.name,'location',coalesce((select string_agg(distinct l.city,', ' order by l.city) from public.company_locations l where l.company_id=c.id and l.status='approved'),''),'locations',coalesce((select jsonb_agg(jsonb_build_object('city',l.city,'province',l.province) order by l.city) from public.company_locations l where l.company_id=c.id and l.status='approved'),'[]'::jsonb),
  'review_count',(select count(*) from public.reviews r where r.company_id=c.id and r.status='published'),
  'ratings',jsonb_build_object('overall',(select round(avg(rr.overall)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
   'work_life',(select round(avg(rr.work_life)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
   'compensation',(select round(avg(rr.compensation)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
   'management',(select round(avg(rr.management)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
   'career',(select round(avg(rr.career)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published')),
  'salary',public.company_salary_insights(c.id))
 from public.companies c join public.industries i on i.id=c.industry_id where c.slug=left(p_slug,150) and c.status='approved';
$$;
create or replace function public.company_salary_insights(p_company uuid) returns jsonb language sql stable security definer set search_path = '' as $$
 with cohorts as (
  select company_id,lower(role) role,lower(location) location,employment_type,experience_level,salary_basis,
   count(distinct author_id) samples,percentile_cont(0.5) within group(order by case when salary_period='yearly' then base_salary_idr/12 else base_salary_idr end) median
  from public.salary_reports where company_id=p_company and status='published' and exists(select 1 from public.companies c where c.id=p_company and c.status='approved')
  group by company_id,lower(role),lower(location),employment_type,experience_level,salary_basis
  having count(distinct author_id)>=5
 ) select coalesce(jsonb_agg(jsonb_build_object('role',role,'location',location,'employment_type',employment_type,
  'experience_level',experience_level,'salary_basis',salary_basis,
  'sample_band',case when samples<10 then '5–9' when samples<20 then '10–19' else '20+' end,
  'median_monthly',round(median/100000)*100000) order by role,location,experience_level,salary_basis),'[]'::jsonb) from cohorts;
$$;
