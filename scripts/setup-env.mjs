import { randomBytes } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

const envFile = new URL('../.env', import.meta.url)
let contents
try {
  contents = await readFile(envFile, 'utf8')
} catch (error) {
  if (error.code !== 'ENOENT') throw error
  contents = await readFile(new URL('../.env.example', import.meta.url), 'utf8')
}
const existingSecret = contents.match(/^NUXT_RATE_LIMIT_SECRET=(.*)$/m)?.[1]?.trim()
if (!existingSecret || existingSecret === '""' || existingSecret === "''") {
  const entry = `NUXT_RATE_LIMIT_SECRET=${randomBytes(32).toString('base64url')}`
  contents = /^NUXT_RATE_LIMIT_SECRET=.*$/m.test(contents)
    ? contents.replace(/^NUXT_RATE_LIMIT_SECRET=.*$/m, entry)
    : `${contents.trimEnd()}\n${entry}\n`
  await writeFile(envFile, contents, { mode: 0o600 })
  console.log('Local .env prepared with a generated rate-limit secret. Existing credentials were preserved.')
}
