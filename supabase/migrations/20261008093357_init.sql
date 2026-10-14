begin;
create extension if not exists pgcrypto with schema extensions;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
grant usage on schema private to service_role;

create table public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 display_name text not null default 'Pengguna' check (char_length(display_name) between 1 and 60),
 role text not null default 'user' check (role in ('user','admin')),
 status text not null default 'active' check (status in ('active','suspended')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.industries (
 id uuid primary key default gen_random_uuid(), name text not null unique, slug text not null unique, is_active boolean not null default true
);
create table public.companies (
 id uuid primary key default gen_random_uuid(), name text not null, slug text not null unique,
 industry_id uuid not null references public.industries(id), description text not null,
 website text check(website is null or website like 'https://%'),
 status text not null default 'pending' check(status in ('pending','approved','rejected','removed')),
 verified boolean not null default false, featured boolean not null default false,
 created_by uuid references auth.users(id) on delete set null,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check(char_length(name) between 2 and 120), check(char_length(description) between 20 and 2000)
);
create index company_search_name on public.companies(lower(name)) where status='approved';
create index company_industry on public.companies(industry_id) where status='approved';
create table public.company_locations (
 id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
 city text not null, province text, status text not null default 'pending' check(status in ('pending','approved','rejected')),
 created_at timestamptz not null default now(), unique(company_id,city)
);
create index company_city on public.company_locations(lower(city));

create table public.reviews (
 id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id),
 author_id uuid not null references auth.users(id) on delete cascade, job_title text not null,
 employment_status text not null check(employment_status in ('current','former')),
 employment_start smallint not null check(employment_start between 1970 and 2100), employment_end smallint,
 positives text not null, improvements text not null, advice text not null default '',
 status text not null default 'pending' check(status in ('draft','pending','published','rejected','removed')),
 moderation_reason text, moderation_note text, published_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check((employment_status='current' and employment_end is null) or (employment_status='former' and employment_end>=employment_start)),
 check(char_length(job_title) between 2 and 100 and char_length(positives) between 30 and 4000
   and char_length(improvements) between 30 and 4000 and char_length(advice)<=2000)
);
create unique index review_one_active on public.reviews(author_id,company_id) where status in ('draft','pending','published');
create index review_public on public.reviews(company_id,published_at desc) where status='published';
create index review_private on public.reviews(author_id,created_at desc);
create table public.review_ratings (
 review_id uuid primary key references public.reviews(id) on delete cascade,
 overall smallint not null check(overall between 1 and 5), work_life smallint not null check(work_life between 1 and 5),
 compensation smallint not null check(compensation between 1 and 5), management smallint not null check(management between 1 and 5),
 career smallint not null check(career between 1 and 5)
);

create table public.salary_reports (
 id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id),
 author_id uuid not null references auth.users(id) on delete cascade, role text not null, location text not null,
 employment_type text not null check(employment_type in ('full_time','part_time','contract','internship')),
 experience_level text not null check(experience_level in ('entry','mid','senior','lead')),
 base_salary_idr numeric(12,2) not null check(base_salary_idr between 10000 and 10000000000),
 salary_period text not null check(salary_period in ('monthly','yearly')),
 salary_basis text not null check(salary_basis in ('gross','take_home')),
 allowances_idr_monthly numeric(12,2) not null default 0 check(allowances_idr_monthly between 0 and 1000000000),
 bonus_idr_yearly numeric(12,2) not null default 0 check(bonus_idr_yearly between 0 and 1000000000),
 status text not null default 'pending' check(status in ('pending','published','rejected','removed')),
 moderation_reason text, moderation_note text, published_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check(char_length(role) between 2 and 100 and char_length(location) between 2 and 100)
);
create unique index salary_one_cohort on public.salary_reports(author_id,company_id,(lower(role)),(lower(location)),employment_type,experience_level,salary_basis)
 where status in ('pending','published');
create index salary_private on public.salary_reports(author_id,created_at desc);
create index salary_company on public.salary_reports(company_id,status,salary_basis) where status='published';

create table public.interview_experiences (
 id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id),
 author_id uuid not null references auth.users(id) on delete cascade, position text not null, stages text not null,
 difficulty smallint not null check(difficulty between 1 and 5), experience text not null check(experience in ('positive','neutral','negative')),
 duration_days smallint not null check(duration_days between 0 and 365), questions text not null,
 outcome text not null default 'unknown' check(outcome in ('offer','rejected','withdrew','unknown')),
 status text not null default 'pending' check(status in ('pending','published','rejected','removed')),
 moderation_reason text, moderation_note text, published_at timestamptz,
 created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
 check(char_length(position) between 2 and 100 and char_length(stages) between 5 and 2000 and char_length(questions) between 20 and 4000)
);
create unique index interview_one_active on public.interview_experiences(author_id,company_id,(lower(position))) where status in ('pending','published');
create index interview_public on public.interview_experiences(company_id,published_at desc) where status='published';
create index interview_private on public.interview_experiences(author_id,created_at desc);

create table public.review_reports (
 id uuid primary key default gen_random_uuid(), review_id uuid not null references public.reviews(id) on delete cascade,
 author_id uuid not null references auth.users(id) on delete cascade,
 reason text not null check(reason in ('privacy','harassment','spam','disputed_claim')),
 details text not null, status text not null default 'pending' check(status in ('pending','resolved','rejected')),
 moderation_note text, created_at timestamptz not null default now(), resolved_at timestamptz,
 unique(review_id,author_id),check(char_length(details) between 20 and 2000)
);
create index report_queue on public.review_reports(created_at) where status='pending';
create table public.company_representatives (
 id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id) on delete cascade,
 author_id uuid not null references auth.users(id) on delete cascade,
 status text not null default 'pending' check(status in ('pending','verified','rejected','revoked')),
 verification_evidence text, verified_by uuid references auth.users(id) on delete set null, verified_at timestamptz,
 created_at timestamptz not null default now(), unique(company_id,author_id),check(char_length(coalesce(verification_evidence,''))<=2000)
);
create table public.company_responses (
 id uuid primary key default gen_random_uuid(), company_id uuid not null references public.companies(id),
 review_id uuid references public.reviews(id) on delete set null,
 author_id uuid not null references auth.users(id) on delete cascade, content text not null, evidence text not null,
 status text not null default 'pending' check(status in ('pending','published','rejected','removed')),
 moderation_reason text, moderation_note text, published_at timestamptz, created_at timestamptz not null default now(),
 check(char_length(content) between 30 and 4000 and char_length(evidence) between 20 and 2000)
);
create index response_public on public.company_responses(review_id,published_at desc) where status='published';
create table public.contact_messages (
 id uuid primary key default gen_random_uuid(), author_id uuid references auth.users(id) on delete set null,
 email text not null, subject text not null, message text not null,
 status text not null default 'pending' check(status in ('pending','resolved','rejected')),
 created_at timestamptz not null default now(),
 check(char_length(email)<=254 and char_length(subject) between 3 and 120 and char_length(message) between 20 and 4000)
);
create table public.moderation_actions (
 id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id) on delete set null,
 content_type text not null check(content_type in ('review','salary','interview','company','report','response','representative','contact')),
 content_id uuid not null, from_status text, to_status text not null,
 reason text not null check(reason in ('meets_guidelines','privacy','spam','unsupported_claim','harassment','duplicate','other')),
 note text not null, created_at timestamptz not null default now(),check(char_length(note) between 10 and 2000)
);
create index moderation_audit_content on public.moderation_actions(content_type,content_id,created_at desc);
create table public.audit_logs (
 id uuid primary key default gen_random_uuid(), actor_id uuid references auth.users(id) on delete set null,
 action text not null, target_type text not null, target_id uuid, metadata jsonb not null default '{}',
 created_at timestamptz not null default now(),check(pg_column_size(metadata)<=2048)
);
create index audit_created on public.audit_logs(created_at desc);
create table private.rate_limits (
 bucket_key text not null,window_start timestamptz not null,hits integer not null default 1 check(hits>0),
 primary key(bucket_key,window_start)
);

create function private.is_admin() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.profiles p where p.id=(select auth.uid()) and p.role='admin' and p.status='active');
$$;
create function private.is_verified_active_user() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from auth.users u join public.profiles p on p.id=u.id
   where u.id=(select auth.uid()) and u.email_confirmed_at is not null and p.status='active');
$$;
create function private.has_representative(p_company uuid) returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.company_representatives r where r.company_id=p_company
   and r.author_id=(select auth.uid()) and r.status='verified');
$$;
revoke all on function private.is_admin(),private.is_verified_active_user(),private.has_representative(uuid) from public,anon,authenticated;
grant usage on schema private to anon,authenticated;
grant execute on function private.is_admin(),private.is_verified_active_user(),private.has_representative(uuid) to anon,authenticated;
grant execute on function private.is_admin(),private.is_verified_active_user(),private.has_representative(uuid) to authenticated;

create function public.on_auth_user_created() returns trigger language plpgsql security definer set search_path = '' as $$
begin
 insert into public.profiles(id,display_name) values(new.id,'Pengguna') on conflict(id) do nothing;
 return new;
end;
$$;
create trigger auth_user_profile after insert on auth.users for each row execute function public.on_auth_user_created();
revoke all on function public.on_auth_user_created() from public,anon,authenticated;

alter table public.profiles enable row level security;
alter table public.industries enable row level security;
alter table public.companies enable row level security;
alter table public.company_locations enable row level security;
alter table public.reviews enable row level security;
alter table public.review_ratings enable row level security;
alter table public.salary_reports enable row level security;
alter table public.interview_experiences enable row level security;
alter table public.review_reports enable row level security;
alter table public.company_representatives enable row level security;
alter table public.company_responses enable row level security;
alter table public.contact_messages enable row level security;
alter table public.moderation_actions enable row level security;
alter table public.audit_logs enable row level security;
create policy profile_self on public.profiles for select to authenticated using(id=(select auth.uid()));
create policy profile_admin on public.profiles for select to authenticated using((select private.is_admin()));
create policy profile_update_self on public.profiles for update to authenticated using(id=(select auth.uid()))
 with check(id=(select auth.uid()) and role='user' and status='active');
create policy industry_read on public.industries for select to anon,authenticated using(is_active);
create policy industry_admin on public.industries for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy company_admin on public.companies for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy location_read on public.company_locations for select to anon,authenticated
 using(status='approved' and exists(select 1 from public.companies c where c.id=company_id and c.status='approved'));
create policy location_admin on public.company_locations for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy review_owner on public.reviews for select to authenticated using(author_id=(select auth.uid()));
create policy review_admin on public.reviews for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy rating_owner on public.review_ratings for select to authenticated
 using(exists(select 1 from public.reviews r where r.id=review_id and r.author_id=(select auth.uid())));
create policy rating_admin on public.review_ratings for select to authenticated using((select private.is_admin()));
create policy salary_owner on public.salary_reports for select to authenticated using(author_id=(select auth.uid()));
create policy salary_admin on public.salary_reports for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy interview_owner on public.interview_experiences for select to authenticated using(author_id=(select auth.uid()));
create policy interview_admin on public.interview_experiences for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy report_owner on public.review_reports for select to authenticated using(author_id=(select auth.uid()));
create policy report_admin on public.review_reports for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy representative_owner on public.company_representatives for select to authenticated using(author_id=(select auth.uid()));
create policy representative_admin on public.company_representatives for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy response_owner on public.company_responses for select to authenticated using(author_id=(select auth.uid()));
create policy response_admin on public.company_responses for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy contact_owner on public.contact_messages for select to authenticated using(author_id=(select auth.uid()));
create policy contact_admin on public.contact_messages for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy moderation_admin on public.moderation_actions for all to authenticated using((select private.is_admin())) with check((select private.is_admin()));
create policy audit_admin on public.audit_logs for select to authenticated using((select private.is_admin()));
revoke all on all tables in schema public from anon,authenticated;
grant select on public.industries,public.company_locations to anon,authenticated;
grant select,update on public.profiles to authenticated;
grant select on public.companies,public.reviews,public.review_ratings,public.salary_reports,public.interview_experiences,
 public.review_reports,public.company_representatives,public.company_responses,public.contact_messages,
 public.moderation_actions,public.audit_logs to authenticated;
grant update on public.reviews,public.salary_reports,public.interview_experiences,public.company_responses to authenticated;

-- Public reads return curated projections only; private contribution author IDs can never appear.
create function public.company_salary_insights(p_company uuid) returns jsonb language sql stable security definer set search_path = '' as $$
 with cohorts as (
  select company_id,lower(role) role,lower(location) location,employment_type,experience_level,salary_basis,
   count(distinct author_id) samples,percentile_cont(0.5) within group(order by case when salary_period='yearly' then base_salary_idr/12 else base_salary_idr end) median
  from public.salary_reports where company_id=p_company and status='published'
  group by company_id,lower(role),lower(location),employment_type,experience_level,salary_basis
  having count(distinct author_id)>=5
 ) select coalesce(jsonb_agg(jsonb_build_object('role',role,'location',location,'employment_type',employment_type,
  'experience_level',experience_level,'salary_basis',salary_basis,
  'sample_band',case when samples<10 then '5–9' when samples<20 then '10–19' else '20+' end,
  'median_monthly',round(median/100000)*100000) order by role,location,experience_level,salary_basis),'[]'::jsonb) from cohorts;
$$;
create function public.company_search(p_query text default '',p_industry text default '',p_location text default '',p_page integer default 1)
 returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare v_items jsonb;v_total integer;v_page integer:=greatest(coalesce(p_page,1),1);
begin
 p_query:=left(coalesce(p_query,''),100);p_industry:=left(coalesce(p_industry,''),80);p_location:=left(coalesce(p_location,''),100);
 select count(*) into v_total from public.companies c join public.industries i on i.id=c.industry_id
  where c.status='approved' and (p_query='' or c.name ilike '%'||replace(replace(p_query,'%','\%'),'_','\_')||'%')
   and (p_industry='' or i.slug=p_industry)
   and (p_location='' or exists(select 1 from public.company_locations l where l.company_id=c.id and l.status='approved' and l.city ilike '%'||p_location||'%'));
 select coalesce(jsonb_agg(row_value order by featured desc,name),'[]'::jsonb) into v_items from (
  select c.name,c.featured,jsonb_build_object('id',c.id,'name',c.name,'slug',c.slug,'industry',i.name,
   'location',coalesce((select string_agg(distinct l.city,', ' order by l.city) from public.company_locations l where l.company_id=c.id and l.status='approved'),''),
   'description',c.description,'website',c.website,'verified',c.verified,'featured',c.featured,
   'review_count',(select count(*) from public.reviews r where r.company_id=c.id and r.status='published'),
   'ratings',jsonb_build_object(
    'overall',(select round(avg(rr.overall)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
    'work_life',(select round(avg(rr.work_life)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
    'compensation',(select round(avg(rr.compensation)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
    'management',(select round(avg(rr.management)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
    'career',(select round(avg(rr.career)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published')),
   'salary',public.company_salary_insights(c.id)) row_value
  from public.companies c join public.industries i on i.id=c.industry_id where c.status='approved'
   and (p_query='' or c.name ilike '%'||replace(replace(p_query,'%','\%'),'_','\_')||'%')
   and (p_industry='' or i.slug=p_industry)
   and (p_location='' or exists(select 1 from public.company_locations l where l.company_id=c.id and l.status='approved' and l.city ilike '%'||p_location||'%'))
  order by c.featured desc,c.name limit 20 offset ((v_page-1)*20)
 ) q;
 return jsonb_build_object('companies',v_items,'total',v_total,'page',v_page,'per_page',20);
end;$$;
create function public.company_detail(p_slug text) returns jsonb language sql stable security definer set search_path = '' as $$
 select jsonb_build_object('id',c.id,'name',c.name,'slug',c.slug,'description',c.description,'website',c.website,
  'verified',c.verified,'industry',i.name,'locations',coalesce((select jsonb_agg(jsonb_build_object('city',l.city,'province',l.province) order by l.city) from public.company_locations l where l.company_id=c.id and l.status='approved'),'[]'::jsonb),
  'review_count',(select count(*) from public.reviews r where r.company_id=c.id and r.status='published'),
  'ratings',jsonb_build_object('overall',(select round(avg(rr.overall)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
   'work_life',(select round(avg(rr.work_life)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
   'compensation',(select round(avg(rr.compensation)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
   'management',(select round(avg(rr.management)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published'),
   'career',(select round(avg(rr.career)::numeric,2) from public.reviews r join public.review_ratings rr on rr.review_id=r.id where r.company_id=c.id and r.status='published')),
  'salary',public.company_salary_insights(c.id))
 from public.companies c join public.industries i on i.id=c.industry_id where c.slug=left(p_slug,150) and c.status='approved';
$$;
create function public.company_reviews(p_slug text,p_page integer default 1) returns jsonb language sql stable security definer set search_path = '' as $$
 with c as(select id from public.companies where slug=left(p_slug,150) and status='approved'),
 rows as(select r.id,r.job_title,r.employment_status,r.employment_start,r.employment_end,r.positives,r.improvements,r.advice,
  to_char(r.published_at at time zone 'UTC','YYYY-MM') published_month,
  jsonb_build_object('overall',rr.overall,'work_life',rr.work_life,'compensation',rr.compensation,'management',rr.management,'career',rr.career) ratings,
  coalesce((select jsonb_agg(jsonb_build_object('id',response.id,'content',response.content,
   'published_month',to_char(response.published_at at time zone 'UTC','YYYY-MM')) order by response.published_at)
   from public.company_responses response where response.review_id=r.id and response.status='published'),'[]'::jsonb) company_responses
  from public.reviews r join public.review_ratings rr on rr.review_id=r.id join c on c.id=r.company_id where r.status='published'
  order by r.published_at desc limit 20 offset ((greatest(p_page,1)-1)*20))
 select jsonb_build_object('reviews',coalesce((select jsonb_agg(to_jsonb(rows)) from rows),'[]'::jsonb),
  'total',(select count(*) from public.reviews r join c on c.id=r.company_id where r.status='published'),
  'page',greatest(p_page,1),'per_page',20);
$$;
create function public.company_interviews(p_slug text,p_page integer default 1) returns jsonb language sql stable security definer set search_path = '' as $$
 with c as(select id from public.companies where slug=left(p_slug,150) and status='approved'),
 rows as(select x.id,x.position,x.stages,x.difficulty,x.experience,x.duration_days,x.questions,x.outcome
  from public.interview_experiences x join c on c.id=x.company_id where x.status='published'
  order by x.published_at desc limit 20 offset ((greatest(p_page,1)-1)*20))
 select jsonb_build_object('interviews',coalesce((select jsonb_agg(to_jsonb(rows)) from rows),'[]'::jsonb),
  'total',(select count(*) from public.interview_experiences x join c on c.id=x.company_id where x.status='published'),
  'page',greatest(p_page,1),'per_page',20);
$$;
create function public.company_statistics() returns jsonb language sql stable security definer set search_path = '' as $$
 select jsonb_build_object('companies',(select count(*) from public.companies where status='approved'),
  'reviews',(select count(*) from public.reviews where status='published'),
  'salary_reports',(select count(*) from public.salary_reports where status='published'));
$$;
create function public.compare_companies(p_ids uuid[]) returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
 if coalesce(array_length(p_ids,1),0)<2 or array_length(p_ids,1)>3 or (select count(distinct x) from unnest(p_ids) x)<>array_length(p_ids,1)
 then raise exception 'invalid comparison' using errcode='22023';end if;
 return coalesce((select jsonb_agg(public.company_detail(c.slug) order by array_position(p_ids,c.id)) from public.companies c
  where c.id=any(p_ids) and c.status='approved'),'[]'::jsonb);
end;$$;

create function public.submit_review(p_company uuid,p_job text,p_employment text,p_start smallint,p_end smallint,
 p_positives text,p_improvements text,p_advice text,p_ratings jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 if not exists(select 1 from public.companies where id=p_company and status='approved') then raise exception 'company unavailable' using errcode='P0002';end if;
 if jsonb_typeof(p_ratings)<>'object' or (select count(*) from jsonb_object_keys(p_ratings))<>5
  or not(p_ratings ?& array['overall','work_life','compensation','management','career'])
  or exists(select 1 from jsonb_each_text(p_ratings) e where e.value !~ '^[1-5]$')
 then raise exception 'invalid ratings' using errcode='22023';end if;
 insert into public.reviews(company_id,author_id,job_title,employment_status,employment_start,employment_end,positives,improvements,advice)
 values(p_company,(select auth.uid()),left(trim(p_job),100),p_employment,p_start,p_end,trim(p_positives),trim(p_improvements),coalesce(trim(p_advice),'')) returning id into v_id;
 insert into public.review_ratings values(v_id,(p_ratings->>'overall')::smallint,(p_ratings->>'work_life')::smallint,
  (p_ratings->>'compensation')::smallint,(p_ratings->>'management')::smallint,(p_ratings->>'career')::smallint);
 return v_id;
end;$$;
create function public.submit_salary(p_data jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 if not exists(select 1 from public.companies where id=(p_data->>'company_id')::uuid and status='approved') then raise exception 'company unavailable' using errcode='P0002';end if;
 insert into public.salary_reports(company_id,author_id,role,location,employment_type,experience_level,base_salary_idr,salary_period,salary_basis,allowances_idr_monthly,bonus_idr_yearly)
 values((p_data->>'company_id')::uuid,(select auth.uid()),left(trim(p_data->>'role'),100),left(trim(p_data->>'location'),100),
  p_data->>'employment_type',p_data->>'experience_level',(p_data->>'base_salary')::numeric,p_data->>'salary_period',p_data->>'salary_basis',
  coalesce((p_data->>'allowances')::numeric,0),coalesce((p_data->>'bonus')::numeric,0)) returning id into v_id;return v_id;
end;$$;
create function public.submit_interview(p_data jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 if not exists(select 1 from public.companies where id=(p_data->>'company_id')::uuid and status='approved') then raise exception 'company unavailable' using errcode='P0002';end if;
 insert into public.interview_experiences(company_id,author_id,position,stages,difficulty,experience,duration_days,questions,outcome)
 values((p_data->>'company_id')::uuid,(select auth.uid()),left(trim(p_data->>'position'),100),trim(p_data->>'stages'),
 (p_data->>'difficulty')::smallint,p_data->>'experience',(p_data->>'duration_days')::smallint,trim(p_data->>'questions'),coalesce(p_data->>'outcome','unknown'))
 returning id into v_id;return v_id;
end;$$;

create function public.submit_report(p_review uuid,p_reason text,p_details text) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 if not exists(select 1 from public.reviews where id=p_review and status='published') then raise exception 'review unavailable' using errcode='P0002';end if;
 insert into public.review_reports(review_id,author_id,reason,details) values(p_review,(select auth.uid()),p_reason,trim(p_details)) returning id into v_id;return v_id;
end;$$;
create function public.submit_company_suggestion(p_data jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 insert into public.companies(name,slug,industry_id,description,website,created_by,status)
 select left(trim(p_data->>'name'),120),trim(both '-' from regexp_replace(lower(p_data->>'name'),'[^a-z0-9]+','-','g'))||'-'||substr(gen_random_uuid()::text,1,8),
  i.id,trim(p_data->>'description'),nullif(p_data->>'website',''),(select auth.uid()),'pending'
 from public.industries i where i.slug=p_data->>'industry' and i.is_active returning id into v_id;
 if v_id is null then raise exception 'industry unavailable' using errcode='P0002';end if;
 if nullif(trim(p_data->>'location'),'') is not null then
  insert into public.company_locations(company_id,city,status) values(v_id,left(trim(p_data->>'location'),100),'pending');
 end if;
 return v_id;
end;$$;
create function public.submit_contact(p_data jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 insert into public.contact_messages(author_id,email,subject,message) values((select auth.uid()),left(p_data->>'email',254),
  left(trim(p_data->>'subject'),120),trim(p_data->>'message')) returning id into v_id;return v_id;
end;$$;
create function public.submit_company_response(p_company uuid,p_review uuid,p_content text,p_evidence text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() or not private.has_representative(p_company)
 then raise exception 'verified representative required' using errcode='42501';end if;
 if not exists(select 1 from public.companies where id=p_company and status='approved') then raise exception 'company unavailable' using errcode='P0002';end if;
 if p_review is not null and not exists(select 1 from public.reviews where id=p_review and company_id=p_company and status='published')
 then raise exception 'review unavailable' using errcode='P0002';end if;
 insert into public.company_responses(company_id,review_id,author_id,content,evidence)
 values(p_company,p_review,(select auth.uid()),trim(p_content),trim(p_evidence)) returning id into v_id;return v_id;
end;$$;
create function public.request_company_representative(p_company uuid,p_evidence text) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 insert into public.company_representatives(company_id,author_id,verification_evidence) values(p_company,(select auth.uid()),trim(p_evidence)) returning id into v_id;return v_id;
end;$$;
create function public.my_company_requests() returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
 if (select auth.uid()) is null then raise exception 'authentication required' using errcode='42501';end if;
 return jsonb_build_object('suggestions',coalesce((select jsonb_agg(jsonb_build_object('id',c.id,'name',c.name,'status',c.status,'created_at',c.created_at) order by c.created_at desc)
  from public.companies c where c.created_by=(select auth.uid())),'[]'::jsonb),
  'representatives',coalesce((select jsonb_agg(jsonb_build_object('id',r.id,'company',c.name,'status',r.status,'created_at',r.created_at) order by r.created_at desc)
  from public.company_representatives r join public.companies c on c.id=r.company_id where r.author_id=(select auth.uid())),'[]'::jsonb));
end;$$;
create function public.update_own_profile(p_name text) returns jsonb language plpgsql security definer set search_path = '' as $$
declare v public.profiles;
begin
 if not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 update public.profiles set display_name=left(trim(p_name),60),updated_at=now() where id=(select auth.uid()) returning * into v;
 return jsonb_build_object('id',v.id,'display_name',v.display_name);
end;$$;
create function public.my_contributions() returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare v_items jsonb;
begin
 if (select auth.uid()) is null then raise exception 'authentication required' using errcode='42501';end if;
 select coalesce(jsonb_agg(item order by created_at desc),'[]'::jsonb) into v_items from (
  select jsonb_build_object('id',r.id,'kind','review','company',c.name,'company_slug',c.slug,'title',r.job_title,'status',r.status,'reason',r.moderation_reason,'moderation_note',r.moderation_note,'created_at',r.created_at) item,r.created_at
   from public.reviews r join public.companies c on c.id=r.company_id where r.author_id=(select auth.uid())
  union all select jsonb_build_object('id',s.id,'kind','salary','company',c.name,'company_slug',c.slug,'title',s.role,'status',s.status,'reason',s.moderation_reason,'created_at',s.created_at),s.created_at
   from public.salary_reports s join public.companies c on c.id=s.company_id where s.author_id=(select auth.uid())
  union all select jsonb_build_object('id',x.id,'kind','interview','company',c.name,'company_slug',c.slug,'title',x.position,'status',x.status,'reason',x.moderation_reason,'created_at',x.created_at),x.created_at
   from public.interview_experiences x join public.companies c on c.id=x.company_id where x.author_id=(select auth.uid())
  union all select jsonb_build_object('id',c.id,'kind','company','company',c.name,'company_slug',c.slug,'title',c.name,'status',c.status,'created_at',c.created_at),c.created_at
   from public.companies c where c.created_by=(select auth.uid())
 ) contributions;
 return jsonb_build_object('items',v_items);
end;$$;

create function public.moderation_queue(p_kind text default 'all',p_page integer default 1) returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare v_items jsonb;
begin
 if not private.is_admin() then raise exception 'admin required' using errcode='42501';end if;
 select coalesce(jsonb_agg(jsonb_build_object('kind',kind,'id',id,'created_at',created_at,'data',item) order by created_at),'[]'::jsonb) into v_items from (
  select 'review' kind,r.id,r.created_at,jsonb_build_object('status',r.status,'company',c.name,'job_title',r.job_title,'employment_start',r.employment_start,'employment_end',r.employment_end,
   'positives',r.positives,'improvements',r.improvements,'advice',r.advice,'author_reference',r.author_id,
   'ratings',jsonb_build_object('overall',rr.overall,'work_life',rr.work_life,'compensation',rr.compensation,'management',rr.management,'career',rr.career)) item
   from public.reviews r join public.companies c on c.id=r.company_id join public.review_ratings rr on rr.review_id=r.id where r.status='pending'
  union all select 'salary',s.id,s.created_at,jsonb_build_object('status',s.status,'company',c.name,'role',s.role,'location',s.location,'amount',s.base_salary_idr,'period',s.salary_period,'basis',s.salary_basis,'author_reference',s.author_id)
   from public.salary_reports s join public.companies c on c.id=s.company_id where s.status='pending'
  union all select 'interview',x.id,x.created_at,jsonb_build_object('status',x.status,'company',c.name,'position',x.position,'stages',x.stages,'questions',x.questions,'author_reference',x.author_id)
   from public.interview_experiences x join public.companies c on c.id=x.company_id where x.status='pending'
  union all select 'company',c.id,c.created_at,jsonb_build_object('status',c.status,'name',c.name,'industry',i.name,'website',c.website,'description',c.description,'author_reference',c.created_by)
   from public.companies c join public.industries i on i.id=c.industry_id where c.status='pending'
  union all select 'report',r.id,r.created_at,jsonb_build_object('status',r.status,'reason',r.reason,'details',r.details,'review_id',r.review_id,'author_reference',r.author_id)
   from public.review_reports r where r.status='pending'
  union all select 'response',r.id,r.created_at,jsonb_build_object('status',r.status,'company',c.name,'content',r.content,'evidence',r.evidence,'review_id',r.review_id,'author_reference',r.author_id)
   from public.company_responses r join public.companies c on c.id=r.company_id where r.status='pending'
  union all select 'representative',r.id,r.created_at,jsonb_build_object('status',r.status,'company',c.name,'evidence',r.verification_evidence,'author_reference',r.author_id)
   from public.company_representatives r join public.companies c on c.id=r.company_id where r.status='pending'
  union all select 'contact',m.id,m.created_at,jsonb_build_object('status',m.status,'email',m.email,'subject',m.subject,'message',m.message)
   from public.contact_messages m where m.status='pending'
 ) q where p_kind='all' or kind=p_kind order by created_at limit 50 offset ((greatest(p_page,1)-1)*50);
 return jsonb_build_object('items',v_items,'page',greatest(p_page,1),'per_page',50);
end;$$;

create function public.moderate_content(p_kind text,p_id uuid,p_status text,p_reason text,p_note text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare v_old text;v_new text;v_target_status text;
begin
 if not private.is_admin() or (select auth.uid()) is null then raise exception 'admin required' using errcode='42501';end if;
 if p_status not in ('published','rejected','removed','resolved') or p_reason not in ('meets_guidelines','privacy','spam','unsupported_claim','harassment','duplicate','other')
 or char_length(trim(p_note)) not between 10 and 2000 then raise exception 'invalid moderation action' using errcode='22023';end if;
 if (p_kind in ('review','salary','interview','response') and p_status not in ('published','rejected','removed'))
  or (p_kind='company' and p_status not in ('published','rejected'))
  or (p_kind in ('report','representative','contact') and p_status not in ('published','rejected','resolved'))
 then raise exception 'invalid status for content type' using errcode='22023';end if;
 v_target_status:=case when p_kind='company' and p_status='published' then 'approved'
   when p_kind='representative' and p_status='published' then 'verified' else p_status end;
 case p_kind
  when 'review' then select status into v_old from public.reviews where id=p_id for update;
  when 'salary' then select status into v_old from public.salary_reports where id=p_id for update;
  when 'interview' then select status into v_old from public.interview_experiences where id=p_id for update;
  when 'company' then select status into v_old from public.companies where id=p_id for update;
  when 'response' then select status into v_old from public.company_responses where id=p_id for update;
  when 'report' then select status into v_old from public.review_reports where id=p_id for update;
  when 'representative' then select status into v_old from public.company_representatives where id=p_id for update;
  when 'contact' then select status into v_old from public.contact_messages where id=p_id for update;
  else raise exception 'unsupported content type' using errcode='22023';
 end case;
 if v_old is null then raise exception 'content unavailable' using errcode='P0002';end if;
 case p_kind
 when 'review' then update public.reviews set status=v_target_status,moderation_reason=p_reason,moderation_note=trim(p_note),published_at=case when v_target_status='published' then now() else null end,updated_at=now()
   where id=p_id and status in ('pending','published','rejected') returning status into v_new;
 when 'salary' then update public.salary_reports set status=p_status,moderation_reason=p_reason,moderation_note=trim(p_note),published_at=case when p_status='published' then now() else null end,updated_at=now()
   where id=p_id and p_status<>'resolved' and status in ('pending','published','rejected') returning status into v_new;
 when 'interview' then update public.interview_experiences set status=p_status,moderation_reason=p_reason,moderation_note=trim(p_note),published_at=case when p_status='published' then now() else null end,updated_at=now()
   where id=p_id and p_status<>'resolved' and status in ('pending','published','rejected') returning status into v_new;
 when 'company' then update public.companies set status=v_target_status,updated_at=now() where id=p_id and v_target_status in ('approved','rejected') and status in ('pending','approved','rejected') returning status into v_new;
 when 'response' then update public.company_responses set status=p_status,moderation_reason=p_reason,moderation_note=trim(p_note),published_at=case when p_status='published' then now() else null end
   where id=p_id and p_status<>'resolved' and status in ('pending','published','rejected') returning status into v_new;
 when 'report' then update public.review_reports set status=p_status,moderation_note=trim(p_note),resolved_at=now()
   where id=p_id and p_status in ('resolved','rejected') and status='pending' returning status into v_new;
 when 'representative' then update public.company_representatives set status=case when p_status='published' then 'verified' else 'rejected' end,
  verified_by=case when p_status='published' then (select auth.uid()) else null end,verified_at=case when p_status='published' then now() else null end
  where id=p_id and p_status in ('published','rejected') and status='pending' returning status into v_new;
 when 'contact' then update public.contact_messages set status=p_status where id=p_id and p_status in ('resolved','rejected') and status='pending' returning status into v_new;
 else raise exception 'unsupported content type' using errcode='22023';
 end case;
 if v_new is null then raise exception 'content unavailable or transition invalid' using errcode='P0002';end if;
 if p_kind='company' and v_new='approved' then
  update public.company_locations set status='approved' where company_id=p_id and status='pending';
 end if;
 if p_kind='report' and v_new='resolved' then
  update public.reviews set status='removed',moderation_reason=p_reason,moderation_note=trim(p_note),published_at=null,updated_at=now()
   where id=(select review_id from public.review_reports where id=p_id) and status='published';
  if found then
   insert into public.moderation_actions(actor_id,content_type,content_id,from_status,to_status,reason,note)
   values((select auth.uid()),'review',(select review_id from public.review_reports where id=p_id),'published','removed',p_reason,trim(p_note));
  end if;
 end if;
 insert into public.moderation_actions(actor_id,content_type,content_id,from_status,to_status,reason,note)
 values((select auth.uid()),p_kind,p_id,v_old,v_new,p_reason,trim(p_note));
 insert into public.audit_logs(actor_id,action,target_type,target_id,metadata)
 values((select auth.uid()),'moderate',p_kind,p_id,jsonb_build_object('from',v_old,'to',v_new,'reason',p_reason));
 return jsonb_build_object('id',p_id,'kind',p_kind,'status',v_new);
end;$$;
create function public.admin_companies(p_page integer default 1) returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
 if not private.is_admin() then raise exception 'admin required' using errcode='42501';end if;
 return jsonb_build_object('items',coalesce((select jsonb_agg(jsonb_build_object('id',q.id,'name',q.name,'slug',q.slug,'industry',i.name,'status',q.status,
   'verified',q.verified,'featured',q.featured,'locations',(select coalesce(jsonb_agg(jsonb_build_object('id',l.id,'city',l.city,'province',l.province,'status',l.status)),'[]'::jsonb) from public.company_locations l where l.company_id=q.id)) order by q.created_at desc)
  from (select * from public.companies order by created_at desc limit 50 offset ((greatest(p_page,1)-1)*50)) q join public.industries i on i.id=q.industry_id),'[]'::jsonb),
  'page',greatest(p_page,1),'per_page',50);
end;$$;
create function public.admin_update_company(p_id uuid,p_data jsonb) returns jsonb language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if not private.is_admin() or (select auth.uid()) is null then raise exception 'admin required' using errcode='42501';end if;
 update public.companies c set name=left(trim(p_data->>'name'),120),slug=left(trim(p_data->>'slug'),160),
  industry_id=(select i.id from public.industries i where i.slug=p_data->>'industry' and i.is_active),
  description=trim(p_data->>'description'),website=nullif(p_data->>'website',''),
  verified=coalesce((p_data->>'verified')::boolean,false),featured=coalesce((p_data->>'featured')::boolean,false),updated_at=now()
  where c.id=p_id returning c.id into v_id;
 if v_id is null or not exists(select 1 from public.companies c where c.id=v_id and c.industry_id is not null)
 then raise exception 'company or industry unavailable' using errcode='P0002';end if;
 insert into public.audit_logs(actor_id,action,target_type,target_id) values((select auth.uid()),'update_company','company',v_id);
 return jsonb_build_object('id',v_id);
end;$$;
create function public.admin_users(p_page integer default 1) returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
 if not private.is_admin() then raise exception 'admin required' using errcode='42501';end if;
 return jsonb_build_object('items',coalesce((select jsonb_agg(jsonb_build_object('id',p.id,'display_name',p.display_name,'role',p.role,'status',p.status,'created_at',p.created_at) order by p.created_at desc)
  from (select * from public.profiles order by created_at desc limit 50 offset ((greatest(p_page,1)-1)*50)) p),'[]'::jsonb),'page',greatest(p_page,1),'per_page',50);
end;$$;
create function public.admin_update_user(p_id uuid,p_status text) returns jsonb language plpgsql security definer set search_path = '' as $$
begin
 if not private.is_admin() or p_id=(select auth.uid()) or p_status not in ('active','suspended') then raise exception 'forbidden' using errcode='42501';end if;
 update public.profiles set status=p_status,updated_at=now() where id=p_id;
 if not found then raise exception 'user unavailable' using errcode='P0002';end if;
 insert into public.audit_logs(actor_id,action,target_type,target_id,metadata) values((select auth.uid()),'set_user_status','profile',p_id,jsonb_build_object('status',p_status));
 return jsonb_build_object('id',p_id,'status',p_status);
end;$$;
create function public.admin_dashboard_statistics() returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
 if not private.is_admin() then raise exception 'admin required' using errcode='42501';end if;
 return jsonb_build_object('companies',(select count(*) from public.companies where status='approved'),
 'published_reviews',(select count(*) from public.reviews where status='published'),'pending_reviews',(select count(*) from public.reviews where status='pending'),
 'pending_salaries',(select count(*) from public.salary_reports where status='pending'),'pending_interviews',(select count(*) from public.interview_experiences where status='pending'),
 'pending_reports',(select count(*) from public.review_reports where status='pending'),'pending_companies',(select count(*) from public.companies where status='pending'),
 'pending_responses',(select count(*) from public.company_responses where status='pending'),'pending_representatives',(select count(*) from public.company_representatives where status='pending'),
 'pending_contacts',(select count(*) from public.contact_messages where status='pending'));
end;$$;
create function private.consume_rate_limit(p_key text,p_limit integer) returns boolean language plpgsql security definer set search_path = '' as $$
declare v_hits integer;v_window timestamptz:=date_trunc('minute',now());
begin
 if auth.role()<>'service_role' or p_key !~ '^[a-f0-9]{64}$' or p_limit<1 or p_limit>1000 then return false;end if;
 insert into private.rate_limits(bucket_key,window_start,hits) values(p_key,v_window,1)
 on conflict(bucket_key,window_start) do update set hits=private.rate_limits.hits+1 returning hits into v_hits;
 delete from private.rate_limits where window_start<now()-interval '10 minutes';return v_hits<=p_limit;
end;$$;
revoke all on function private.consume_rate_limit(text,integer) from public,anon,authenticated;
grant execute on function private.consume_rate_limit(text,integer) to service_role;

create function public.consume_rate_limit(p_key text,p_limit integer) returns boolean language sql security definer set search_path = '' as $$
 select private.consume_rate_limit(p_key,p_limit);
$$;
revoke all on function public.consume_rate_limit(text,integer) from public,anon,authenticated;
grant execute on function public.consume_rate_limit(text,integer) to service_role;

revoke all on all functions in schema public from public,anon,authenticated;
grant execute on function public.company_salary_insights(uuid),public.company_search(text,text,text,integer),public.company_detail(text),
 public.company_reviews(text,integer),public.company_interviews(text,integer),public.company_statistics(),public.compare_companies(uuid[]) to anon,authenticated;
grant execute on function public.submit_review(uuid,text,text,smallint,smallint,text,text,text,jsonb),public.submit_salary(jsonb),
 public.submit_interview(jsonb),public.submit_report(uuid,text,text),public.submit_company_suggestion(jsonb),public.submit_company_response(uuid,uuid,text,text),
 public.submit_contact(jsonb),public.request_company_representative(uuid,text),public.my_company_requests(),public.update_own_profile(text),public.my_contributions(),
 public.moderation_queue(text,integer),public.moderate_content(text,uuid,text,text,text),public.admin_companies(integer),public.admin_update_company(uuid,jsonb),
 public.admin_users(integer),public.admin_update_user(uuid,text),public.admin_dashboard_statistics() to authenticated;
grant execute on function public.submit_contact(jsonb) to anon;
comment on function public.company_salary_insights(uuid) is 'Salary cohorts are returned only when five distinct contributors are present.';
comment on function public.moderate_content(text,uuid,text,text,text) is 'All moderation state transitions are admin-only and create an audit record.';
comment on schema public is 'Submissions remain private until human moderation approves publication.';
commit;
