import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'

// Public source files only; never reads credentials or uploads project data.
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex')
const root = new URL('./', import.meta.url)
const evidence = new URL('../../docs/video/licenses/', root)
await mkdir(evidence, { recursive: true })
const assets = [
  { file: 'work.jpg', provider: 'Pexels', id: '3866621', author: 'Andrea Piacquadio', source: 'https://www.pexels.com/photo/concentrated-multiethnic-group-working-on-laptop-in-office-3866621/', license: 'https://www.pexels.com/license/' },
  { file: 'salary.jpg', provider: 'Pexels', id: '16695382', author: 'Jakub Zerdzicki', source: 'https://www.pexels.com/photo/man-hands-over-calculator-16695382/', license: 'https://www.pexels.com/license/' },
  { file: 'interview.jpg', provider: 'Pexels', id: '5439157', author: 'Tima Miroshnichenko', source: 'https://www.pexels.com/photo/candidate-having-an-interview-5439157/', license: 'https://www.pexels.com/license/' },
  { file: 'music-original.mp3', provider: 'Mixkit', title: 'Tech House vibes', source: 'https://mixkit.co/free-stock-music/electronica/', download: 'https://assets.mixkit.co/music/130/130.mp3', license: 'https://mixkit.co/license/modal/musicFree/', cachedPage: 'music-source.html' },
  { file: 'sweep-original.wav', provider: 'Mixkit', id: '166', title: 'Fast small sweep transition', source: 'https://mixkit.co/free-sound-effects/transition/', download: 'https://assets.mixkit.co/active_storage/sfx/166/166.wav', license: 'https://mixkit.co/license/modal/sfxFree/', cachedPage: 'sfx-source.html' },
  { file: 'zoom-original.wav', provider: 'Mixkit', id: '2608', title: 'Air zoom vacuum', source: 'https://mixkit.co/free-sound-effects/transition/', download: 'https://assets.mixkit.co/active_storage/sfx/2608/2608.wav', license: 'https://mixkit.co/license/modal/sfxFree/', cachedPage: 'sfx-source.html' },
]
const remote = async url => {
  const response = await fetch(url, { signal: AbortSignal.timeout(45000) })
  assert(response.ok, `${response.status} fetching ${url}`)
  return Buffer.from(await response.arrayBuffer())
}
const records = await Promise.all(assets.map(async asset => {
  const localPath = `assets/revision-20s/${asset.file}`
  const bytes = await readFile(new URL(localPath, root))
  const download = asset.download || `https://images.pexels.com/photos/${asset.id}/pexels-photo-${asset.id}.jpeg?auto=compress&cs=tinysrgb&w=2400`
  if (asset.cachedPage) {
    const html = await readFile(new URL(`assets/revision-20s/${asset.cachedPage}`, root), 'utf8')
    const sourceToken = asset.id ? `data-audio-player-item-id-value="${asset.id}"` : download
    assert(html.includes(asset.title) && html.includes(sourceToken), `Missing source mapping for ${asset.file}`)
  }
  const record = { ...asset, localPath, download, sha256: sha256(bytes), bytes: bytes.length }
  if (process.argv.includes('--verify-sources')) {
    record.remoteSha256 = sha256(await remote(download))
    record.remoteMatchesLocal = record.sha256 === record.remoteSha256
    assert(record.remoteMatchesLocal, `Source bytes changed for ${asset.file}; review before claiming a match`)
  }
  return record
}))
for (const [name, packageName] of [['space-grotesk', 'space-grotesk'], ['plus-jakarta-sans', 'plus-jakarta-sans']]) {
  const localPath = `assets/${name}.woff2`
  const bytes = await readFile(new URL(localPath, root))
  const packageRoot = new URL(`../../node_modules/@fontsource-variable/${packageName}/`, root)
  assert.equal(sha256(bytes), sha256(await readFile(new URL(`files/${packageName}-latin-wght-normal.woff2`, packageRoot))))
  const license = await readFile(new URL('LICENSE', packageRoot))
  assert(license.toString().includes('SIL OPEN FONT LICENSE Version 1.1'))
  await writeFile(new URL(`${name}-OFL.txt`, evidence), license)
  records.push({ localPath, sha256: sha256(bytes), license: 'SIL Open Font License 1.1', evidence: `licenses/${name}-OFL.txt`, packageBytesMatch: true })
}
if (process.argv.includes('--verify-sources')) {
  for (const [filename, url] of [
    ['mixkit-music-free.html', 'https://mixkit.co/license/modal/musicFree/'],
    ['mixkit-sfx-free.html', 'https://mixkit.co/license/modal/sfxFree/'],
    ['mixkit-terms.html', 'https://mixkit.co/terms/'],
  ]) await writeFile(new URL(filename, evidence), await remote(url))
}
const mix = await readFile(new URL('assets/revision-20s/mix.wav', root))
const report = {
  checkedAt: new Date().toISOString(),
  intendedUse: 'Completed promotional video on web, social media and online ads.',
  officialPagesReviewedOn: '2026-10-15',
  decision: 'Stock assets permit this online commercial end product under the linked licenses; fonts use OFL 1.1.',
  restrictions: ['Mixkit music: no TV/radio broadcasts, games or CD/DVD use; no music-only redistribution or rights-management registration.', 'Pexels: no implied endorsement, offensive depiction, unaltered resale or stock redistribution.', 'Do not distribute Mixkit SFX as standalone files, stock, templates or source packages.'],
  brand: 'Existing project typography/CSS wordmark and geometric K symbol; no external brand image is rendered. Trademark ownership is outside this stock-license check.',
  assets: records,
  unchangedAudio: { path: 'assets/revision-20s/mix.wav', sha256: sha256(mix) },
}
await writeFile(new URL('../../docs/video/asset-audit.json', root), JSON.stringify(report, null, 2) + '\n')
console.log(JSON.stringify({ checkedAssets: records.length, verifiedRemoteBytes: records.filter(r => r.remoteMatchesLocal).length, unchangedAudioSha256: report.unchangedAudio.sha256, report: 'docs/video/asset-audit.json' }, null, 2))
