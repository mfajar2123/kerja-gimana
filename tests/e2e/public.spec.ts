import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('homepage loads honest database-empty content and a working directory link', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveTitle(/KerjaGimana/)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByLabel('Cari nama perusahaan')).toBeVisible()
  await expect(page.getByLabel('Lihat direktori perusahaan')).toHaveAttribute('href', '/perusahaan')
  expect(errors).toEqual([])
})

test('mobile navigation opens, closes with Escape, and the viewport has no horizontal overflow', async ({ page }) => {
  const pageErrors: string[] = []
  page.on('pageerror', error => pageErrors.push(error.message))
  await page.setViewportSize({ width: 320, height: 740 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const menu = page.getByRole('button', { name: 'Buka menu' })
  await menu.click()
  await expect(page.getByRole('button', { name: 'Tutup menu' })).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByRole('navigation', { name: 'Navigasi seluler' })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('navigation', { name: 'Navigasi seluler' })).toHaveCount(0)
  expect(pageErrors).toEqual([])
  const widths = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }))
  expect(widths.content).toBeLessThanOrEqual(widths.viewport)
})

test('homepage has no serious automated accessibility findings', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
  expect(result.violations.filter(violation => violation.impact === 'critical' || violation.impact === 'serious')).toEqual([])
})
