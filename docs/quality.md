# Quality status

## Automated checks

Unit tests cover input schemas, password length, privacy detection, report states, salary normalization, and the minimum cohort threshold. Playwright covers public pages, hero overlap at eight widths, scroll visibility, keyboard search, form validation, redirects, error recovery, and simulated private/company layouts. See [UI quality review](ui-qa.md) for the findings and exact test scope.

Run `pnpm check`, `pnpm lint`, `pnpm test`, `pnpm test:e2e`, and `pnpm build` locally. A passing typecheck/build does not establish that Supabase policies or SMTP work in a remote project.

## Production build verified on 2026-10-08

The final `pnpm build` completed successfully in 1m 42s with the Node server preset. The generated server output was 5.05 MB (1.25 MB gzip). This is output size, not a measured download or performance score.

The Windows build used `$env:NODE_OPTIONS='--max-old-space-size=4096'; pnpm build` and required the runner to allow esbuild subprocess creation. Earlier attempts hit sandbox `spawn EPERM` or spent several minutes in Nitro before cancellation. Bundling UI dependencies in Vite before Nitro resolved the long build in the verified run. Typecheck and ESLint passed again after this configuration change.

Production browser checks exposed two issues missed in development: assembly text opacity reduced contrast before its reveal, and the production font bundler embedded a small font subset blocked by CSP. Both were corrected and given regression coverage. The build still emits upstream dependency annotation/deprecation and plugin timing warnings; these did not prevent output generation. Those earlier checks did not measure Lighthouse or field Core Web Vitals.

## Database authorization checks

The 2026-10-09 authentication changes also passed a fresh Node production build in 2m 55s. Real user/admin browser QA passed against that production artifact at desktop and mobile sizes, including SSR refresh, role navigation, account switching, accessibility, and logout with a delayed response in another tab. Typecheck, ESLint, 20 unit tests, and all 28 desktop/mobile Playwright scenarios passed. See [authentication QA](auth-qa.md).

The Free-tier remote project was created and migrated on 2026-10-08. REST/RPC reads and local public API integration passed. Transactional database RLS tests also passed, including suspended-account reactivation denial; their fixtures were rolled back. `pnpm test:backend` then passed password login, confirmation callbacks, SSR sessions, logout, ordinary-user admin denial, profile updates, pending company suggestions, private contact writes, and real-token ownership/suspension checks. All temporary accounts and submissions were cleaned and verified absent afterward. Supabase accepted the local callback redirect. Live testing also exposed and fixed login session reuse and empty-website validation bugs; all six unit tests passed, including website regression coverage. See [backend activation](backend-activation.md) for exact evidence and remaining configuration.

`pnpm test:rls` requires a disposable Supabase project with migrations applied and two verified ordinary user JWTs. It only reads protected tables and public RPC output; it does not write, delete, or promote test data. Use separate test accounts, never production user tokens. If credentials are not configured, the script exits with a clear setup message and the check remains unverified.

## External checks still required

The 2026-10-09 [authentication QA](auth-qa.md) passed real user/admin login and role-specific navigation on desktop and mobile, including SSR sessions, explicit account switching, admin denial, cross-tab logout, and failed-logout recovery. Temporary QA accounts were removed without modifying existing accounts.

No credentials are committed. Authentication email delivery, SMTP, production Cloudflare CPU usage, deployed TLS/cache/proxy behavior, and field Core Web Vitals remain unverified. Account deletion through the application passed the feature audit below. The supplied server secret must be rotated because it was shared through chat.

## Feature and OWASP audit — 2026-10-09

The final Node production build completed in 2m 33s (5.29 MB server output, 1.3 MB gzip). Typecheck, ESLint, and 20 unit tests passed. The initial production Playwright run passed 27/28 scenarios; one mobile account-menu test raced client navigation. The test now waits for the destination heading before opening the menu, and all four desktop/mobile auth scenarios passed on the final artifact. The other 24 scenarios had already passed; the full set therefore has passing verification, with the targeted rerun recorded explicitly.

`scripts/qa-auth.mjs` passed again on the final production artifact at 1440px and 390px: real Supabase user/admin sessions, SSR refresh, existing-session redirects, role-specific navigation, explicit switching, ordinary-user 403, the error-page switch button under nonce CSP, failed logout recovery, and delayed cross-tab logout. `scripts/test-backend.mjs` passed during the development audit; its contact test now verifies the server-only RPC plus the protected HTTP insertion path.

Live feature QA passed in stages against that production artifact. The public/user matrix and the admin matrix covered 320/390/768/1024/1440 widths, no page overflow, serious/critical automated accessibility checks at 390px, and preserved company selection in all contribution forms. The public matrix included populated comparison tables. The final `node scripts/qa-features.mjs --forms-only` run deliberately skipped these already-passed matrices and passed API/RPC security, real profile/company/review/salary/interview form submissions, admin company editing, password recovery/change, current-password account deletion, and cleanup. Default `pnpm qa:features` executes the complete matrix plus the forms; `--forms-and-admin` and `--forms-only` allow targeted continuation. Successful results are in ignored `artifacts/security-qa/results.json`; screenshots are in the same directory.

`scripts/qa-public-data.mjs` separately passed combined name/industry/location filters, invalid page/duplicate-comparison validation, mobile comparison fetching only after two selections, and clearing results after dropping to one selection.

Security probes passed: missing/foreign Origin rejected; wrong MIME rejected; malformed JSON rejected; oversized actual chunked body rejected with 413; SQL privacy and rate limits enforced; raw admin moderation UPDATE denied; active-session RLS rejects a captured JWT immediately after logout; suspended-account writes denied; future employment years and empty representative evidence rejected by direct RPC; public responses omit author identifiers; salary aggregates require five unique authors per basis and normalize annual values; moderation/report/representative/contact decisions persist; queue pages over 50 have no overlap. Stored HTML is rendered as text, and an injected script without a nonce cannot execute. Transactional `supabase/tests/security.sql` passed remotely and rolled back all fixtures.

All 54 public output files were scanned against the configured private server/rate-limit secrets with no matches. Neither node-forge/braces nor references to their affected development/build utilities are present in the final Node server output. Dependency audit still exits 1 for two high advisories without published patches, with zero critical advisories after the Lighthouse/simple-git updates. See [OWASP review](owasp-audit.md) for this and other open findings; these results do not establish full ASVS compliance.

The persistent [demo dataset](demo-data.md) was seeded repeatedly with stable IDs and private generated credentials. Final SQL verification: nine demo accounts, five companies/locations, 17 reviews/ratings, 22 salaries, 12 interviews, three representatives, four responses, three reports, three contacts, 42 moderation rows, and 42 audit rows; no QA/rollback accounts or inconsistent published/verified timestamps remained. Two previously existing accounts were preserved. Free tier and billing configuration were not upgraded.

All nine private demo credentials were also validated through real Supabase sessions and the local profile/admin APIs, including suspended-account denial. These validation sessions were signed out with local scope; existing sessions were preserved.

Lighthouse ran once against the local production homepage with its mobile configuration: performance 59, accessibility 100, best practices 100, SEO 100. The standalone HTML/JSON reports are under ignored `artifacts/lighthouse/`. This is a local lab measurement, not a deployed-host or field result; performance remains a follow-up optimization item. The other scores do not prove security or complete accessibility conformance.

## Navigation UX and performance follow-up — 2026-10-09

The final Node production build completed in 2m 10s (5.36 MB server output, 1.31 MB gzip). Typecheck and ESLint passed; the 20 unit tests also passed during this audit. All **38 desktop/mobile Playwright scenarios passed in a single run on the final production preview**, including company-tab alignment, saved history positions, profile reuse across sections, switching companies, cross-tab account changes, review/admin pagination, editor focus trapping/restoration, failed/slow saves, and progressive homepage data loading with retry. Existing public, authentication, accessibility, and eight-breakpoint layout regressions passed as part of that run.

Real Supabase authentication QA passed at 1440px and 390px with the same final auth/admin implementation before the last homepage-only optimization. Live feature QA also passed actual user contribution/profile forms, the new admin company editor, audited database persistence, security boundaries, password recovery, and deletion. The initial feature run found that a fourth DEMO company had already been approved by manual QA; its fixed-three-directory assumption was corrected to select the three original cohort examples. The rerun passed and cleanup preserved existing accounts and all DEMO changes. No reseeding, billing change, or plan upgrade was performed.

`scripts/qa-public-data.mjs` passed again on the final artifact with actual Supabase data: filters, comparison privacy/validation, direct SSR entry into all four company sections, mobile tab positions, and navigation between distinct companies. All 119 public build assets were checked for the configured private server/rate-limit secrets, with no matches. Details and manual steps: [navigation UX](navigation-ux.md).

Three final mobile Lighthouse runs produced performance **83, 86, and 74** (median **83**, range **74–86**). Accessibility, best practices, and SEO were 100 in each run. Earlier intermediate reports are preserved separately; a run made during typechecking is marked `after-ux-contended.json` and excluded from this final sample. Final samples are `artifacts/lighthouse/final-1.json`, `final-2.json`, and `final-3.json`; `report.html/json` contain the last run.

| Mobile lab metric | Before | Final median |
| --- | ---: | ---: |
| Performance score | 59 | 83 |
| First contentful paint | 4.2 s | 2.1 s |
| Largest contentful paint | 4.6 s | 2.8 s |
| Total blocking time | 566 ms | 421 ms |
| Cumulative layout shift | 0 | 0 |
| Estimated unused JavaScript | 176 KiB | 22 KiB |

The homepage now displays its hero without waiting for below-screen database data; company lists and statistics load near their section with an honest loading/error/retry state. The directory and individual company pages retain SSR. Compressed assets, font preload, conditional account-menu loading, interaction-based prefetch, fewer duplicate company reads, and reduced observer scanning are included in the final build.

These are local lab results on this workstation. Mobile performance does not yet consistently reach 90; deployed network/server behavior, field LCP/INP, and the open security/configuration items above still require validation before claiming complete production readiness.

## AI concept, business UX, and launch review — 2026-10-13

The homepage now presents **Kompas Karier AI — Coming soon** as a static, unavailable concept: source-linked workplace summaries, priority-based company comparison, and interview research questions. It has no AI endpoint, model SDK, simulated chat controls, waitlist collection, or release-date promise. Its CTA opens the existing comparison feature. The About page and homepage FAQ describe the same planned state.

Business/UX corrections include directory page reset when filters change, initial URL-filter loading and restoration from history, retaining keyboard focus during filtering, removable comparison choices after search changes, the missing management comparison dimension, retry states for salary/directory/comparison/pickers/dashboard/admin reads, and avoiding empty-state claims when requests fail. Salary tables now distinguish employment type and label the base-salary median correctly. Report forms preserve their login destination, reject invalid review links, use the server's 2,000-character limit, keep errors readable, and focus feedback. Settings feedback appears at the relevant form. All five review ratings are now visible to moderators; technical queue field names have Indonesian labels. Moderated data is no longer described as independently verified, and rejection copy matches the implemented workflow.

Final validation:

- Typecheck and ESLint passed after the final application change. The existing 20 unit tests passed during the audit; shared validation/auth logic was unchanged afterward.
- The production Node build completed in **1m 58s**, with **5.4 MB** server output (**1.32 MB gzip**). Upstream annotation/deprecation/timing warnings remain.
- All **56 Playwright desktop/mobile scenarios passed in one run** against that final production preview in **2.8m**. This includes seven new regression scenarios in both projects, plus the existing authentication, navigation, accessibility, eight-breakpoint hero, and company/editor regressions.
- `node scripts/qa-features.mjs` passed the complete real Supabase feature/security/browser matrix: actual contribution forms, profile and admin-company editing, approval/moderation, representative responses, report/contact handling, ownership and suspension boundaries, revoked-session access, password recovery/update, current-password account deletion, and public/user/admin layouts at **320/390/768/1024/1440 px**. Recovery links were generated for QA; actual SMTP inbox delivery remains unverified.
- `node scripts/qa-public-data.mjs` passed against the labeled real dataset: combined filters, input validation, mobile comparison, direct SSR entry to every company section, tab positioning, and navigation between companies.
- Cleanup completed. An independent remote aggregate query confirmed **zero temporary feature accounts**, **zero temporary feature companies**, and the same **four approved DEMO companies**. No reseeding or changes to existing user/demo records were made.
- All **120 public build assets** passed the configured private-secret scan. The final server artifact had no matches for node-forge, braces, listhen, or simple-git. Dependency audit still reports **two high, zero critical** advisories; this is not a clean audit.
- Remote project status is `ACTIVE_HEALTHY`; all public tables have RLS enabled and six migrations are applied. Advisor warnings for deliberate SECURITY DEFINER RPCs and disabled leaked-password protection remain documented in [the OWASP review](owasp-audit.md).

One fresh mobile Lighthouse run on the final local production preview reported **performance 84**, **accessibility 100**, **best practices 100**, and **SEO 100**: FCP **2.1 s**, LCP **2.9 s**, TBT **400 ms**, CLS **0**. Reports are preserved as `artifacts/lighthouse/launch-20261013.html/json`. This single run is not a new median or a field/deployed-host measurement. Desktop/mobile AI-section screenshots in `artifacts/launch-qa/` were inspected; sticky navigation is hidden only during isolated component screenshots, not in the application or accessibility checks.

`pnpm check:launch` correctly exits 1 for the current local configuration: site origins are localhost and demo mode remains enabled. This expected NO-GO does not mean functional checks failed. Public launch still needs domain/HTTPS/email/SMTP, secret rotation, separation from QA data, finalized operator/legal/retention information, operating ownership, and deployment/backup validation. No billing, paid service, deployment, or Claude application was enabled. See [launch readiness](launch-readiness.md) and [Claude Startups preparation](claude-startups.md) for concrete remaining work and the factual application draft.

## Cloudflare Workers packaging — 2026-10-14

Added a dedicated `build:cloudflare` script and pinned Wrangler 4.150.0, while retaining the Node build command. Nitro generates the entrypoint and ASSETS binding from `wrangler.jsonc`; runtime values stay in dashboard secrets and are preserved with `keep_vars`. `.dev.vars` and Wrangler state are ignored by Git. Gmail SMTP remains a Supabase Auth dashboard setting; it is not an app/runtime secret.

Cloudflare build passed in 1m 28s after the sandbox permitted esbuild spawning. Wrangler deploy **dry-run** passed with 1670.91 KiB total / 390.68 KiB gzip and the expected ASSETS binding. Typecheck and ESLint passed, and all 121 public assets passed the configured secret scan. No external deployment or billing change was made.

The Windows workerd runtime crashed with access violation / stack overflow for both the application and an independent minimal Response-only Worker. This blocks local Workers runtime QA on this machine; do not carry over Node runtime test results as Cloudflare runtime verification. A deployed smoke test, CPU validation, and actual SMTP delivery are still required. Setup fields and the exact scope are in [Cloudflare Workers setup](cloudflare-workers.md).
