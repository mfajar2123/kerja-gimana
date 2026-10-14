import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.setTimeout(60_000)

// These fictional responses exist only inside browser tests, never in seeds or public APIs.
const company = {
  id: '00000000-0000-4000-8000-000000000001', name: 'Perusahaan Fiktif Uji UI', slug: 'perusahaan-fiktif-uji-ui',
  industry: 'Kategori uji', location: 'Lokasi uji', description: 'Fixture fiktif yang hanya dipakai untuk menguji layout di browser.',
  website: null, verified: false, review_count: 0,
  ratings: { overall: null, work_life: null, compensation: null, management: null, career: null }, salary: [],
}

async function useFixtureApi(page: Page) {
  let signedIn = false
  const viewer = { id: 'ui-test-only', email: 'ui-test@example.invalid', display_name: 'Akun fiktif uji UI', role: 'admin' }
  await page.route('**/api/**', async route => {
    const url = new URL(route.request().url())
    let json: unknown
    if (url.pathname === '/api/auth/login') { signedIn = true; json = { user: viewer } }
    else if (url.pathname === '/api/auth/session') json = { user: signedIn ? viewer : null }
    else if (url.pathname === '/api/auth/logout') { signedIn = false; json = { success: true } }
    else if (url.pathname === '/api/me') json = viewer
    else if (url.pathname === '/api/me/requests') json = { representatives: [] }
    else if (url.pathname === '/api/me/contributions') json = { items: [] }
    else if (url.pathname === '/api/admin' && url.searchParams.get('section') === 'overview') json = { companies: 0, published_reviews: 0, pending_reviews: 0 }
    else if (url.pathname === '/api/admin') json = { items: [] }
    else if (url.pathname === '/api/companies') json = { companies: [company], total: 1, configured: true }
    else if (url.pathname === `/api/companies/${company.slug}`) json = company
    else if (url.pathname.endsWith('/salaries')) json = []
    else if (url.pathname.endsWith('/reviews')) json = { reviews: [], total: 0, per_page: 20 }
    else if (url.pathname.endsWith('/interviews')) json = { interviews: [], total: 0, per_page: 20 }
    else if (url.pathname === '/api/industries') json = []
    else return route.fulfill({ status: 501, json: { statusMessage: 'No fixture response is configured for this API.' } })
    return route.fulfill({ json })
  })
}

test('simulated private layouts render settings and each distinct admin child page', async ({ page }) => {
  await useFixtureApi(page)
  await page.goto('/masuk?next=%2Fdashboard')
  await page.getByLabel('Email', { exact: true }).fill('ui-test@example.invalid')
  await page.getByLabel('Kata sandi', { exact: true }).fill('test-only-password-123')
  await page.getByRole('button', { name: 'Masuk ke akun' }).click()
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Akun fiktif uji UI')
  await page.getByRole('link', { name: 'Pengaturan', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Pengaturan akun', exact: true })).toBeVisible()
  expect((await page.getByLabel('Nama tampilan').boundingBox())!.height).toBeGreaterThanOrEqual(48)
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(audit.violations.filter(issue => issue.impact === 'serious' || issue.impact === 'critical')).toEqual([])
  await page.getByRole('link', { name: 'Ringkasan', exact: true }).click()
  await page.getByRole('link', { name: 'Admin', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'Ruang admin', exact: true })).toBeVisible()
  await page.getByRole('navigation', { name: 'Bagian admin' }).getByRole('link', { name: /^Moderasi/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Antrean moderasi')
  for (const [link, heading] of [['Perusahaan', 'Daftar perusahaan'], ['Laporan', 'Laporan & sengketa'], ['Pengguna', 'Pengguna']]) {
    await page.getByRole('navigation', { name: 'Navigasi admin' }).getByRole('link', { name: link, exact: true }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading!)
  }
  expect(await page.locator('main').count()).toBe(1)
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width)
})

test('simulated company pages show styled tabs and honest missing-data states', async ({ page }) => {
  await useFixtureApi(page)
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('navigation', { name: 'Navigasi footer' }).getByRole('link', { name: 'Cari perusahaan' }).click()
  await page.locator('.directory-row').click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(company.name)
  const mark = await page.locator('.company-detail-mark').boundingBox()
  expect(mark!.width).toBeGreaterThanOrEqual(72)
  await page.locator('.company-tabs').getByRole('link', { name: 'Informasi gaji' }).click()
  await expect(page.locator('.empty-state')).toContainText('Belum ada kelompok gaji')
  await page.locator('.company-tabs').getByRole('link', { name: 'Interview', exact: true }).click()
  await expect(page.locator('.empty-state')).toContainText('Belum ada cerita interview')
  await page.locator('.company-tabs').getByRole('link', { name: 'Pengalaman kerja', exact: true }).click()
  await expect(page.locator('.empty-state')).toContainText('Belum ada review')
  const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(audit.violations.filter(issue => issue.impact === 'serious' || issue.impact === 'critical')).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width)
})

test('search keyboard selection stays within five rendered fixture suggestions', async ({ page }) => {
  await page.route('**/api/companies?**', route => route.fulfill({ json: {
    companies: Array.from({ length: 7 }, (_, index) => ({ ...company, id: `fixture-${index}`, name: `Perusahaan Fiktif Uji ${index + 1}`, slug: `fiktif-${index}` })), total: 7, configured: true,
  } }))
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const input = page.getByLabel('Cari nama perusahaan', { exact: true })
  await input.fill('Fiktif')
  await expect(input).toHaveAttribute('aria-expanded', 'true')
  await expect(page.locator('#home-company-results [role="option"]')).toHaveCount(5)
  await input.press('ArrowUp')
  await expect(input).toHaveAttribute('aria-activedescendant', 'home-company-option-4')
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute('aria-activedescendant', 'home-company-option-0')
  await input.press('Escape')
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toHaveValue('Fiktif')
  await page.getByRole('button', { name: 'Hapus pencarian' }).click()
  await expect(input).toHaveValue('')
})
