import { loadEnvFile } from 'node:process'
import { access } from 'node:fs/promises'

try { loadEnvFile('.env') } catch (error) { if (error.code !== 'ENOENT') throw error }

function publicOrigin(value) {
  try {
    const url = new URL(value)
    const host = url.hostname.toLowerCase()
    return url.protocol === 'https:' && host.includes('.') && !/^\d+\.\d+\.\d+\.\d+$/.test(host)
      && !/(^|\.)(localhost|local|test|invalid|example|example\.com|example\.org|example\.net)$/.test(host)
      && !url.username && !url.password && url.pathname === '/' && !url.search && !url.hash
      ? url.origin : null
  } catch { return null }
}

const env = process.env
const serverOrigin = publicOrigin(env.NUXT_SITE_URL)
const browserOrigin = publicOrigin(env.NUXT_PUBLIC_SITE_URL)
const checks = [
  ['Origin server memakai domain HTTPS publik', Boolean(serverOrigin)],
  ['Origin publik sama dengan origin server', Boolean(browserOrigin && browserOrigin === serverOrigin)],
  ['URL Supabase memakai HTTPS', Boolean(publicOrigin(env.NUXT_SUPABASE_URL))],
  ['Kunci publishable tersedia', Boolean(env.NUXT_SUPABASE_PUBLISHABLE_KEY)],
  ['Kunci server tersedia', Boolean(env.NUXT_SUPABASE_SERVICE_ROLE_KEY)],
  ['Rahasia rate limit minimal 32 karakter', (env.NUXT_RATE_LIMIT_SECRET?.length || 0) >= 32],
  ['Mode demo dinonaktifkan untuk peluncuran publik', !env.NUXT_PUBLIC_DEMO_DATA_ENABLED || env.NUXT_PUBLIC_DEMO_DATA_ENABLED === 'false'],
  ['Tidak ada secret server pada variabel NUXT_PUBLIC', !Object.keys(env).some(key => /^NUXT_PUBLIC_.*(SERVICE_ROLE|SECRET|PRIVATE_KEY)/.test(key) && env[key])],
]
try { await access('.output/server/index.mjs'); checks.push(['Artefak server produksi tersedia', true]) }
catch { checks.push(['Artefak server produksi tersedia', false]) }

for (const [label, passed] of checks) console.log(`${passed ? 'PASS' : 'BLOCK'} ${label}`)
console.log('\nPemeriksaan konfigurasi saja; tidak memverifikasi DNS, SMTP, rotasi kunci, data demo di database, hukum, backup, atau keamanan deployment.')
console.log('Lengkapi pemeriksaan manual di docs/launch-readiness.md. Nilai rahasia tidak dicetak.')
if (checks.some(([, passed]) => !passed)) {
  console.log('\nNO-GO: konfigurasi ini belum siap untuk peluncuran publik.')
  process.exitCode = 1
}
