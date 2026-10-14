# Supabase activation — 2026-10-08

Project: [KerjaGimana](https://supabase.com/dashboard/project/rqssvemdbysfuaspjhdt), reference `rqssvemdbysfuaspjhdt`, Singapore (`ap-southeast-1`), organization `mfajar2123's Org` (`jtwoauhleovgbdshisnm`). The integration quoted $0/month before creation and the organization was verified as Free afterward. No billing upgrade or paid add-on was enabled.

## Applied and verified

- `20261008093357_init.sql` and `20261008093754_secure_profiles_and_index_ownership.sql` are recorded in the remote migration history. Local filenames match that history.
- `supabase/seed.sql` populated 13 industry categories. No company or contribution fixtures were published.
- Local `.env` contains the real project URL, modern publishable key, and server-only secret key. The existing rate-limit secret was preserved. Git ignores `.env`. The server key was supplied through chat and should be rotated in the dashboard, then replaced locally; no secret values are recorded in this document.
- All 14 public tables and `private.rate_limits` have RLS enabled. Anonymous Data API access to profiles is denied.
- Direct Supabase REST/RPC reads and local `/api/industries` and `/api/statistics` requests passed. Statistics report `configured: true` and zero companies/reviews/salaries.
- Public Auth settings confirm email authentication enabled, signup enabled, and email auto-confirm disabled. Invalid credentials were rejected. Successful password login, unverified-account rejection, confirmation callbacks, SSR cookie sessions, logout, and ordinary-user admin denial passed through the local app with real Supabase accounts.
- `supabase/tests/security.sql` passed against the remote database: one user cannot read another profile, active users can update their display name through the RPC, ordinary users cannot moderate, and suspended users cannot reactivate themselves or update their profile. These are transactional database tests with simulated JWT claims, not end-to-end password authentication. All test users/profiles were rolled back; verified counts afterward were zero.
- `pnpm test:backend` passed against the local application and remote database: profile updates, pending company suggestions, private contact inserts, real-token ownership isolation, self-promotion denial, and suspended-account enforcement. Temporary sessions were signed out and all temporary accounts/submissions removed; SQL verification afterward found zero auth users, profiles, companies, company locations, and contacts, with 13 industries remaining.
- `pnpm test` passed all six unit tests, including the optional company website regression. Syntax and ESLint checks passed for the backend smoke script.
- Supabase link generation accepted the exact `http://localhost:3000/api/auth/callback` redirect. The generated link was not emailed, and its temporary account was deleted afterward. Management-level Site URL/allow-list settings were not directly inspected.

## Fixes found by live testing

Password login previously created a second Supabase client before reading the profile, losing the newly authenticated session and incorrectly returning HTTP 403. The handler now reuses its authenticated client for profile lookup and sign-out. Company submissions with an empty website previously threw `Invalid URL` inside the refinement and returned HTTP 500; optional website validation now returns a normal validation result. Both corrected flows passed the live smoke test, and the website case has unit regression coverage.

## Remaining configuration

The connected Supabase integration exposes publishable keys but has no tool to retrieve server secret keys or update Auth URL settings. No Supabase Management API access token is configured locally.

1. Rotate the chat-exposed server secret in [API keys](https://supabase.com/dashboard/project/rqssvemdbysfuaspjhdt/settings/api-keys) and replace local `NUXT_SUPABASE_SERVICE_ROLE_KEY`. A modern `sb_secret_...` key or legacy `service_role` key is accepted. Never send its replacement through chat or commit it.
2. For a production domain, update both site URL environment variables and [Auth URL configuration](https://supabase.com/dashboard/project/rqssvemdbysfuaspjhdt/auth/url-configuration). The local callback is already accepted and tested.
3. After replacing credentials, restart `pnpm dev` and run `pnpm test:backend`. Avoid running concurrent smoke tests or retrying several times within one minute: authentication requests intentionally use the application's real rate limits. The test creates temporary users/submissions and removes them in `finally`; it does not send verification emails or publish content.

Local login and database writes are working. Real administrator login and navigation passed in the [2026-10-09 authentication QA](auth-qa.md), using temporary accounts that were removed afterward. Email delivery and SMTP have not been tested or configured. Public email signup/recovery needs [custom SMTP](https://supabase.com/docs/guides/auth/auth-smtp); the built-in sender is restricted to project team addresses and development limits. No paid email service has been enabled. Account deletion through the application has not been tested. No permanent administrator was created by this QA run.

## Advisor review

After the follow-up migration, the advisor no longer reports unindexed foreign keys. Remaining performance findings are unused indexes on a new empty database and separate permissive owner/admin SELECT policies; retain the indexes and review policy consolidation as data volume grows. See [unused-index guidance](https://supabase.com/docs/guides/database/database-linter?lint=0005_unused_index) and [multiple-policy guidance](https://supabase.com/docs/guides/database/database-linter?lint=0006_multiple_permissive_policies).

Security advisors flag intentional SECURITY DEFINER RPCs available to anonymous/signed-in roles. Public read RPCs return curated output; mutation/admin RPCs check identity, active/verified status, or admin role as appropriate. Contact remains a public HTTP endpoint, but its database insertion RPC is now service-role-only. Fixed empty search paths and explicit EXECUTE grants are present. The ordinary-user admin denial was verified in the database test. These warnings remain; the advisor report is not claimed to be clean. See [anonymous RPC guidance](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable) and [authenticated RPC guidance](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable).

## Feature/security follow-up — 2026-10-09

The older zero-count observations above describe initial activation. The user subsequently requested persistent fictional QA data. The database now contains the labeled dataset in [demo-data.md](demo-data.md), including a generated demo administrator. Two existing accounts were preserved; temporary automated QA accounts were removed.

Four additional migrations are applied and their local filenames match remote history: `20261009033616_enforce_security_boundaries.sql`, `20261009034844_company_selection.sql`, `20261009035711_consistent_company_details.sql`, and `20261009040827_submission_consistency.sql`. These add live-session authorization, direct-RPC limits/privacy guards, server-only contact insertion, audited moderation boundaries, correct queue pagination, approved-company selection/detail contracts, and business constraints.

Account deletion through the application is now verified, including password denial, successful deletion, profile/contribution cascade and session revocation. Real admin/user authentication and the live feature workflow passed on the final production Node artifact. All SECURITY DEFINER functions in `public`/`private` were checked to have an explicit empty search path. For exact test coverage and remaining risks, see [quality.md](quality.md) and [owasp-audit.md](owasp-audit.md). SMTP delivery and secret rotation remain outstanding; no paid service was enabled.
