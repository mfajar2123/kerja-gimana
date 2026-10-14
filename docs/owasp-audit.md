# OWASP review — 2026-10-09

Scope: local Nuxt/Nitro application, production Node artifact, and the configured remote Supabase Free project. Reference: [OWASP ASVS 5.0](https://owasp.org/www-project-application-security-verification-standard/), [API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/), [CSRF prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html), and [CSP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html). This is a scoped audit, not an ASVS certification or penetration-test guarantee.

## Findings corrected

| Finding | Correction / verification |
| --- | --- |
| Direct authenticated RPCs bypassed API rate/privacy guards | Per-user SQL counters and personal-data checks; direct RPC test receives PT429 after five successful interview inserts |
| Unexpired JWT could continue after logout | Active verified profile plus matching live `auth.sessions` ID required by restrictive RLS and private RPC guards; captured JWT denied immediately after logout |
| Anonymous contact RPC bypassed server limiter | EXECUTE revoked from anon/authenticated; server-only service-role insertion using verified author identity |
| Declared-size guard could be bypassed with chunked body | Actual streamed bytes bounded to 32768; oversized chunked request returns 413 |
| Inline scripts allowed without nonce | Cryptographic response nonce attached to SSR scripts; CSP script unsafe-inline removed |
| Admin could update moderation rows without audit RPC | Raw UPDATE revoked from authenticated role; attempts with admin JWT denied |
| Former employee could omit end year at SQL boundary | Non-null end-year CHECK; future employment years blocked in SQL as well as API |
| Queue LIMIT was applied after aggregation | Pagination inside ordered subquery; page 1 has 50 items and page 2 has no overlapping IDs |
| Salary aggregation on unapproved company possible by known ID | Approved-company condition added to aggregate RPC |
| Form industry values did not match API lookup | Slug accepted directly; legacy industry names supported; invalid industry produces 422 |
| Comparison fetched with fewer than two selected companies | Fetch starts at two selections; clearing back to one cancels and clears results |
| Company detail lacked location field required by frontend | Curated detail payload includes approved locations as display text |
| Contribution company query was ignored | Selected ID validated and resolved using curated approved-company lookup |
| User-controlled back link could become an unsafe URL | Shared internal-destination validator |
| Populated salary/admin/comparison tables lacked keyboard scrolling | Focusable, named scroll regions |
| Dependency audit contained critical advisories | Lighthouse upgraded to 13.5.0, simple-git overridden to 4.0.2; current audit: zero critical, two high with no published patch |

## Coverage

| Area | Evidence |
| --- | --- |
| Access control / IDOR | Real-token ownership isolation, guest denial, ordinary-user admin denial, self-promotion denial, suspended-account API/RPC denial; transactional `supabase/tests/security.sql` |
| Sessions | SSR verification, HTTP-only cookies, SameSite, role redirect, explicit switch, cross-tab logout and delayed response regression; `scripts/qa-auth.mjs` |
| Input / CSRF / XSS | Strict Zod fields, valid UUID/enums/ranges, MIME/origin checks, malformed JSON/UTF-8 handling, bounded streaming body, stored HTML escaped and nonce-less injected script blocked; `scripts/qa-features.mjs` |
| Database privacy | Curated public RPCs omit author IDs/emails and raw salaries; five unique contributors per normalized salary cohort; gross/take-home separated |
| Business workflows | Company suggestion/approval/edit, review/salary/interview submission and moderation, representative request/verification/response, report resolution, contact resolution, pagination |
| Recovery / deletion | Generated recovery link without sending email; old password rejected after update; current-password confirmation and cascade deletion tested by the feature QA script |
| Mobile / accessibility | Populated guest/user/admin pages at 320, 390, 768, 1024, 1440; automated serious/critical WCAG checks at 390; viewport overflow and selected-company checks |
| Dependency / build | `pnpm audit --json`, typecheck, ESLint, Vitest, Playwright, Node production build; record final execution results in `quality.md` |

Fixtures created by automated backend/feature/auth QA are removed in `finally`. Persistent user-requested demo data is separate and documented in [demo-data.md](demo-data.md).

## Open findings and deployment limits

1. **Rotate the server secret shared through chat.** The available integration cannot create/revoke API secrets. Create a replacement in Supabase Dashboard → Project Settings → API Keys, update server `.env`/hosting secrets, verify the backend, then revoke the old key. Never put it in `runtimeConfig.public`. The supplied value is intentionally absent from this report.
2. **Two high dependency advisories have no published patch:** [node-forge GHSA-86w9-cpqp-85rv](https://github.com/advisories/GHSA-86w9-cpqp-85rv) and [braces GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Their paths are Nuxt/Nitro development/build utilities (listhen certificate tooling and globby patterns). The application does not use their affected APIs with request input. The final Node server output has neither these packages nor references to node-forge/braces/listhen/simple-git; rerun this check for each deployment adapter and audit when fixes are released. Do not treat `pnpm audit` exit 1 as a clean scan.
3. **Supabase advisory: leaked-password protection disabled.** The hosted feature requires [Pro or above](https://supabase.com/docs/guides/auth/password-security). Billing remains disabled as requested. App registration/reset requires 15–128 characters, but provider-level password policy and direct Auth API settings need dashboard verification. No paid feature was enabled.
4. **No mandatory admin MFA is implemented.** Restrict admin accounts and Supabase dashboard membership; do not claim ASVS Level 2 compliance. TOTP integration is follow-up work for higher-assurance deployments.
5. **Intentional advisor warnings remain:** eight public SECURITY DEFINER read RPCs expose curated published data; authenticated SECURITY DEFINER RPCs enforce live-session/owner/admin checks internally. All have fixed empty search paths. `private.rate_limits` has RLS and no client policies intentionally, plus no client grants. These warnings are reviewed design choices, not silently suppressed.
6. Authentication email delivery/custom SMTP, real hosting TLS/CDN/cache behavior, proxy trust, distributed load/DoS, backup/restore, operational audit retention, and legal/privacy text are outside the local checks. Recovery links are tested without sending messages. Regex privacy detection cannot recognize every personal identifier.

No file upload, arbitrary SQL execution endpoint, external URL fetch endpoint, or raw HTML rendering feature was found in application code. Revisit these controls if such features are added. Keep `.env`, `.demo-data.local.json`, browser artifacts, and QA tokens out of source control.

## Follow-up verification — 2026-10-13

The final production artifact passed the full live feature/security audit again, including CSRF/MIME/body bounds, CSP nonce enforcement, escaped stored HTML, ownership and self-promotion denial, per-user RPC limits, salary privacy, suspended/revoked sessions, audited moderation, recovery, and account deletion. All 120 public assets passed the configured secret scan. The two high dependency advisories remain without a published patch and their affected utilities were not found in the final Node server artifact. No new AI processing or public endpoint was introduced by the static coming-soon section.

Remote Security Advisor still reports deliberate RPC exposure: eight anonymous curated read functions and 25 authenticated functions, all reviewed with the existing role/live-session/ownership boundaries. See the [anonymous SECURITY DEFINER lint](https://supabase.com/docs/guides/database/database-linter?lint=0028_anon_security_definer_function_executable) and [authenticated SECURITY DEFINER lint](https://supabase.com/docs/guides/database/database-linter?lint=0029_authenticated_security_definer_function_executable). The private counter table has RLS with no client policies/grants by design; see [RLS without policies](https://supabase.com/docs/guides/database/database-linter?lint=0008_rls_enabled_no_policy). [Leaked-password protection](https://supabase.com/docs/guides/auth/password-security#password-strength-and-leaked-password-protection) remains disabled on Free as previously documented. No paid configuration was activated.

These checks do not close the known secret-rotation, SMTP, admin MFA, legal, operational, or deployed-infrastructure items. The current release decision and actions are in [launch-readiness.md](launch-readiness.md).
