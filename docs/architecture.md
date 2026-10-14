# Architecture

## Runtime

Nuxt 4's `app/` directory contains Vue pages, layouts, components, and browser-only motion. Nitro routes in `server/api/` validate requests, authorize sessions, apply rate limits, and call PostgreSQL RPCs. The project does not run a separate API server. Shared Zod schemas and types live in `shared/` and are used by browser forms and Nitro handlers.

The public directory, company detail, reviews, salary insights, interview stories, comparison, FAQ, and information pages are server-rendered. User submissions and moderation are authenticated API operations. Private responses use `no-store` cache headers and private routes are excluded from search indexing.

## Trust boundary

The browser receives only the Supabase publishable key indirectly through server configuration; it never receives the service-role credential. Nitro uses the user's signed SSR cookie for normal data work. Security-definer SQL functions expose narrowly shaped public projections and guarded write operations. RLS denies anonymous reads of raw review and salary rows; published data is served through explicit views/RPC results that omit authors.

Human review is the only route from a pending contribution to public content. Company proposals and representative claims use separate moderation states. Salary values are normalized to monthly IDR and cohort medians require five unique authors. There are no AI calls or paid features.

## Key decisions

- Supabase Auth owns password hashing, verification, recovery, and email changes.
- Nitro SSR cookie handling uses `@supabase/ssr` and `getUser()`; the server does not trust decoded client claims.
- Zod validates the request at the API boundary; SQL constraints repeat critical invariants.
- A Postgres minute-window rate-limit table stores only an HMAC of a user/IP identifier, never the raw address.
- Native CSS and IntersectionObserver handle editorial motion; there is no scroll hijacking or continuous animation loop.
- `shadcn-nuxt` supplies Vue-compatible shadcn-vue conventions and Reka UI. Shared component code is checked into `app/components/ui` so it can be themed and audited.
- Vite bundles Lucide, Reka UI, and VueUse into the SSR build so tree shaking happens before Nitro processes the server output. This avoids passing the full icon library's CommonJS entry to Nitro. Nuxt's runtime is explicitly inlined to work around Windows path matching in Nuxt 4.6.0/Nitro 2.13.4.
- `pnpm dev` creates a local `.env` when needed and generates a random rate-limit secret without overwriting existing configuration. Supabase credentials must still be issued by a real authorized project; the setup script does not invent keys or provision accounts.

## Future extension points

Keep future ranking or AI-assisted moderation behind `server/services/` interfaces and human approval. Do not grant a future model direct database write access. Any automated suggestion must be labeled, logged, and rejectable by moderators.
