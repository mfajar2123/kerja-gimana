import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '../../node_modules/@playwright/test/index.mjs'

const root = fileURLToPath(new URL('./', import.meta.url))
const out = new URL('../../artifacts/video/review/', import.meta.url)
await mkdir(out, { recursive: true })
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.woff2': 'font/woff2', '.svg': 'image/svg+xml' }
const server = createServer(async (request, response) => {
  const path = resolve(root, `.${new URL(request.url, 'http://localhost').pathname}`)
  if (!path.startsWith(root.endsWith(sep) ? root : root + sep)) { response.writeHead(403).end(); return }
  try { response.writeHead(200, { 'Content-Type': types[extname(path)] || 'application/octet-stream' }).end(await readFile(path)) }
  catch { response.writeHead(404).end() }
})
await new Promise(resolveReady => server.listen(0, '127.0.0.1', resolveReady))
const browser = await chromium.launch({ headless: true })
console.log('Review browser launched.')
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
const errors = []
page.on('pageerror', error => errors.push(error.message))
page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`) })
try {
  await page.goto(`http://127.0.0.1:${server.address().port}/compositions/film.html`)
  console.log('Composition loaded.')
  await page.evaluate(() => document.fonts.ready.then(() => true))
  console.log('Local fonts ready; checking seek states.')
  const report = await page.evaluate(() => {
    const holds = [
      [1.1, 2.1, ['#intro-one', '#intro-two']],
      [3.95, 5.35, ['#question-one', '#question-two', '#question-three']],
      [7.5, 9.2, ['#search-copy h2', '#query', '#company-header h3', '#demo-label']],
      [10.75, 13, ['#review-copy h2', '#review-note', '#review-panel', '#demo-label']],
      [14.2, 17, ['#salary-copy h2', '#salary-note', '#salary-panel', '#demo-label']],
      [18.2, 20.35, ['#interview-copy h2', '#interview-note', '#interview-panel', '#demo-label']],
      [22.05, 24.6, ['#compare-copy h2', '#compare-note', '#compare-aurora', '#compare-lentera', '#demo-label']],
      [27.1, 30, ['#closing-one', '#closing-two', '#closing-brand', '#closing-button']],
    ]
    const problems = []
    let inspected = 0
    const pose = selector => {
      const element = document.querySelector(selector)
      const rect = element.getBoundingClientRect()
      let opacity = 1, node = element
      while (node instanceof Element) { opacity *= Number(getComputedStyle(node).opacity); node = node.parentElement }
      return { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom, opacity, blur: getComputedStyle(element).filter }
    }
    for (let frame = 0; frame < 900; frame++) {
      const time = frame / 30
      window.videoTimeline.seek(time, false)
      if (frame % 10 !== 0) continue
      const hold = holds.find(([start, end]) => time >= start + 0.001 && time < end)
      if (!hold) continue
      for (const selector of hold[2]) {
        const p = pose(selector)
        inspected++
        if (p.opacity < 0.99 || p.x < 0 || p.y < 0 || p.right > 1920.5 || p.bottom > 1080.5 || (p.blur !== 'none' && p.blur !== 'blur(0px)')) problems.push({ frame, time, selector, ...p })
      }
    }
    // Check out-of-order seeks return identical poses, rather than retaining prior-frame state.
    const checkpoints = [1.5, 4.5, 8, 11.5, 15.5, 19, 23, 28]
    const selectors = ['#intro-one', '#question-three', '#search-copy', '#company-rig', '#salary-panel', '#comparison-rig', '#closing-button']
    const capturePose = time => { window.videoTimeline.seek(time, false); return JSON.stringify(selectors.map(pose)) }
    const reference = checkpoints.map(capturePose)
    const reverse = checkpoints.map((_, i) => capturePose(checkpoints[checkpoints.length - 1 - i])).reverse()
    if (JSON.stringify(reference) !== JSON.stringify(reverse)) problems.push({ error: 'Forward/backward seek states differ' })
    window.videoTimeline.seek(8, false)
    if (document.querySelector('#query').textContent !== 'Aurora') problems.push({ error: 'Search query mismatch' })
    return { timelineDuration: window.videoTimeline.duration(), framesSeeked: 900, readabilitySampleEveryFrames: 10, readableElementChecks: inspected, seekDeterministic: JSON.stringify(reference) === JSON.stringify(reverse), fonts: { display: document.fonts.check('600 112px "Space Grotesk"'), body: document.fonts.check('400 30px "Plus Jakarta Sans"') }, problems }
  })
  console.log('Seek checks completed; saving review frames.')
  for (const time of [1.5, 4.5, 8, 11.5, 15.5, 19, 23, 28]) {
    await page.evaluate(time => { window.videoTimeline.seek(time, false) }, time)
    await page.screenshot({ path: fileURLToPath(new URL(`frame-${time}.png`, out)) })
  }
  // Boundary sequences preserve readable holds while checking object and camera handoffs.
  for (const [name, times] of [['search-profile', [9.2, 9.35, 9.5, 9.65, 9.8]], ['review-salary', [13.2, 13.3, 13.4, 13.55, 13.85]], ['closing', [25.0, 25.3, 25.6, 25.9, 26.2, 26.5, 26.8, 27.1]]]) {
    for (let index = 0; index < times.length; index++) {
      await page.evaluate(time => { window.videoTimeline.seek(time, false) }, times[index])
      await page.screenshot({ path: fileURLToPath(new URL(`${name}-${index}.png`, out)) })
    }
  }
  console.log('Review frames saved.')
  report.runtimeErrors = errors
  await writeFile(new URL('report.json', out), JSON.stringify(report, null, 2))
  console.log(JSON.stringify(report, null, 2))
  if (report.problems.length || errors.length || !report.fonts.display || !report.fonts.body || report.timelineDuration !== 30) process.exitCode = 1
} finally {
  await browser.close()
  server.close()
}
