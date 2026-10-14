import assert from 'node:assert/strict'
import { chromium, expect } from '@playwright/test'
const origin = 'http://localhost:3000'
const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } })
  const companies = await (await page.request.get(`${origin}/api/companies?q=DEMO&industry=teknologi&location=Jakarta`)).json()
  assert.equal(companies.companies.length, 1)
  assert.equal(companies.companies[0].slug, 'demo-aurora-teknologi')
  assert.equal((await page.request.get(`${origin}/api/companies?page=0`)).status(), 422)
  const id = companies.companies[0].id
  assert.equal((await page.request.get(`${origin}/api/compare?ids=${id},${id}`)).status(), 422)
  const writes = [], errors = []
  page.on('request', request => { if (new URL(request.url()).pathname === '/api/compare') writes.push(new URL(request.url()).searchParams.get('ids').split(',')) })
  page.on('pageerror', error => errors.push(error.message))
  await page.goto(`${origin}/bandingkan`)
  const aurora = page.locator('.compare-option').filter({ hasText: 'DEMO — Aurora Teknologi' }).getByRole('checkbox')
  const lentera = page.locator('.compare-option').filter({ hasText: 'DEMO — Lentera Kreatif' }).getByRole('checkbox')
  await aurora.check()
  await expect(page.locator('.empty-state')).toContainText('Pilih sedikitnya dua')
  assert.equal(writes.length, 0, 'One selection must not call the comparison API')
  await lentera.check()
  await expect(page.locator('.comparison-table thead th')).toHaveCount(3)
  await expect(page.locator('.comparison-table')).toContainText('Jakarta')
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
  await page.getByRole('button', { name: 'Hapus DEMO — Aurora Teknologi dari perbandingan' }).click()
  await expect(page.locator('.empty-state')).toContainText('Pilih sedikitnya dua')
  await expect(page.locator('.comparison-table')).toHaveCount(0)
  assert.ok(writes.length >= 1 && writes.every(ids => ids.length >= 2))
  // Exercise actual SSR company routes and the shared profile across company changes.
  for (const section of ['', '/review', '/gaji', '/interview']) {
    const response = await page.goto(`${origin}/perusahaan/demo-aurora-teknologi${section}`)
    assert.equal(response.status(), 200)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('DEMO — Aurora Teknologi')
    assert.equal(await page.evaluate(() => window.scrollY), 0, 'Direct entry should start at the company heading')
  }
  for (const label of ['Informasi gaji', 'Pengalaman kerja', 'Interview', 'Ringkasan']) {
    await page.locator('#company-sections').getByRole('link', { name: label, exact: true }).click()
    await expect(page.locator('#company-sections [aria-current="page"]')).toHaveText(label)
    await expect.poll(async () => (await page.locator('#company-sections').boundingBox()).y).toBeGreaterThanOrEqual(67)
    await expect.poll(async () => (await page.locator('#company-sections').boundingBox()).y).toBeLessThan(180)
  }
  await page.getByRole('navigation', { name: 'Navigasi footer' }).getByRole('link', { name: 'Cari perusahaan' }).click()
  await page.locator('.directory-row').filter({ hasText: 'DEMO — Lentera Kreatif' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('DEMO — Lentera Kreatif')
  assert.deepEqual(errors, [])
  console.log('PASS: combined filters, input validation, mobile comparison, direct SSR company sections, tab positioning, and distinct company profiles.')
} finally { await browser.close() }
