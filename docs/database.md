# Database and Supabase setup

Apply all files in `supabase/migrations/` in filename order to a new Supabase project, then `supabase/seed.sql`. The seed contains industry categories only; company and contribution tables remain empty until reviewed submissions arrive. Migration filenames match the versions recorded by the Supabase integration.

Profile updates use `update_own_profile`; authenticated clients have no direct table UPDATE privilege and cannot change their own role or reactivate suspended accounts. Ownership and audit foreign keys have covering indexes, and RLS also protects private rate-limit storage.

The migration creates profiles, industries, companies and locations, reviews and ratings, salary and interview reports, review reports, company representatives and responses, contacts, moderation actions, audit logs, and private rate-limit storage. Foreign keys and checks constrain state, salary, ratings, dates, text length, and company relationships. Indexes cover directory filtering, public timelines, owner histories, moderation queues, and audit lookups.

RLS is enabled on every public table. Direct anonymous reads are limited to active industries and locations of approved companies. User policies expose only a person's own private rows. Admin checks are role-based, active-account-only, and evaluated server-side. Public company search and detail, published reviews/interviews, salary cohorts, statistics, and comparison are explicit security-definer functions with fixed empty search paths and hand-shaped output. The public salary summary returns only five-or-more-author cohorts; no individual salary row is public.

The `profiles` trigger creates a profile after Supabase Auth signup. Deleting the auth user cascades personal contributions and authored reports; company proposals remain in the directory workflow without a linked creator. Audit actor references become null on user deletion.

Enable Supabase Auth email verification. Set the allowed callback URL to `<SITE_URL>/api/auth/callback`. Configure a custom SMTP provider for public delivery; do not rely on the built-in testing sender. A manually verified administrator is bootstrapped with `supabase/admin-bootstrap.sql`.

Never place `service_role` in a `NUXT_PUBLIC_*` variable. Keep it in server runtime config only. Rotate publishable/secret keys and rate-limit secret if exposed.
