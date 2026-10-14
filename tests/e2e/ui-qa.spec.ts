import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.setTimeout(60_000)

test('simplified hero keeps its heading and actions inside the layout across breakpoints', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [320, 375, 390, 440, 768, 1024, 1440, 1728]) {
    await page.setViewportSize({ width, height: width >= 1024 ? 650 : 740 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const content = await page.locator('.hero-content').boundingBox()
    const hero = await page.locator('.hero-section').boundingBox()
    const heading = await page.locator('.hero-title').boundingBox()
    const actions = await page.locator('.hero-actions').boundingBox()
    expect(content).not.toBeNull()
    expect(hero).not.toBeNull()
    expect(heading!.y + heading!.height, `${width}px heading overlaps actions`).toBeLessThanOrEqual(actions!.y)
    expect(content!.y).toBeGreaterThanOrEqual(hero!.y)
    expect(content!.y + content!.height, `${width}px content is clipped`).toBeLessThanOrEqual(hero!.y + hero!.height)
    expect(actions!.x).toBeGreaterThanOrEqual(18)
    expect(actions!.x + actions!.width).toBeLessThanOrEqual(width - 18)
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
  }
})

test('public product pages have styled headings, usable fields, and no accessibility errors', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const path of ['/perusahaan', '/bandingkan', '/masuk', '/daftar', '/lupa-password', '/kontak']) {
    const response = await page.goto(path)
    expect(response?.status()).toBe(200)
    const heading = page.getByRole('heading', { level: 1 })
    await expect(heading).toBeVisible()
    expect(await heading.evaluate(node => parseFloat(getComputedStyle(node).fontSize)), `${path} lost its heading stylesheet`).toBeGreaterThanOrEqual(40)
    const field = page.locator('main input:not([type="checkbox"]):not([type="radio"])').first()
    await expect(field).toBeVisible()
    const bounds = await field.boundingBox()
    expect(bounds!.height, `${path} field lacks its styles`).toBeGreaterThanOrEqual(48)
    expect(bounds!.x).toBeGreaterThanOrEqual(18)
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(375 - 18)
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(audit.violations.filter(issue => issue.impact === 'serious' || issue.impact === 'critical'), path).toEqual([])
  }
})

test('scroll reveals every home section and FAQ works with the keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (/hydration/i.test(message.text())) errors.push(message.text()) })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const reveals = page.locator('.reveal')
  for (const item of await reveals.all()) {
    await item.scrollIntoViewIfNeeded()
    await expect(item).toHaveCSS('opacity', '1')
  }
  const question = page.locator('.faq-item').first()
  await question.locator('summary').focus()
  await page.keyboard.press('Enter')
  await expect(question).toHaveAttribute('open', '')
  await expect(question.locator('p')).toBeVisible()
  expect(errors).toEqual([])
})

test('content stays readable without JavaScript and after enabling reduced motion', async ({ page, browser }) => {
  await page.addInitScript(() => {
    const animate = Element.prototype.animate
    Element.prototype.animate = function (keyframes, options) {
      const animation = animate.call(this, keyframes, options)
      animation.pause()
      return animation
    }
  })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.locator('#kompas-ai').scrollIntoViewIfNeeded()
  await expect.poll(() => page.locator('#kompas-ai .reveal').evaluate(element => {
    return element.getAnimations().some(animation => animation.playState === 'paused')
  })).toBe(true)
  await expect(page.locator('#kompas-ai .reveal')).toHaveCSS('opacity', '1')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('#ai-preview-title')).toBeVisible()
  await expect.poll(() => page.locator('main').evaluate(element => element.getAnimations({ subtree: true }).filter(animation => ['running', 'paused'].includes(animation.playState)).length)).toBe(0)

  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } })
  try {
    const staticPage = await context.newPage()
    await staticPage.goto('http://localhost:3000/')
    await expect(staticPage.getByRole('heading', { level: 1 })).toBeVisible()
    const preview = staticPage.locator('#kompas-ai')
    await preview.scrollIntoViewIfNeeded()
    await expect(preview).toContainText('Coming soon')
    await expect(preview.locator('.reveal')).toHaveCSS('opacity', '1')
  } finally { await context.close() }
})

test('invalid registration is caught before contacting the unavailable backend', async ({ page }) => {
  const writes: string[] = []
  page.on('request', request => { if (request.method() === 'POST') writes.push(request.url()) })
  await page.goto('/daftar')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: 'Daftar dan verifikasi email' }).click()
  expect(await page.locator('#auth-email').evaluate((node: HTMLInputElement) => node.validity.valueMissing)).toBe(true)
  expect(writes).toEqual([])
})

test('anonymous client navigation and document requests preserve the requested destination', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('link', { name: 'Tulis pengalamanmu' }).click()
  await expect(page).toHaveURL(url => url.pathname === '/masuk' && url.searchParams.get('next') === '/tulis-review')
  await page.goto('/lapor-gaji?company=ui-test')
  await expect(page).toHaveURL(url => url.pathname === '/masuk' && url.searchParams.get('next') === '/lapor-gaji?company=ui-test')
})

test('unknown pages have a styled error and a working way home', async ({ page }) => {
  const response = await page.goto('/halaman-uji-tidak-ada')
  expect(response?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'Halaman ini belum ada.' })).toBeVisible()
  await page.getByRole('link', { name: 'Kembali ke beranda' }).click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Kerja')
})
