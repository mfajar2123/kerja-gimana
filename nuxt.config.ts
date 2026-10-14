import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-10-08',
  devtools: { enabled: false },
  experimental: { defaults: { nuxtLink: { prefetchOn: { interaction: true, visibility: false } } } },
  modules: ['shadcn-nuxt', '@nuxt/eslint'],
  css: [
    '@fontsource-variable/space-grotesk/index.css',
    '@fontsource-variable/plus-jakarta-sans/index.css',
    '~/assets/css/main.css',
  ],
  vite: {
    plugins: [tailwindcss()],
    // Tree-shake UI libraries in Vite before passing the small SSR bundle to Nitro.
    ssr: { noExternal: ['@lucide/vue', 'reka-ui', '@vueuse/core', '@vueuse/shared'] },
  },
  // Nuxt 4.6.0/Nitro 2.13.4 on Windows can externalize the SSR renderer
  // because its inline matcher misses backslash paths. Keep Nuxt's runtime bundled.
  nitro: { compressPublicAssets: true, externals: { inline: [/[/\\]node_modules[/\\]nuxt[/\\]dist[/\\]/] } },
  shadcn: { prefix: 'Ui', componentDir: './app/components/ui' },
  typescript: { strict: true },
  runtimeConfig: {
    supabaseUrl: '',
    supabasePublishableKey: '',
    supabaseServiceRoleKey: '',
    rateLimitSecret: '',
    siteUrl: 'http://localhost:3000',
    public: { siteUrl: 'http://localhost:3000', demoDataEnabled: false },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      bodyAttrs: { class: 'dark' },
      title: 'KerjaGimana — Sebelum kerja di sana, cari tahu dulu.',
      meta: [{ name: 'theme-color', content: '#000000' }],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    },
  },
  routeRules: {
    '/api/**': { headers: { 'cache-control': 'no-store' } },
    '/dashboard/**': { headers: { 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex' } },
    '/admin/**': { headers: { 'cache-control': 'private, no-store', 'x-robots-tag': 'noindex' } },
  },
})
