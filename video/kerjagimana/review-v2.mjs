import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '../../node_modules/@playwright/test/index.mjs'
const root = fileURLToPath(new URL('./', import.meta.url))
const out = new URL('../../artifacts/video/review-20s/', import.meta.url)
await mkdir(out, { recursive: true })
const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.wav': 'audio/wav' }
const server = createServer(async (req, res) => {
  const path = resolve(root, `.${new URL(req.url, 'http://localhost').pathname}`)
  if (!path.startsWith(root.endsWith(sep) ? root : root + sep)) { res.writeHead(403).end(); return }
  try { res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' }).end(await readFile(path)) }
  catch { res.writeHead(404).end() }
})
await new Promise(done => server.listen(0, '127.0.0.1', done))
const browser = await chromium.launch({ headless: true })
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
const errors = []
page.on('pageerror', e => errors.push(e.message))
try {
  await page.goto(`http://127.0.0.1:${server.address().port}/compositions/film.html`)
  await page.evaluate(() => document.fonts.ready.then(() => true))
  const report = await page.evaluate(() => {
    const tl = window.videoTimeline
    const holds = [
      [1.36, 1.49, ['#h-kerja', '#h-di', '#h-sana']],
      [4.18, 4.74, ['#q-yakin', '#q-udah', '#q-tahu', '#q-dalem']],
      [6.34, 7.07, ['#p-work-one', '#p-work-two']],
      [9.06, 9.77, ['#p-salary-one', '#p-salary-two', '#salary-qualifier']],
      [11.50, 12.65, ['#p-interview-one', '#p-interview-two']],
      [14.64, 15.05, ['#c-bandingkan', '#c-sebelum', '#c-memilih']],
      [18.46, 19.99, ['#f-sebelum', '#f-kerja', '#f-disana', '#f-cari', '#f-tahu', '#f-dulu', '#brand', '#cta']],
    ]
    const focused = [[0.25,'#h-kerja'],[0.98,'#h-sana'],[1.98,'#q-yakin'],[2.56,'#q-udah'],[3.12,'#q-tahu'],[3.63,'#q-dalem'],[5.46,'#p-work-one'],[5.91,'#p-work-two'],[15.62,'#f-sebelum'],[16.25,'#f-disana'],[16.76,'#f-cari'],[17.28,'#f-dulu']]
    const pose = selector => {
      const element = document.querySelector(selector), r = element.getBoundingClientRect()
      let opacity = 1, node = element
      while (node instanceof Element) { opacity *= Number(getComputedStyle(node).opacity); node = node.parentElement }
      return { x:r.x,y:r.y,right:r.right,bottom:r.bottom,opacity,blur:getComputedStyle(element).filter }
    }
    const problems = [], focusProblems = []
    let checks = 0
    for(let frame=0; frame<600; frame++) {
      const time = frame/30; tl.seek(time,false)
      if(frame%5) continue
      const hold = holds.find(([a,b])=>time>=a&&time<b)
      if(!hold) continue
      for(const selector of hold[2]) {
        const p=pose(selector); checks++
        if(p.opacity<.99 || p.x<0 || p.y<0 || p.right>1920 || p.bottom>1080 || (p.blur!=='none'&&p.blur!=='blur(0px)')) problems.push({time,selector,...p})
      }
    }
    for(const [time,selector] of focused) {
      tl.seek(time,false); const p=pose(selector)
      if(p.opacity<.80 || p.x<30 || p.right>1890 || p.y<20 || p.bottom>1060) focusProblems.push({time,selector,...p})
    }
    const moments=[.25,1.4,2.55,3.6,4.4,6.5,9.2,11.8,14.8,16.2,17.2,19]
    const selectors=['#hook-camera','#question-camera','#image-work','#image-salary','#image-interview','#closing-camera']
    const state=time=>{tl.seek(time,false);return JSON.stringify(selectors.map(pose))}
    const forward=moments.map(state),backward=[...moments].reverse().map(state).reverse()
    const metrics=[...document.querySelectorAll('.word')].map(el=>({id:el.id,text:el.textContent,left:el.offsetLeft,top:el.offsetTop,width:el.offsetWidth,height:el.offsetHeight}))
    return {duration:tl.duration(),framesSeeked:600,readabilitySampleEveryFrames:5,readableChecks:checks,seekDeterministic:JSON.stringify(forward)===JSON.stringify(backward),images:[...document.images].map(im=>({id:im.id,loaded:im.complete&&im.naturalWidth>0})),problems,focusProblems,metrics}
  })
  console.log(JSON.stringify(report,null,2))
  const moments=[.25,.75,1.1,1.4,1.98,2.56,3.12,3.63,4.4,5.5,6.5,7.25,7.48,7.85,9.2,10.14,10.55,11.8,13.4,14.8,15.6,16.2,16.65,17.2,17.65,18.1,19]
  for(const time of moments) {
    await page.evaluate(t=>{window.videoTimeline.seek(t,false)},time)
    await page.screenshot({path:fileURLToPath(new URL(`frame-${time}.png`,out))})
  }
  report.runtimeErrors=errors
  await writeFile(new URL('report.json',out),JSON.stringify(report,null,2))
  if(report.problems.length||report.focusProblems.length||errors.length||!report.seekDeterministic||report.images.some(im=>!im.loaded)||report.duration!==20) process.exitCode=1
} finally { await browser.close(); server.close() }
