import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.setTimeout(60_000)

test('hero content, caption, and scroll link stay in separate rows across breakpoints', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [320, 375, 390, 440, 768, 1024, 1440, 1728]) {
    await page.setViewportSize({ width, height: width >= 1024 ? 650 : 740 })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    const content = await page.locator('.hero-content').boundingBox()
    const bottom = await page.locator('.hero-bottom').boundingBox()
    const hero = await page.locator('.hero-section').boundingBox()
    expect(content).not.toBeNull()
    expect(bottom).not.toBeNull()
    expect(hero).not.toBeNull()
    expect(content!.y + content!.height, `${width}px hero content collides with footer`).toBeLessThanOrEqual(bottom!.y)
    expect(bottom!.y + bottom!.height, `${width}px footer is clipped`).toBeLessThanOrEqual(hero!.y + hero!.height)
    if (width > 900) {
      const caption = await page.locator('.hero-caption').boundingBox()
      const discover = await page.locator('.hero-discover').boundingBox()
      expect(caption!.x).toBeGreaterThanOrEqual(discover!.x + discover!.width)
      expect(caption!.x + caption!.width).toBeLessThanOrEqual(width)
    }
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
