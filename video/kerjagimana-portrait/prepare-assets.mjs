import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
const root = new URL('./', import.meta.url)
await mkdir(new URL('assets/', root), { recursive: true })
const files = ['gsap.min.js', 'space-grotesk.woff2', 'plus-jakarta-sans.woff2', ...['work.jpg', 'salary.jpg', 'interview.jpg', 'mix.wav'].map(name => `revision-20s/${name}`)]
for (const name of files) {
  const source = new URL(`../kerjagimana/assets/${name}`, root)
  const destination = new URL(`assets/${name.split('/').at(-1)}`, root)
  await copyFile(source, destination)
  const hash = data => createHash('sha256').update(data).digest('hex')
  assert.equal(hash(await readFile(source)), hash(await readFile(destination)))
}
await mkdir(new URL('compositions/', root), { recursive: true })
const target = new URL('compositions/film.html', root)
if (!existsSync(target) || process.argv.includes('--rebuild')) {
  const template = await readFile(new URL('composition.html.template', root), 'utf8')
  const animation = await readFile(new URL('animation.js', root), 'utf8')
  await writeFile(target, template.replace('/* PORTRAIT_ANIMATION */', animation))
}
console.log('Prepared portrait assets; all seven local copies match the landscape originals. Composition preserved unless --rebuild is requested.')
