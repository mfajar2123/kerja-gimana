-- Run in the SQL editor or through execute_sql. All fixtures are rolled back.
begin;

with test_users as (
 insert into auth.users(id,email,email_confirmed_at)
 values(gen_random_uuid(),'rls-rollback-a@example.com',now()),
       (gen_random_uuid(),'rls-rollback-b@example.com',now())
 returning id,email
)
insert into auth.sessions(id,user_id,created_at,updated_at) select gen_random_uuid(),id,now(),now() from test_users;
select set_config('request.jwt.claims',jsonb_build_object('sub',u.id,'role','authenticated','session_id',s.id)::text,true)
from auth.users u join auth.sessions s on s.user_id=u.id where email='rls-rollback-a@example.com';

set local role authenticated;
do $$
begin
 if (select count(*) from public.profiles) <> 1 then
  raise exception 'RLS must expose exactly the current test user profile';
 end if;
 if (select id from public.profiles) <> auth.uid() then
  raise exception 'RLS exposed another profile';
 end if;
 if has_table_privilege('authenticated','public.profiles','UPDATE') then
  raise exception 'Direct profile updates must be denied';
 end if;
 perform public.update_own_profile('Rollback-only profile test');
 if (select display_name from public.profiles where id=auth.uid()) <> 'Rollback-only profile test' then
  raise exception 'Active account profile update failed';
 end if;
 begin
  perform public.moderation_queue('all',1);
  raise exception 'Ordinary user accessed admin moderation';
 exception when insufficient_privilege then null;
 end;
end $$;

reset role;
update public.profiles set status='suspended' where id=auth.uid();
set local role authenticated;
do $$
begin
 begin
  update public.profiles set status='active' where id=auth.uid();
  raise exception 'Suspended user reactivated their account';
 exception when insufficient_privilege then null;
 end;
 begin
  perform public.update_own_profile('Must not be written');
  raise exception 'Suspended user updated their profile';
 exception when insufficient_privilege then null;
 end;
end $$;

reset role;
select 'PASS: profile ownership, active RPC writes, admin denial, suspension enforcement' as result;
rollback;
