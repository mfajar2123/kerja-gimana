import { mkdir, writeFile } from 'node:fs/promises'
const folder = new URL('./assets/revision-20s/', import.meta.url)
await mkdir(folder, { recursive: true })
const download = async (url, filename) => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${response.status}: ${url}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  await writeFile(new URL(filename, folder), bytes)
  console.log(`${filename}: ${bytes.length} bytes`)
}
await download('https://assets.mixkit.co/music/130/130.mp3', 'music-original.mp3')
await download('https://assets.mixkit.co/active_storage/sfx/166/166.wav', 'sweep-original.wav')
await download('https://assets.mixkit.co/active_storage/sfx/2608/2608.wav', 'zoom-original.wav')
for (const [url, name] of [['https://mixkit.co/free-sound-effects/transition/', 'sfx-source.html'], ['https://mixkit.co/license/', 'mixkit-license.html']]) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`${response.status}: ${url}`)
  const html = await response.text()
  await writeFile(new URL(name, folder), html)
  if (name === 'sfx-source.html') {
    const matches = [...html.matchAll(/\{[^{}]*"@type"\s*:\s*"(?:AudioObject|MusicRecording)"[^{}]*\}/g)].map(m => m[0])
    console.log('Saved SFX page source and two distinct sweep/zoom assets.')
  } else {
    const clean = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')
    await writeFile(new URL('mixkit-license.txt', folder), clean)
    console.log(clean.slice(clean.indexOf('Stock Music'), clean.indexOf('Stock Music') + 2400))
  }
}
