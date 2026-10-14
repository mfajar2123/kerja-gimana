# KerjaGimana

KerjaGimana is an Indonesian workplace-transparency product for company research, employee reviews, salary insights, and interview experiences. User submissions remain hidden until moderation. The user-requested QA dataset is explicitly marked DEMO and documented in [demo-data.md](docs/demo-data.md); it must not be presented as real company information.

## Local setup

Install Node.js 22.23.3 (the version in `.nvmrc`) and pnpm 12.6.0 on your machine or CI build image before installing dependencies. Keep the Node executable outside project dependencies: a platform-specific Node package can shadow the build image's Node and break Linux deployment. The project uses Nuxt 4, Vue 3, Nitro, TypeScript, Tailwind CSS 4, shadcn-vue (Reka UI primitives), Zod, Supabase, Vitest, and Playwright.

1. Install dependencies with `pnpm install`.
2. Run `pnpm setup:env`. This creates `.env` when missing and generates a cryptographically random rate-limit secret without overwriting existing credentials. `pnpm dev` also runs this step automatically. Add the actual Supabase project URL, publishable key, and server-only service-role key when a project is available.
3. Apply all files in `supabase/migrations/` in filename order, then run `supabase/seed.sql`. The seed only adds industry categories.
4. In Supabase Auth, enable email verification, set the site URL to `http://localhost:3000`, and add `http://localhost:3000/api/auth/callback` to the redirect allow-list for local work.
5. Configure a custom SMTP provider before inviting public users. Supabase's built-in email sender is development-only and rate limited.
6. Start `pnpm dev` and open `http://localhost:3000`.
7. Optional: `pnpm seed:demo` adds the authorized project's labeled QA dataset. Credentials are stored in ignored `.demo-data.local.json`. `pnpm demo:clean` removes this dataset.

The app renders honestly when Supabase is not configured: the directory and statistics stay empty and write actions explain that the service is unavailable. It never substitutes demonstration data for user submissions.

## Useful commands

- `pnpm check` — strict Nuxt/Vue/TypeScript checks
- `pnpm check:launch` — production configuration preflight; expected to report NO-GO for local/demo configuration
- `pnpm lint` — ESLint
- `pnpm test` — unit tests for validation, privacy guards, and salary normalization
- `pnpm test:e2e` — Playwright desktop/mobile, responsive, and accessibility smoke tests
- `pnpm build` — production Node server build
- `pnpm build:cloudflare` — Cloudflare Workers build; generates Wrangler entry/ASSETS configuration
- `pnpm preview:cloudflare` — local Wrangler runtime, using ignored `.dev.vars`
- `pnpm test:backend` — live local API/Auth/database smoke test using temporary accounts and pending submissions, removed afterward; requires a configured `.env` and running local server
- `pnpm qa:auth` — real user/admin browser QA for session-aware navigation, account switching, and logout across tabs; temporary accounts are removed afterward
- `pnpm qa:features` — live API/RPC security, moderation, recovery/deletion and populated mobile/browser QA; persistent demo fixtures required, temporary fixtures removed afterward
- `pnpm qa:public-data` — real directory filters and comparison selection/clearing on mobile using the labeled demo dataset
- `pnpm qa:lighthouse` — Lighthouse on the local production preview; `pnpm audit --json` invokes the package manager dependency scan
- `pnpm test:rls` — read-only RLS checks against a configured isolated Supabase project

Before production, also run the RLS checks, supply the required credentials, configure SMTP, bootstrap an admin, review legal drafts, and run Lighthouse against the production adapter. Results that need external credentials are listed in `docs/quality.md`.

## Admin bootstrap

Create an account with a verified email, replace the placeholder in `supabase/admin-bootstrap.sql`, and run it once in the Supabase SQL editor. Confirm exactly one profile has the admin role. Admin page middleware and every admin API perform a server-side active-role check; navigation visibility is not used for authorization.

## Documentation

- [Launch readiness](docs/launch-readiness.md) — current public launch blockers, business rules, and operating checklist
- [Cloudflare Workers and Gmail SMTP](docs/cloudflare-workers.md) — dashboard fields, runtime secrets, callback URLs, and SMTP configuration
- [Claude Startups preparation](docs/claude-startups.md) — dated official program findings and a factual application draft
- Kompas Karier AI on the homepage is a coming-soon concept only; no model integration is active.

- `docs/backend-activation.md` — connected project, migration history, verified checks, and remaining credentials
- `docs/architecture.md`
- `docs/database.md`
- `docs/design-system.md`
- `docs/motion-system.md`
- `docs/security.md`
- `docs/owasp-audit.md` — reviewed OWASP controls, fixes and open security findings
- `docs/demo-data.md` — synthetic accounts, manual QA and scoped cleanup
- `docs/deployment.md`
- `docs/roadmap.md`
- `docs/quality.md`
- `docs/ui-qa.md`
- `docs/auth-qa.md` — login behavior, desktop/mobile QA evidence, and manual user/admin checklist

Privacy, terms, and moderation guidance are editable drafts. They require professional legal review before public launch.
