import { mkdir, writeFile } from 'node:fs/promises'

const folder = new URL('./assets/revision-20s/', import.meta.url)
await mkdir(folder, { recursive: true })
const photos = [
  ['work.jpg', '3866621'],
  ['salary.jpg', '16695382'],
  ['interview.jpg', '5439157'],
]
const download = async (url, filename) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${response.status} fetching ${url}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  await writeFile(new URL(filename, folder), bytes)
  console.log(`${filename}: ${bytes.length} bytes`)
}
await Promise.all(photos.map(([name, id]) => download(`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`, name)))
const page = await fetch('https://mixkit.co/free-stock-music/electronica/')
if (!page.ok) throw new Error(`Mixkit page: ${page.status}`)
const html = await page.text()
await writeFile(new URL('music-source.html', folder), html)
const position = html.indexOf('Tech House vibes')
console.log(html.slice(Math.max(0, position - 1700), position + 2500))
console.log([...new Set(html.match(/https:\/\/assets\.mixkit\.co\/music\/[^"'\s<>]+/g) || [])].slice(0, 8))
