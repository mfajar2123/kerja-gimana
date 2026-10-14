# Security and privacy

## Implemented controls

- Supabase Auth manages passwords and verification; SSR cookies are HTTP-only, SameSite Lax, and secure on HTTPS.
- Nitro obtains the current user with `auth.getUser()`, checks verified email and active profile, and checks active admin role for every admin page/API. SQL authorization also requires the JWT session ID to exist in `auth.sessions`, so a revoked session cannot keep using an unexpired JWT for private reads or writes.
- Zod schemas reject unknown fields and validate writes. SQL checks repeat important constraints. Personal identifiers are checked before sensitive text is saved.
- Mutation APIs require same-origin JSON requests, reject cross-site fetches, cap both declared and actual request bytes at 32 KiB, reject malformed UTF-8/JSON, set security headers, and use no-store caching. Server-rendered Vue escapes text by default.
- CSP uses a fresh cryptographic nonce for SSR scripts, without script `unsafe-inline`. Fonts allow same-origin resources and data URLs because Vite inlines small self-hosted subsets. Styles retain inline support for the UI library; objects and framing are blocked. Development permits WebSockets for Vite.
- Rate limits use a server-only HMAC secret, a service-role-only RPC, per-minute atomic counters, and no stored raw IP. Direct authenticated submission RPCs have separate per-user limits and personal-data guards, so bypassing Nitro does not remove these controls. Contact insertion is service-role-only behind the API limiter. Missing rate-limit configuration fails closed once Supabase is enabled.
- Public SQL functions use fixed search paths and omit author identifiers. Base contribution tables have no public read grant. Salary data is aggregated only for cohorts of five or more distinct contributors.
- Admin decisions store actor, state transition, reason, and note. Raw contribution UPDATE privileges are revoked even for authenticated admins; moderation must use the audited RPC. Reports that moderators resolve hide the target review and write a moderation record. Queue pagination is applied before aggregation.
- Account deletion re-verifies the current password, revokes sessions globally, deletes the Supabase Auth user, and cascades authored submissions.

## Configuration and review

Keep `.env` out of source control. Require HTTPS, set `NUXT_SITE_URL` and `NUXT_PUBLIC_SITE_URL` to the same canonical origin, generate `NUXT_RATE_LIMIT_SECRET` from a cryptographically secure random source, and provide the server-only Supabase service-role key. Restrict Supabase dashboard access and review RLS after each migration.

The actual-byte guard includes chunked requests. Hosting still needs suitable connection timeouts and resource limits for slow or abusive traffic. Review moderation queue access and audit retention operationally. Anonymous display is not a promise of absolute anonymity: job title, dates, role, and story details can identify someone indirectly.

See [the OWASP audit](owasp-audit.md) for verified coverage and open findings. This is a security review, not a claim of complete ASVS compliance or absence of vulnerabilities.

`docs/quality.md` distinguishes local checks from production checks that require disposable Supabase credentials and SMTP. Privacy and terms pages are draft language, not a legal compliance claim.
