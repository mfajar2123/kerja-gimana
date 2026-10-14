import { defineConfig } from 'vitest/config'
import { createRequire } from 'node:module'

// Match Nitro's H3 runtime, including the Cloudflare localFetch transport.
const nuxtRequire = createRequire(createRequire(import.meta.url).resolve('nuxt/package.json'))
const h3Path = nuxtRequire.resolve('h3')
const h3Require = createRequire(h3Path)

export default defineConfig({
  resolve: { alias: { h3: h3Path, 'node-mock-http': h3Require.resolve('node-mock-http') } },
  test: {
    include: ['tests/unit/**/*.test.ts'],
    environment: 'node',
    coverage: { reporter: ['text', 'html'], include: ['shared/**/*.ts'] },
  },
})
