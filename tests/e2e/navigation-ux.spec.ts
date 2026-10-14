import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.setTimeout(60_000)
const company = {
  id: '00000000-0000-4000-8000-000000000011', name: 'Perusahaan fixture navigasi', slug: 'fixture-navigasi',
  industry: 'Teknologi', industry_slug: 'teknologi', location: 'Jakarta', locations: [{ city: 'Jakarta' }],
  description: 'Perusahaan fiktif yang hanya berada di browser pengujian navigasi.', website: null,
  verified: false, featured: false, status: 'approved', review_count: 4,
  ratings: { overall: 4, work_life: 4, compensation: 4, management: 4, career: 4 }, salary: [],
}
const adminCompanies = Array.from({ length: 8 }, (_, index) => ({ ...company, id: `00000000-0000-4000-8000-${String(index + 11).padStart(12, '0')}`, name: `Perusahaan fixture ${index + 1}`, slug: `fixture-${index + 1}` }))
const secondCompany = { ...company, id: '00000000-0000-4000-8000-000000000099', name: 'Perusahaan fixture kedua', slug: 'fixture-kedua' }

async function fixtures(page: Page) {
  let signedIn = false
  let detailRequests = 0
  let rejectSave = true
  const viewer = { id: 'fixture-admin', email: 'fixture@example.invalid', display_name: 'Admin fixture', role: 'admin' }
  await page.route('**/api/**', async route => {
    const url = new URL(route.request().url())
    let json: unknown
    if (url.pathname === '/api/auth/login') { signedIn = true; json = { user: viewer } }
    else if (url.pathname === '/api/auth/session') json = { user: signedIn ? viewer : null }
    else if (url.pathname === '/api/admin' && url.searchParams.get('section') === 'overview') json = { companies: 8 }
    else if (url.pathname === '/api/admin') json = { items: url.searchParams.get('page') === '2' ? adminCompanies.map(item => ({ ...item, name: `Halaman 2: ${item.name}` })) : adminCompanies, per_page: 8 }
    else if (url.pathname.startsWith('/api/admin/companies/')) {
      if (rejectSave) { rejectSave = false; return route.fulfill({ status: 422, json: { statusMessage: 'Fixture: perubahan belum tersimpan.' } }) }
      await new Promise(resolve => setTimeout(resolve, 500))
      json = { success: true }
    } else if (url.pathname === '/api/industries') json = [{ name: 'Teknologi', slug: 'teknologi' }]
    else if (url.pathname === '/api/companies') json = { companies: [company, secondCompany], total: 2, configured: true }
    else if (url.pathname === `/api/companies/${company.slug}`) { detailRequests++; json = company }
    else if (url.pathname === `/api/companies/${secondCompany.slug}`) { detailRequests++; json = secondCompany }
    else if (url.pathname.endsWith('/salaries')) json = []
    else if (url.pathname.endsWith('/reviews')) {
      const number = Number(url.searchParams.get('page') || 1)
      json = { reviews: Array.from({ length: 2 }, (_, index) => ({
        id: `review-${number}-${index}`, job_title: `Halaman ${number}, peran ${index + 1}`,
        employment_status: 'current', employment_start: 2025, employment_end: null,
        published_month: 'Oktober 2026', ratings: company.ratings,
        positives: 'Catatan positif fixture. '.repeat(30), improvements: 'Saran perbaikan fixture. '.repeat(30), advice: null, company_responses: [],
      })), total: 4, page: number, per_page: 2 }
    } else if (url.pathname.endsWith('/interviews')) json = { interviews: [], total: 0, page: 1, per_page: 20 }
    else json = { configured: true, companies: 0, reviews: 0, salary_reports: 0 }
    return route.fulfill({ json })
  })
  return { detailRequests: () => detailRequests, setSignedIn: (value: boolean) => { signedIn = value } }
}

async function enterCompany(page: Page) {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('navigation', { name: 'Navigasi footer' }).getByRole('link', { name: 'Cari perusahaan' }).click()
  await page.locator('.directory-row').first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(company.name)
}

async function expectTabsVisible(page: Page) {
  await expect.poll(async () => {
    const tabs = await page.locator('#company-sections').boundingBox()
    const header = await page.locator('.topbar').boundingBox()
    return Boolean(tabs && header && tabs.y >= header.y + header.height && tabs.y + tabs.height < page.viewportSize()!.height)
  }).toBe(true)
}

test('story links navigate without reloading the document and retain keyboard interaction', async ({ page }) => {
  await fixtures(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => Reflect.set(window, '__kgNavigationDocument', 'original'))
  const documents: string[] = []
  page.on('request', request => {
    if (request.isNavigationRequest() && request.frame() === page.mainFrame()) documents.push(request.url())
  })
  for (const path of ['/perusahaan', '/panduan-review', '/bandingkan']) {
    const link = page.locator(`.story-step[href="${path}"]`)
    await link.focus()
    await expect(link).toHaveClass(/is-active/)
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(path)
    expect(await page.evaluate(() => Reflect.get(window, '__kgNavigationDocument'))).toBe('original')
    await page.goBack()
    await expect(page).toHaveURL('/')
    await expect(page.locator('.story-step')).toHaveCount(3)
  }
  expect(documents).toEqual([])
})

test('error recovery clears the error and returns home without reloading the document', async ({ page }) => {
  await fixtures(page)
  await page.goto('/halaman-fixture-tidak-ada')
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { name: 'Halaman ini belum ada.' })).toBeVisible()
  await page.evaluate(() => Reflect.set(window, '__kgNavigationDocument', 'error'))
  await page.getByRole('link', { name: 'Kembali ke beranda', exact: true }).click()
  await expect(page).toHaveURL('/')
  await expect(page.locator('#error-title')).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(await page.evaluate(() => Reflect.get(window, '__kgNavigationDocument'))).toBe('error')
})

test('home company data loads near the section, with a visible retry after network failure', async ({ page }) => {
  await fixtures(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  let requests = 0
  let fail = true
  await page.route('**/api/companies?**', route => {
    requests++
    return route.fulfill(fail ? { status: 503, json: { statusMessage: 'Fixture: database unavailable' } } : { json: { companies: [company, secondCompany], total: 2, configured: true } })
  })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  expect(requests).toBe(0)
  const section = page.locator('.featured-section')
  await section.scrollIntoViewIfNeeded()
  await expect(section.getByRole('alert')).toContainText('Daftar perusahaan belum dapat dimuat')
  fail = false
  await section.getByRole('button', { name: 'Coba lagi' }).click()
  await expect(section.locator('.featured-row')).toHaveCount(2)
  await expect(section.locator('.featured-row').first()).toBeVisible()
  expect(await section.locator('.featured-data').evaluate(node => getComputedStyle(node).opacity)).toBe('1')
})

test('every company section opens at its tabs and reuses the company record', async ({ page }) => {
  const api = await fixtures(page)
  await enterCompany(page)
  for (const label of ['Pengalaman kerja', 'Informasi gaji', 'Interview', 'Ringkasan', 'Interview', 'Pengalaman kerja']) {
    const tabs = page.locator('#company-sections')
    await tabs.getByRole('link', { name: label, exact: true }).click()
    await expect(tabs.locator('[aria-current="page"]')).toHaveText(label)
    await expectTabsVisible(page)
    await expect(tabs.locator('[aria-current="page"]')).toBeFocused()
  }
  expect(api.detailRequests()).toBe(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width)
})

test('history restores reading position and review pagination reveals new results', async ({ page }) => {
  await fixtures(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await enterCompany(page)
  await page.locator('#company-sections').getByRole('link', { name: 'Pengalaman kerja' }).click()
  const firstReview = page.locator('.review-entry').first()
  await firstReview.locator('.review-body').scrollIntoViewIfNeeded()
  const readingY = await page.evaluate(() => window.scrollY)
  // Dispatch without Playwright first scrolling the page to its footer.
  await page.getByRole('navigation', { name: 'Navigasi footer' }).getByRole('link', { name: 'Cari perusahaan' }).dispatchEvent('click')
  await expect(page).toHaveURL('/perusahaan')
  await page.goBack()
  await expect(page).toHaveURL(`/perusahaan/${company.slug}/review`)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(readingY, 0)
  await page.goForward()
  await expect(page).toHaveURL('/perusahaan')
  await page.goBack()
  await page.getByRole('navigation', { name: 'Halaman pengalaman kerja' }).getByRole('button', { name: 'Berikutnya' }).click()
  await expect(firstReview.locator('strong')).toHaveText('Halaman 2, peran 1')
  await expect.poll(async () => (await firstReview.boundingBox())!.y).toBeGreaterThanOrEqual(76)
  await expect.poll(async () => (await firstReview.boundingBox())!.y).toBeLessThan(180)
  await expect(page.locator('.review-list')).toBeFocused()
})

test('admin editor opens at the clicked row, keeps errors visible, and restores focus on cancel and save', async ({ page }) => {
  await fixtures(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/masuk?next=%2Fadmin')
  await page.getByLabel('Email', { exact: true }).fill('fixture@example.invalid')
  await page.getByLabel('Kata sandi', { exact: true }).fill('fixture-password-123')
  await page.getByRole('button', { name: 'Masuk ke akun' }).click()
  await page.getByRole('navigation', { name: 'Bagian admin' }).getByRole('link', { name: /^Perusahaan/ }).click()
  const row = page.locator('.admin-item').nth(6)
  const trigger = row.getByRole('button', { name: 'Edit profil' })
  await trigger.scrollIntoViewIfNeeded()
  const before = await page.evaluate(() => window.scrollY)
  await trigger.click()
  const dialog = page.getByRole('dialog', { name: 'Edit profil perusahaan' })
  await expect(dialog).toBeVisible()
  await expect(dialog.getByLabel('Nama perusahaan')).toBeFocused()
  expect((await dialog.boundingBox())!.y).toBeGreaterThanOrEqual(0)
  await page.keyboard.press('Shift+Tab')
  expect(await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  expect(Math.abs(await page.evaluate(() => window.scrollY) - before)).toBeLessThanOrEqual(2)
  await trigger.click()
  await dialog.getByRole('button', { name: 'Simpan profil' }).click()
  await expect(dialog.getByRole('alert')).toHaveText('Fixture: perubahan belum tersimpan.')
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(audit.violations.filter(issue => issue.impact === 'serious' || issue.impact === 'critical')).toEqual([])
  await dialog.getByRole('button', { name: 'Simpan profil' }).click()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect(row.getByRole('status')).toContainText('Profil tersimpan')
  await page.getByRole('navigation', { name: 'Halaman perusahaan admin' }).getByRole('button', { name: 'Berikutnya' }).click()
  await expect(page.locator('.admin-item h2').first()).toContainText('Halaman 2:')
  await expect(page.locator('.admin-queue')).toBeFocused()
  await expect.poll(async () => (await page.locator('.admin-item').first().boundingBox())!.y).toBeLessThan(180)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width)
})

test('switching company loads its own profile and public content survives cross-tab account changes', async ({ page }) => {
  const api = await fixtures(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await enterCompany(page)
  api.setSignedIn(true)
  await page.evaluate(() => window.dispatchEvent(new StorageEvent('storage', { key: 'kg-session-change' })))
  await expect(page.getByRole('button', { name: 'Menu akun admin' })).toBeVisible()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(company.name)
  await page.locator('#company-sections').getByRole('link', { name: 'Informasi gaji' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText(company.name)
  api.setSignedIn(false)
  await page.evaluate(() => window.dispatchEvent(new StorageEvent('storage', { key: 'kg-session-change' })))
  await expect(page.locator('.nav-login')).toHaveAttribute('href', '/masuk')
  await expect(page.getByRole('button', { name: 'Menu akun admin' })).toHaveCount(0)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(company.name)
  await page.getByRole('navigation', { name: 'Navigasi footer' }).getByRole('link', { name: 'Cari perusahaan' }).dispatchEvent('click')
  await page.locator('.directory-row').filter({ hasText: secondCompany.name }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(secondCompany.name)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
})
