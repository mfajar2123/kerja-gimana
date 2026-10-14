import { spawnSync } from 'node:child_process'

const result = spawnSync(process.execPath, ['node_modules/nuxt/bin/nuxt.mjs', 'build'], {
  env: { ...process.env, NITRO_PRESET: 'cloudflare_module' },
  stdio: 'inherit',
})
if (result.error) throw result.error
process.exitCode = result.status ?? 1
