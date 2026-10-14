# Authentication and navigation QA — 2026-10-09

User and administrator accounts share `/masuk`. The server reads the role from the database; the login form does not offer a role selector. Without an explicit permitted destination, users land at `/dashboard` and administrators at `/admin`. Opening `/admin` while signed out opens the same login form with administrator context.

The navbar renders the verified account during SSR and updates after login, logout, and profile edits. Its account menu provides dashboard, contributions, settings, logout, and account switching. Administrators also get a room link, and the admin section uses moderation navigation. Login and registration redirect an existing session to its permitted destination. A direct login or registration request with an active account returns HTTP 409, requiring logout before switching identities.

Only sanitized account identity is serialized to the browser. Session cookies remain HTTP-only. Personalized documents and authentication APIs use private/no-store caching. Redirect validation rejects external destinations, login loops, API paths, and ordinary-user redirects to admin. Protected routes are checked on document requests and client navigation, and admin APIs independently check the active role.

## Repeatable checks

- `pnpm test`: 20 unit tests, including safe redirect destinations and route boundaries.
- `pnpm test:e2e`: browser regressions for account menus, role navigation, guest redirects, public pages, private layouts, keyboard behavior, and responsive layout. UI fixtures are fictional browser responses; they do not prove remote authentication.
- With the local app running, `pnpm qa:auth` tests real Supabase password sessions using temporary verified user/admin accounts. It checks SSR refresh, login/register redirects, HTTP 409 when switching without logout, ordinary-user admin denial, the error-page switch action, admin navigation, failed logout preserving identity, successful logout across tabs, viewport overflow, and serious/critical accessibility findings. Screenshots are written under the ignored `artifacts/auth-qa/` directory. Temporary accounts are removed in `finally`; existing accounts are not changed.
- `pnpm test:backend` checks confirmation callbacks, profile/database writes, ownership, and suspended-account enforcement.

The real-account browser scenario passed at 1440×1000 and 390×844, including overflow checks at 320, 390, 768, 1024, and 1440 pixels. The cross-tab check deliberately held an old session response until after logout, verifying that a later synchronization signal is queued and checked again. No browser exceptions or hydration warnings occurred in that successful run. No serious/critical automated accessibility findings were reported with the account menu open. Automated accessibility checks do not replace a complete assistive-technology review.

All 28 Playwright regressions passed across the desktop and mobile projects. One public-page navigation check was interrupted by a development HMR reload while source changes were still being applied; it passed when rerun against the settled server. Typecheck and ESLint passed.

The production Node build completed in 2m 55s (5.27 MB output, 1.29 MB gzip). The real-account browser scenario then passed again against `.output/server/index.mjs` at both desktop and mobile sizes. This verifies the local production artifact, not a deployed Cloudflare environment.

`pnpm test:backend` also passed against that production server: confirmation callback, password login, logout, SSR cookies, profile isolation, ordinary-user admin denial, profile updates, pending company suggestions, private submission ownership, and suspension checks. Temporary accounts/submissions were removed afterward.

## Manual QA

1. Use the individually generated demo credentials in ignored `.demo-data.local.json` as explained in [demo-data.md](demo-data.md), or create and verify two separate accounts through `/daftar`: one ordinary user and one intended administrator. Promote only the intended verified administrator using `supabase/admin-bootstrap.sql`. There are no hardcoded shared passwords.
2. Sign in to `/masuk` as the user. Expect `/dashboard`, an account menu instead of the login button, and no admin link. Refresh and open `/masuk` and `/daftar` directly; the current session should lead back to `/dashboard`.
3. Open `/admin` as that user. Expect HTTP 403 with an option to leave the account. Choose **Keluar dan ganti akun**; expect the administrator-context login screen. Sign in with the separate admin account and expect `/admin` with moderation navigation.
4. Open another tab on `/dashboard`. Choose **Keluar** in the account menu, then return to the other tab; private content should redirect to login. Reload `/admin` while signed out; expect `/masuk?next=%2Fadmin`.
5. Repeat on a narrow viewport. Check the account icon, mobile navigation, Escape closing menus, keyboard focus returning to the trigger, and settings updating the display name in the navbar.

Email delivery/custom SMTP and production deployment configuration remain separate checks. No billing upgrade or paid service was enabled for this work.

## Security audit follow-up, 2026-10-09

The real-user/admin browser QA passed again after session revocation and nonce CSP changes, against the final 2m 33s Node production build (5.29 MB, 1.3 MB gzip). Both the 1440px and 390px scenarios passed, including the 403 error-page account switch, failed logout, and delayed cross-tab synchronization. The separate four desktop/mobile auth regressions passed on that build. See [OWASP review](owasp-audit.md) for security findings and remaining limits.
