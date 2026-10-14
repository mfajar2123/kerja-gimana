import assert from 'node:assert/strict'
import { loadEnvFile } from 'node:process'
import { readdir, readFile } from 'node:fs/promises'
import { join } from 'node:path'
loadEnvFile('.env')
const forbidden = [process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY, process.env.NUXT_RATE_LIMIT_SECRET].filter(Boolean)
let count = 0
async function inspect(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, item.name)
    if (item.isDirectory()) await inspect(path)
    else { const bytes = await readFile(path); for (const secret of forbidden) assert.equal(bytes.includes(Buffer.from(secret)), false, `Private configuration found in public artifact: ${path}`); count++ }
  }
}
await inspect('.output/public')
console.log(`PASS: ${count} public build files contain no configured server secret or rate-limit secret.`)
