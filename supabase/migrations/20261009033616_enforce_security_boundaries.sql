begin;
-- Require a live, verified, active session even for direct Data API requests.
create or replace function private.is_verified_active_user() returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from auth.users u join public.profiles p on p.id=u.id
 join auth.sessions s on s.user_id=u.id
 where u.id=(select auth.uid()) and u.email_confirmed_at is not null and p.status='active'
 and s.id=nullif((select auth.jwt()->>'session_id'),'')::uuid and (s.not_after is null or s.not_after>now()));
$$;
create or replace function private.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
 select private.is_verified_active_user() and exists(select 1 from public.profiles p
 where p.id=(select auth.uid()) and p.role='admin' and p.status='active');
$$;
-- Counters also protect direct RPC callers, who bypass Nitro's IP/user limiter.
create function private.enforce_submission_limit(p_bucket text,p_limit integer) returns void
language plpgsql security definer set search_path = '' as $$
declare v_hits integer;
begin
 if not private.is_verified_active_user() then raise exception 'active session required' using errcode='42501';end if;
 insert into private.rate_limits(bucket_key,window_start,hits)
 values(encode(extensions.digest('rpc:'||p_bucket||':'||auth.uid()::text,'sha256'),'hex'),date_trunc('minute',now()),1)
 on conflict(bucket_key,window_start) do update set hits=private.rate_limits.hits+1 returning hits into v_hits;
 if v_hits>p_limit then raise exception 'submission rate limit exceeded' using errcode='PT429';end if;
end;$$;
create function private.reject_personal_data(p_values text[]) returns void
language plpgsql immutable set search_path = '' as $$
begin
 if exists(select 1 from unnest(p_values) v where v ~* '[[:alnum:].+_-]+@[[:alnum:].-]+[.][a-z]{2,}|(\+62|08)[0-9 -]{8,}|[0-9]{16}')
 then raise exception 'personal identifiers are not allowed' using errcode='22023';end if;
end;$$;
revoke all on function private.enforce_submission_limit(text,integer),private.reject_personal_data(text[]) from public,anon,authenticated;
-- Only audited RPCs can change moderation state, including for administrators.
revoke update on public.reviews,public.salary_reports,public.interview_experiences,public.company_responses from authenticated;
-- A missing end year must not pass SQL CHECK's three-valued boolean logic.
alter table public.reviews add constraint review_employment_consistent check
 ((employment_status='current' and employment_end is null) or
 (employment_status='former' and employment_end is not null and employment_end>=employment_start));
do $$declare t text;begin
 foreach t in array array['profiles','companies','company_locations','reviews','review_ratings','salary_reports','interview_experiences','review_reports','company_representatives','company_responses','contact_messages','moderation_actions','audit_logs'] loop
 execute format('create policy live_session_required on public.%I as restrictive for all to authenticated using ((select private.is_verified_active_user())) with check ((select private.is_verified_active_user()))',t);
 end loop;
end;$$;

create or replace function public.submit_review(p_company uuid,p_job text,p_employment text,p_start smallint,p_end smallint,
 p_positives text,p_improvements text,p_advice text,p_ratings jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 perform private.enforce_submission_limit('submit_review',5);
 perform private.reject_personal_data(array[p_job,p_positives,p_improvements,p_advice]);
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

create or replace function public.submit_salary(p_data jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 perform private.enforce_submission_limit('submit_salary',5);
 perform private.reject_personal_data(array[p_data->>'role',p_data->>'location']);
 if not exists(select 1 from public.companies where id=(p_data->>'company_id')::uuid and status='approved') then raise exception 'company unavailable' using errcode='P0002';end if;
 insert into public.salary_reports(company_id,author_id,role,location,employment_type,experience_level,base_salary_idr,salary_period,salary_basis,allowances_idr_monthly,bonus_idr_yearly)
 values((p_data->>'company_id')::uuid,(select auth.uid()),left(trim(p_data->>'role'),100),left(trim(p_data->>'location'),100),
  p_data->>'employment_type',p_data->>'experience_level',(p_data->>'base_salary')::numeric,p_data->>'salary_period',p_data->>'salary_basis',
  coalesce((p_data->>'allowances')::numeric,0),coalesce((p_data->>'bonus')::numeric,0)) returning id into v_id;return v_id;
end;$$;

create or replace function public.submit_interview(p_data jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 perform private.enforce_submission_limit('submit_interview',5);
 perform private.reject_personal_data(array[p_data->>'position',p_data->>'stages',p_data->>'questions']);
 if not exists(select 1 from public.companies where id=(p_data->>'company_id')::uuid and status='approved') then raise exception 'company unavailable' using errcode='P0002';end if;
 insert into public.interview_experiences(company_id,author_id,position,stages,difficulty,experience,duration_days,questions,outcome)
 values((p_data->>'company_id')::uuid,(select auth.uid()),left(trim(p_data->>'position'),100),trim(p_data->>'stages'),
 (p_data->>'difficulty')::smallint,p_data->>'experience',(p_data->>'duration_days')::smallint,trim(p_data->>'questions'),coalesce(p_data->>'outcome','unknown'))
 returning id into v_id;return v_id;
end;$$;

create or replace function public.submit_report(p_review uuid,p_reason text,p_details text) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 perform private.enforce_submission_limit('submit_report',3);
 perform private.reject_personal_data(array[p_details]);
 if not exists(select 1 from public.reviews where id=p_review and status='published') then raise exception 'review unavailable' using errcode='P0002';end if;
 insert into public.review_reports(review_id,author_id,reason,details) values(p_review,(select auth.uid()),p_reason,trim(p_details)) returning id into v_id;return v_id;
end;$$;

create or replace function public.submit_company_suggestion(p_data jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 perform private.enforce_submission_limit('submit_company_suggestion',3);
 perform private.reject_personal_data(array[p_data->>'description']);
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

create or replace function public.submit_company_response(p_company uuid,p_review uuid,p_content text,p_evidence text) returns uuid
language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() or not private.has_representative(p_company)
 then raise exception 'verified representative required' using errcode='42501';end if;
 perform private.enforce_submission_limit('submit_company_response',3);
 perform private.reject_personal_data(array[p_content,p_evidence]);
 if not exists(select 1 from public.companies where id=p_company and status='approved') then raise exception 'company unavailable' using errcode='P0002';end if;
 if p_review is not null and not exists(select 1 from public.reviews where id=p_review and company_id=p_company and status='published')
 then raise exception 'review unavailable' using errcode='P0002';end if;
 insert into public.company_responses(company_id,review_id,author_id,content,evidence)
 values(p_company,p_review,(select auth.uid()),trim(p_content),trim(p_evidence)) returning id into v_id;return v_id;
end;$$;

create or replace function public.request_company_representative(p_company uuid,p_evidence text) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 if (select auth.uid()) is null or not private.is_verified_active_user() then raise exception 'verification required' using errcode='42501';end if;
 perform private.enforce_submission_limit('request_company_representative',3);
 perform private.reject_personal_data(array[p_evidence]);
 if not exists(select 1 from public.companies where id=p_company and status='approved') then raise exception 'company unavailable' using errcode='P0002';end if;
 insert into public.company_representatives(company_id,author_id,verification_evidence) values(p_company,(select auth.uid()),trim(p_evidence)) returning id into v_id;return v_id;
end;$$;

create or replace function public.submit_contact(p_data jsonb) returns uuid language plpgsql security definer set search_path = '' as $$
declare v_id uuid;
begin
 perform private.reject_personal_data(array[p_data->>'message']);
 insert into public.contact_messages(author_id,email,subject,message) values(nullif(p_data->>'author_id','')::uuid,left(p_data->>'email',254),
  left(trim(p_data->>'subject'),120),trim(p_data->>'message')) returning id into v_id;return v_id;
end;$$;

revoke all on function public.submit_contact(jsonb) from public,anon,authenticated;
grant execute on function public.submit_contact(jsonb) to service_role;

create or replace function public.my_company_requests() returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
 if not private.is_verified_active_user() then raise exception 'authentication required' using errcode='42501';end if;
 return jsonb_build_object('suggestions',coalesce((select jsonb_agg(jsonb_build_object('id',c.id,'name',c.name,'status',c.status,'created_at',c.created_at) order by c.created_at desc)
  from public.companies c where c.created_by=(select auth.uid())),'[]'::jsonb),
  'representatives',coalesce((select jsonb_agg(jsonb_build_object('id',r.id,'company',c.name,'status',r.status,'created_at',r.created_at) order by r.created_at desc)
  from public.company_representatives r join public.companies c on c.id=r.company_id where r.author_id=(select auth.uid())),'[]'::jsonb));
end;$$;

create or replace function public.my_contributions() returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare v_items jsonb;
begin
 if not private.is_verified_active_user() then raise exception 'authentication required' using errcode='42501';end if;
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

create or replace function public.moderation_queue(p_kind text default 'all',p_page integer default 1) returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare v_items jsonb;
begin
 if not private.is_admin() then raise exception 'admin required' using errcode='42501';end if;
 select coalesce(jsonb_agg(jsonb_build_object('kind',kind,'id',id,'created_at',created_at,'data',item) order by created_at),'[]'::jsonb) into v_items from (select * from (
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
 ) q where p_kind='all' or kind=p_kind order by created_at,id limit 50 offset ((least(greatest(p_page,1),1000)-1)*50)) page_rows;
 return jsonb_build_object('items',v_items,'page',least(greatest(p_page,1),1000),'per_page',50);
end;$$;

create or replace function public.moderate_content(p_kind text,p_id uuid,p_status text,p_reason text,p_note text) returns jsonb
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
 if v_old=v_target_status then raise exception 'transition must change status' using errcode='22023';end if;
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

create or replace function public.admin_companies(p_page integer default 1) returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
 if not private.is_admin() then raise exception 'admin required' using errcode='42501';end if;
 return jsonb_build_object('items',coalesce((select jsonb_agg(jsonb_build_object('id',q.id,'name',q.name,'slug',q.slug,'industry',i.name,'status',q.status,
   'description',q.description,'website',q.website,'industry_slug',i.slug,'featured',q.featured,'verified',q.verified,'featured',q.featured,'locations',(select coalesce(jsonb_agg(jsonb_build_object('id',l.id,'city',l.city,'province',l.province,'status',l.status)),'[]'::jsonb) from public.company_locations l where l.company_id=q.id)) order by q.created_at desc)
  from (select * from public.companies order by created_at desc limit 50 offset ((least(greatest(p_page,1),1000)-1)*50)) q join public.industries i on i.id=q.industry_id),'[]'::jsonb),
  'page',least(greatest(p_page,1),1000),'per_page',50);
end;$$;

create or replace function public.admin_update_company(p_id uuid,p_data jsonb) returns jsonb language plpgsql security definer set search_path = '' as $$
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
 if nullif(trim(p_data->>'location'),'') is not null then
 insert into public.company_locations(company_id,city,status) select c.id,left(trim(p_data->>'location'),100),case when c.status='approved' then 'approved' else 'pending' end from public.companies c where c.id=v_id on conflict(company_id,city) do update set status=excluded.status;
 end if;
 insert into public.audit_logs(actor_id,action,target_type,target_id) values((select auth.uid()),'update_company','company',v_id);
 return jsonb_build_object('id',v_id);
end;$$;

create or replace function public.company_search(p_query text default '',p_industry text default '',p_location text default '',p_page integer default 1)
 returns jsonb language plpgsql stable security definer set search_path = '' as $$
declare v_items jsonb;v_total integer;v_page integer:=least(greatest(coalesce(p_page,1),1),1000);
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

create or replace function public.company_reviews(p_slug text,p_page integer default 1) returns jsonb language sql stable security definer set search_path = '' as $$
 with c as(select id from public.companies where slug=left(p_slug,150) and status='approved'),
 rows as(select r.id,r.job_title,r.employment_status,r.employment_start,r.employment_end,r.positives,r.improvements,r.advice,
  to_char(r.published_at at time zone 'UTC','YYYY-MM') published_month,
  jsonb_build_object('overall',rr.overall,'work_life',rr.work_life,'compensation',rr.compensation,'management',rr.management,'career',rr.career) ratings,
  coalesce((select jsonb_agg(jsonb_build_object('id',response.id,'content',response.content,
   'published_month',to_char(response.published_at at time zone 'UTC','YYYY-MM')) order by response.published_at)
   from public.company_responses response where response.review_id=r.id and response.status='published'),'[]'::jsonb) company_responses
  from public.reviews r join public.review_ratings rr on rr.review_id=r.id join c on c.id=r.company_id where r.status='published'
  order by r.published_at desc limit 20 offset ((least(greatest(p_page,1),1000)-1)*20))
 select jsonb_build_object('reviews',coalesce((select jsonb_agg(to_jsonb(rows)) from rows),'[]'::jsonb),
  'total',(select count(*) from public.reviews r join c on c.id=r.company_id where r.status='published'),
  'page',least(greatest(p_page,1),1000),'per_page',20);
$$;

create or replace function public.company_interviews(p_slug text,p_page integer default 1) returns jsonb language sql stable security definer set search_path = '' as $$
 with c as(select id from public.companies where slug=left(p_slug,150) and status='approved'),
 rows as(select x.id,x.position,x.stages,x.difficulty,x.experience,x.duration_days,x.questions,x.outcome
  from public.interview_experiences x join c on c.id=x.company_id where x.status='published'
  order by x.published_at desc limit 20 offset ((least(greatest(p_page,1),1000)-1)*20))
 select jsonb_build_object('interviews',coalesce((select jsonb_agg(to_jsonb(rows)) from rows),'[]'::jsonb),
  'total',(select count(*) from public.interview_experiences x join c on c.id=x.company_id where x.status='published'),
  'page',least(greatest(p_page,1),1000),'per_page',20);
$$;

create or replace function public.admin_users(p_page integer default 1) returns jsonb language plpgsql stable security definer set search_path = '' as $$
begin
 if not private.is_admin() then raise exception 'admin required' using errcode='42501';end if;
 return jsonb_build_object('items',coalesce((select jsonb_agg(jsonb_build_object('id',p.id,'display_name',p.display_name,'role',p.role,'status',p.status,'created_at',p.created_at) order by p.created_at desc)
  from (select * from public.profiles order by created_at desc limit 50 offset ((least(greatest(p_page,1),1000)-1)*50)) p),'[]'::jsonb),'page',least(greatest(p_page,1),1000),'per_page',50);
end;$$;
commit;
