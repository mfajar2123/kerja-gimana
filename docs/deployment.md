# Deployment

## Runtime choice

Nitro requires a server-capable runtime. A static export does not run these APIs. The low-cost target is Cloudflare Workers using Nitro's `cloudflare_module` preset and Workers Static Assets. Verify compatibility with the current Nuxt/Nitro release, then build with `NITRO_PRESET=cloudflare_module pnpm build` and deploy the generated worker with Wrangler. Commit the generated Wrangler config only after confirming its `main`, assets binding, compatibility date, and `nodejs_compat` setting match Nitro's output.

Cloudflare Workers Free has request/CPU limits, and Supabase calls plus SSR can exceed the per-invocation CPU allowance. Measure the final build on the free plan first; keep an alternative Node-compatible host ready. Do not enable billing automatically. Platform quotas change, so check [Cloudflare Workers limits](https://developers.cloudflare.com/workers/platform/limits/) and [Nuxt on Cloudflare](https://developers.cloudflare.com/workers/framework-guides/web-apps/more-web-frameworks/nuxt/) before launch.

## Secrets and release steps

Configure the following production secrets in the server runtime: `NUXT_SUPABASE_URL`, `NUXT_SUPABASE_PUBLISHABLE_KEY`, `NUXT_SUPABASE_SERVICE_ROLE_KEY`, `NUXT_RATE_LIMIT_SECRET`, `NUXT_SITE_URL`, and `NUXT_PUBLIC_SITE_URL`. Use HTTPS for the canonical origin, the same value for both site URL variables, and allow `<origin>/api/auth/callback` in Supabase Auth. Never expose the service-role key to a browser build.

Apply the migration, seed taxonomy, set up custom SMTP, bootstrap the verified administrator, run read-only RLS checks, and test email registration, recovery, and account deletion in a disposable environment. Validate Worker CPU and response headers with Lighthouse and real mobile testing before public release.

Supabase Free limits, including database size, inactivity pause behavior, and Auth email delivery, are subject to change; review [current Supabase plans](https://supabase.com/pricing) and [Auth SMTP guidance](https://supabase.com/docs/guides/auth/auth-smtp). Built-in Supabase SMTP is not suitable for public production delivery.
