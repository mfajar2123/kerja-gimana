import { chromium, expect } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'

const browser = await chromium.launch({ headless: true })
const directory = new URL('../artifacts/ui-qa/', import.meta.url)
await mkdir(directory, { recursive: true })
const report = []
const widths = [320, 375, 390, 440, 768, 1024, 1440, 1728]
const routes = ['/', '/perusahaan', '/bandingkan', '/tentang', '/panduan-review', '/privasi', '/ketentuan', '/kontak', '/masuk', '/daftar', '/lupa-password']
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } })
    page.setDefaultNavigationTimeout(60_000)
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error' || /hydration/i.test(message.text())) errors.push(message.text()) })
    const routeList = [320, 768, 1440].includes(width) ? routes : ['/']
    for (const route of routeList) {
      const response = await page.goto(`http://localhost:3000${route}`)
      await page.waitForLoadState('networkidle')
      await page.evaluate(() => document.fonts.ready)
      const measurement = await page.evaluate(() => {
        const rect = selector => {
          const node = document.querySelector(selector)
          if (!node || getComputedStyle(node).display === 'none') return null
          const r = node.getBoundingClientRect()
          return { x: r.x, y: r.y, width: r.width, height: r.height, bottom: r.bottom, right: r.right }
        }
        return { viewport: innerWidth, scrollWidth: document.documentElement.scrollWidth, heading: document.querySelector('h1')?.textContent.trim(), bodyFont: getComputedStyle(document.body).fontFamily, hero: rect('.hero-section'), heroContent: rect('.hero-content'), heroFoot: rect('.hero-bottom'), heroCaption: rect('.hero-caption'), discover: rect('.hero-discover') }
      })
      if (route === '/') {
        for (const item of await page.locator('.reveal').all()) {
          await item.scrollIntoViewIfNeeded()
          await expect(item).toHaveCSS('opacity', '1')
        }
        if ([375, 1440].includes(width)) {
          await page.locator('.story-layout').screenshot({ path: new URL(`${width}-story.png`, directory).pathname.replace(/^\/([A-Za-z]:)/, '$1') })
          await page.locator('.final-cta').screenshot({ path: new URL(`${width}-contribution.png`, directory).pathname.replace(/^\/([A-Za-z]:)/, '$1') })
        }
        await page.evaluate(() => scrollTo(0, 0))
        await page.locator('.hero-section').screenshot({ path: new URL(`${width}-hero.png`, directory).pathname.replace(/^\/([A-Za-z]:)/, '$1') })
      }
      if (route === '/' || [320, 1440].includes(width)) await page.screenshot({ path: new URL(`${width}-${route.replaceAll('/', '') || 'home'}.png`, directory).pathname.replace(/^\/([A-Za-z]:)/, '$1'), fullPage: true })
      report.push({ route, width, status: response.status(), ...measurement, errors: [...errors] })
      errors.length = 0
    }
    await page.close()
  }
} finally {
  await browser.close()
  await writeFile(new URL('report.json', directory), JSON.stringify(report, null, 2))
}
console.log(JSON.stringify({ pages: report.length, unexpectedResults: report.filter(item => item.errors.length || item.status !== 200 || item.scrollWidth > item.viewport), report: 'artifacts/ui-qa/report.json' }, null, 2))
