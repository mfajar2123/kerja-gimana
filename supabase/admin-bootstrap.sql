-- Run once from the Supabase SQL Editor after creating and verifying the admin account.
-- Replace the email below, then verify exactly one row was updated.
update public.profiles p
set role='admin', updated_at=now()
from auth.users u
where u.id=p.id
  and lower(u.email)=lower('mfajar212345@gmail.com')
  and u.email_confirmed_at is not null;

-- Verify the role and email confirmation through the dashboard. Never expose service_role keys.
select p.role,p.status,u.email,u.email_confirmed_at
from public.profiles p join auth.users u on u.id=p.id
where lower(u.email)=lower('mfajar212345@gmail.com');
