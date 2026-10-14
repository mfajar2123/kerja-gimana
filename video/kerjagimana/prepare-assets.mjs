import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'

const assets = new URL('./assets/', import.meta.url)
await mkdir(assets, { recursive: true })
const copies = [
  ['../../node_modules/@fontsource-variable/space-grotesk/files/space-grotesk-latin-wght-normal.woff2', 'space-grotesk.woff2'],
  ['../../node_modules/@fontsource-variable/plus-jakarta-sans/files/plus-jakarta-sans-latin-wght-normal.woff2', 'plus-jakarta-sans.woff2'],
  ['./node_modules/gsap/dist/gsap.min.js', 'gsap.min.js'],
  ['../../public/favicon.svg', 'favicon.svg'],
]
for (const [source, name] of copies) await copyFile(new URL(source, import.meta.url), new URL(name, assets))

await mkdir(new URL('./compositions/', import.meta.url), { recursive: true })
const template = await readFile(new URL('./composition-v2.html.template', import.meta.url), 'utf8')
const animation = await readFile(new URL('./animation-v2.js', import.meta.url), 'utf8')
const compiled = template
  .replace('href="style-v2.css"', 'href="../style-v2.css"')
  .replace('src="assets/gsap.min.js"', 'src="../assets/gsap.min.js"')
  .replaceAll('src="assets/revision-20s/', 'src="../assets/revision-20s/')
  .replace('<script src="animation-v2.js"></script>', `<script>\n${animation}\n</script>`)
const filmFile = new URL('./compositions/film.html', import.meta.url)
// Preserve changes made in Studio. Rebuilding the authoring template is explicit.
if (!existsSync(filmFile) || process.argv.includes('--rebuild')) await writeFile(filmFile, compiled)
console.log('Prepared local fonts, logo and GSAP; active composition preserved unless --rebuild is requested.')

