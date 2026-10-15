import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { chromium } from '../../node_modules/@playwright/test/index.mjs'
const require = createRequire(new URL('../kerjagimana/package.json', import.meta.url))
const sharp = createRequire(require.resolve('hyperframes/package.json'))('sharp')
const root = fileURLToPath(new URL('./', import.meta.url))
const out = new URL('../../artifacts/video/review-portrait/', import.meta.url)
await mkdir(out, { recursive: true })
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.wav': 'audio/wav' }
const server = createServer(async (req, res) => {
  const path = resolve(root, `.${new URL(req.url, 'http://localhost').pathname}`)
  if (!path.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403).end(); return }
  try { res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' }).end(await readFile(path)) }
  catch { res.writeHead(404).end() }
})
await new Promise(done => server.listen(0, '127.0.0.1', done))
console.log('review: local server ready')
let browser
try {
  browser = await chromium.launch({ headless: true })
  console.log('review: browser ready')
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(`http://127.0.0.1:${server.address().port}/compositions/film.html`)
  await page.evaluate(() => document.fonts.ready.then(() => true))
  console.log('review: composition loaded')
  const report = await page.evaluate(() => {
    const tl = window.videoTimeline
    // Authored content region with room for social UI. This is a conservative
    // layout choice, not a guarantee about all app/placement overlay variants.
    const safeArea = { left: 84, top: 240, right: 900, bottom: 1470 }
    const holds = [
      [1.36, 1.49, ['#h-kerja', '#h-di', '#h-sana']],
      [4.18, 4.74, ['#q-yakin', '#q-udah', '#q-tahu', '#q-dalem']],
      [6.34, 7.07, ['#p-work-one', '#p-work-two']],
      [9.06, 9.77, ['#p-salary-one', '#p-salary-two', '#salary-qualifier']],
      [11.50, 12.65, ['#p-interview-one', '#p-interview-two']],
      [14.64, 15.05, ['#c-bandingkan', '#c-sebelum', '#c-memilih']],
      [18.46, 20.00, ['#f-sebelum', '#f-kerja', '#f-disana', '#f-cari', '#f-tahu', '#f-dulu', '#brand', '.cta-label', '#domain']],
    ]
    const focused = [[.30,'#h-kerja'],[.98,'#h-sana'],[1.98,'#q-yakin'],[2.56,'#q-udah'],[3.12,'#q-tahu'],[3.63,'#q-dalem'],[5.46,'#p-work-one'],[5.91,'#p-work-two'],[7.91,'#p-salary-one'],[8.35,'#p-salary-two'],[10.62,'#p-interview-one'],[11.07,'#p-interview-two'],[13.40,'#c-bandingkan'],[14.2,'#c-memilih'],[15.62,'#f-sebelum'],[16.25,'#f-disana'],[16.76,'#f-cari'],[17.28,'#f-dulu']]
    const pose = selector => {
      const element = document.querySelector(selector), rect = element.getBoundingClientRect()
      let opacity = 1, node = element
      while (node instanceof Element) { opacity *= Number(getComputedStyle(node).opacity); node = node.parentElement }
      return { x: rect.x, y: rect.y, right: rect.right, bottom: rect.bottom, opacity, blur: getComputedStyle(element).filter }
    }
    const problems = [], focusProblems = []
    let checks = 0
    for (let frame = 0; frame < 600; frame++) {
      const time = frame / 30
      tl.seek(time, false)
      const hold = holds.find(([start, end]) => time >= start && time < end)
      if (!hold) continue
      for (const selector of hold[2]) {
        const p = pose(selector); checks++
        if (p.opacity < .99 || p.x < safeArea.left || p.y < safeArea.top || p.right > safeArea.right || p.bottom > safeArea.bottom || (p.blur !== 'none' && p.blur !== 'blur(0px)')) problems.push({ time, selector, ...p })
      }
    }
    for (const [time, selector] of focused) {
      tl.seek(time, false); const p = pose(selector)
      if (p.opacity < .80 || p.x < safeArea.left || p.right > safeArea.right || p.y < safeArea.top || p.bottom > safeArea.bottom) focusProblems.push({ time, selector, ...p })
    }
    const moments = [.30,1.4,2.56,3.63,4.4,6.5,9.2,11.8,14.8,16.2,17.2,19,599/30]
    const selectors = ['#hook-camera','#question-camera','#image-work','#image-salary','#image-interview','#closing-camera','#cta','#domain']
    const state = time => { tl.seek(time, false); return JSON.stringify(selectors.map(pose)) }
    const forward = moments.map(state), backward = [...moments].reverse().map(state).reverse()
    const metrics = [...document.querySelectorAll('.word,.cta-label,#domain')].map(el => ({ id: el.id || el.className, text: el.textContent, left: el.offsetLeft, top: el.offsetTop, width: el.offsetWidth, height: el.offsetHeight }))
    return { width:1080, height:1920, duration:tl.duration(), framesSeeked:600, holdChecksEveryFrame:true, readableChecks:checks, safeArea, seekDeterministic:JSON.stringify(forward)===JSON.stringify(backward), images:[...document.images].map(im=>({id:im.id,loaded:im.complete&&im.naturalWidth>0})), problems, focusProblems, metrics }
  })
  console.log('review: frame-level layout checks complete')
  // HyperFrames already produced review snapshots; this script's default is the
  // deterministic, frame-level audit. Opt in to the much slower duplicate capture.
  const captureSnapshots = process.env.REVIEW_SNAPSHOTS === '1'
  const moments = captureSnapshots ? [.30,.75,1.4,1.98,2.56,3.12,3.63,4.4,5.5,6.5,7.25,7.48,7.85,9.2,10.14,10.55,11.8,13.4,14.8,15.6,16.2,16.65,17.2,17.65,18.1,18.3,18.45,19,599/30] : []
  for (const time of moments) {
    await page.evaluate(t => window.videoTimeline.seek(t, false), time)
    await page.screenshot({ path:fileURLToPath(new URL(`frame-${time.toFixed(3)}.png`,out)) })
  }
  console.log('review: visual snapshots complete')
  const tiles = []
  for (const [index, time] of (captureSnapshots ? [1.4,4.4,6.5,9.2,11.8,14.8,17.65,19] : []).entries()) {
    tiles.push({ input:await sharp(fileURLToPath(new URL(`frame-${time.toFixed(3)}.png`,out))).resize(270,480).png().toBuffer(), left:(index%4)*270, top:Math.floor(index/4)*480 })
  }
  await sharp({ create:{ width:1080,height:960,channels:3,background:'#000' } }).composite(tiles).png().toFile(fileURLToPath(new URL('browser-contact-sheet.png',out)))
  report.runtimeErrors = errors
  await writeFile(new URL('report.json',out),JSON.stringify(report,null,2))
  console.log(JSON.stringify(report,null,2))
  if (report.problems.length || report.focusProblems.length || errors.length || !report.seekDeterministic || report.images.some(im=>!im.loaded) || report.duration!==20) process.exitCode = 1
} finally { if (browser) await browser.close(); server.close() }
