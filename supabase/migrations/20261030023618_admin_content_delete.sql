begin;

create function public.admin_content(p_kind text, p_page integer default 1) returns jsonb
language plpgsql stable security definer set search_path = '' as $$
declare result jsonb;
begin
 if not private.is_admin() then raise exception 'admin required' using errcode='42501'; end if;
 if p_kind not in ('review','salary','interview','response') then raise exception 'invalid kind' using errcode='22023'; end if;
 select coalesce(jsonb_agg(to_jsonb(q) order by q.created_at desc, q.id),'[]'::jsonb) into result from (
  select * from (
   select r.id, r.created_at, r.status, c.name company, r.job_title title from public.reviews r join public.companies c on c.id=r.company_id where p_kind='review'
   union all select s.id,s.created_at,s.status,c.name,s.role from public.salary_reports s join public.companies c on c.id=s.company_id where p_kind='salary'
   union all select i.id,i.created_at,i.status,c.name,i.position from public.interview_experiences i join public.companies c on c.id=i.company_id where p_kind='interview'
   union all select r.id,r.created_at,r.status,c.name,left(r.content,120) from public.company_responses r join public.companies c on c.id=r.company_id where p_kind='response'
  ) items order by created_at desc,id limit 50 offset ((least(greatest(p_page,1),1000)-1)*50)
 ) q;
 return jsonb_build_object('items',result,'per_page',50);
end; $$;

create function public.admin_delete_content(p_kind text,p_id uuid,p_note text) returns jsonb
language plpgsql security definer set search_path = '' as $$
declare found_id uuid;
begin
 if not private.is_admin() or (select auth.uid()) is null then raise exception 'admin required' using errcode='42501'; end if;
 if char_length(trim(coalesce(p_note,''))) not between 10 and 2000 then raise exception 'invalid note' using errcode='22023'; end if;
 case p_kind
  when 'company' then
   perform 1 from public.companies where id=p_id for update;
   if not found then raise exception 'content unavailable' using errcode='P0002'; end if;
   delete from public.company_responses where company_id=p_id;
   delete from public.reviews where company_id=p_id;
   delete from public.salary_reports where company_id=p_id;
   delete from public.interview_experiences where company_id=p_id;
   delete from public.companies where id=p_id returning id into found_id;
  when 'review' then
   delete from public.company_responses where review_id=p_id;
   delete from public.reviews where id=p_id returning id into found_id;
  when 'salary' then delete from public.salary_reports where id=p_id returning id into found_id;
  when 'interview' then delete from public.interview_experiences where id=p_id returning id into found_id;
  when 'response' then delete from public.company_responses where id=p_id returning id into found_id;
  else raise exception 'invalid kind' using errcode='22023';
 end case;
 if found_id is null then raise exception 'content unavailable' using errcode='P0002'; end if;
 insert into public.audit_logs(actor_id,action,target_type,target_id,metadata)
 values((select auth.uid()),'delete_content',p_kind,p_id,jsonb_build_object('note',trim(p_note)));
 return jsonb_build_object('id',found_id);
end; $$;

revoke all on function public.admin_content(text,integer), public.admin_delete_content(text,uuid,text) from public,anon,authenticated;
grant execute on function public.admin_content(text,integer), public.admin_delete_content(text,uuid,text) to authenticated;
commit;
