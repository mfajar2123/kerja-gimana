import { expect, test, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdir } from 'node:fs/promises'

test.setTimeout(60_000)
const company = {
  id: '00000000-0000-4000-8000-000000000061', name: 'Aurora fixture', slug: 'aurora-fixture', industry: 'Teknologi',
  location: 'Jakarta', description: 'Perusahaan fiktif khusus pengujian browser.', website: null, verified: false, review_count: 1,
  ratings: { overall: 4, work_life: 4, compensation: 4, management: 3, career: 4 }, salary: [],
}
const other = { ...company, id: '00000000-0000-4000-8000-000000000062', name: 'Lentera fixture', slug: 'lentera-fixture' }

async function fixture(page: Page) {
  const state = { signedIn: false, failSalary: true, failCompare: true, failPrivate: true, failDirectory: false, submittedReports: 0 }
  const viewer = { id: 'fixture-launch', email: 'launch@example.invalid', display_name: 'Penguji', role: 'admin' }
  await page.route('**/api/**', route => {
    const url = new URL(route.request().url())
    if (url.pathname === '/api/auth/login') { state.signedIn = true; return route.fulfill({ json: { user: viewer } }) }
    if (url.pathname === '/api/auth/session') return route.fulfill({ json: { user: state.signedIn ? viewer : null } })
    if (url.pathname === '/api/me') return route.fulfill({ json: viewer })
    if (url.pathname === '/api/me/requests') return route.fulfill({ json: { representatives: [] } })
    if (url.pathname === '/api/me/profile') return route.fulfill({ json: { success: true } })
    if (url.pathname === '/api/me/contributions' || url.pathname === '/api/admin') {
      const items = url.searchParams.get('section') === 'queue' ? [{ kind: 'review', id: company.id, created_at: '2026-10-13T00:00:00Z', data: { company: company.name, positives: 'Pengalaman fiktif untuk pengujian.', ratings: company.ratings } }] : []
      return route.fulfill(state.failPrivate ? { status: 503, json: { statusMessage: 'Fixture unavailable' } } : { json: { items, per_page: 50 } })
    }
    if (url.pathname === '/api/companies') {
      if (state.failDirectory) return route.fulfill({ status: 503, json: { statusMessage: 'Fixture unavailable' } })
      const q = (url.searchParams.get('q') || '').toLowerCase()
      return route.fulfill({ json: { companies: [company, other].filter(item => item.name.toLowerCase().includes(q)), total: q ? 1 : 40, configured: true } })
    }
    if (url.pathname === `/api/companies/${company.slug}` || url.pathname === `/api/companies/by-id/${company.id}`) return route.fulfill({ json: company })
    if (url.pathname.endsWith('/salaries')) return route.fulfill(state.failSalary ? { status: 503, json: { statusMessage: 'Fixture unavailable' } } : { json: [
      { role: 'Desainer', location: 'Jakarta', employment_type: 'contract', experience_level: 'mid', salary_basis: 'gross', sample_band: '5–9', median_monthly: 10000000 },
    ] })
    if (url.pathname === '/api/compare') return route.fulfill(state.failCompare ? { status: 503, json: { statusMessage: 'Fixture unavailable' } } : { json: [company, other] })
    if (url.pathname === '/api/reports') { state.submittedReports++; return route.fulfill({ json: { accepted: true } }) }
    if (url.pathname === '/api/industries') return route.fulfill({ json: [{ name: 'Teknologi', slug: 'teknologi' }] })
    return route.fulfill({ json: { configured: true, companies: 0, reviews: 0, salary_reports: 0 } })
  })
  return state
}

async function openDirectory(page: Page) {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('navigation', { name: 'Navigasi footer' }).getByRole('link', { name: 'Cari perusahaan' }).click()
  await expect(page.locator('.directory-row').first()).toBeVisible()
}

async function signIn(page: Page, next = '/dashboard') {
  await page.goto(`/masuk?next=${encodeURIComponent(next)}`)
  await page.getByLabel('Email', { exact: true }).fill('launch@example.invalid')
  await page.getByLabel('Kata sandi', { exact: true }).fill('fixture-only-password-123')
  await page.getByRole('button', { name: 'Masuk ke akun' }).click()
  await expect(page).toHaveURL(next)
}

test('AI concept is clearly coming soon, accessible and responsive, with only a working existing-feature CTA', async ({ page }, testInfo) => {
  await fixture(page)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const aiRequests: string[] = []
  page.on('request', request => { if (/\/api\/(ai|chat)|api\.anthropic\.com/i.test(request.url())) aiRequests.push(request.url()) })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const section = page.locator('#kompas-ai')
  await expect(section).toContainText('Coming soon')
  await expect(section).toContainText('Belum tersedia')
  await expect(section).toContainText('Contoh pertanyaan, bukan percakapan AI aktif.')
  await expect(section.locator('input, textarea, button')).toHaveCount(0)
  await mkdir('artifacts/launch-qa', { recursive: true })
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await section.scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    await section.screenshot({ path: `artifacts/launch-qa/${testInfo.project.name}-${width}-ai.png`, style: '.topbar, .skip-link { visibility: hidden !important; }' })
  }
  const audit = await new AxeBuilder({ page }).include('#kompas-ai').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(audit.violations.filter(issue => issue.impact === 'serious' || issue.impact === 'critical')).toEqual([])
  await section.getByRole('link', { name: 'Bandingkan perusahaan sekarang' }).click()
  await expect(page).toHaveURL('/bandingkan')
  expect(aiRequests).toEqual([])
})

test('directory filters reset page two and network failures have retry instead of an empty directory', async ({ page }) => {
  const state = await fixture(page)
  await openDirectory(page)
  await page.getByRole('button', { name: 'Halaman berikutnya' }).click()
  await expect(page).toHaveURL(url => url.searchParams.get('page') === '2')
  await page.getByLabel('Cari nama perusahaan', { exact: true }).fill('Aurora')
  await expect(page).toHaveURL(url => url.searchParams.get('q') === 'Aurora' && !url.searchParams.has('page'))
  await expect(page.locator('.directory-row')).toHaveCount(1)
  await expect(page.getByLabel('Cari nama perusahaan', { exact: true })).toBeFocused()
  await page.locator('.directory-row').click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(company.name)
  await expect(page).toHaveURL(`/perusahaan/${company.slug}`)
  await page.goBack()
  await expect(page).toHaveURL(url => url.pathname === '/perusahaan' && url.searchParams.get('q') === 'Aurora')
  await expect(page.getByLabel('Cari nama perusahaan', { exact: true })).toHaveValue('Aurora')
  state.failDirectory = true
  await page.getByLabel('Filter lokasi').fill('Bandung')
  await expect(page.getByRole('alert')).toContainText('Filtermu tetap tersimpan')
  await expect(page.locator('.empty-state')).toHaveCount(0)
  state.failDirectory = false
  await page.getByRole('button', { name: 'Coba lagi' }).click()
  await expect(page.locator('.directory-row')).toHaveCount(1)
  await expect(page.getByLabel('Filter lokasi')).toHaveValue('Bandung')
})

test('comparison preserves removable selections across search and recovers failed comparisons', async ({ page }) => {
  const state = await fixture(page)
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('navigation', { name: 'Navigasi footer' }).getByRole('link', { name: 'Bandingkan', exact: true }).click()
  await page.locator('.compare-option').filter({ hasText: company.name }).getByRole('checkbox').check()
  await page.getByLabel('Cari perusahaan', { exact: true }).fill('Lentera')
  await expect(page.locator('.compare-option')).toHaveCount(1)
  await page.getByRole('button', { name: `Batalkan pilihan ${company.name}` }).click()
  await expect(page.locator('.compare-count')).toHaveText('0 / 3 dipilih')
  await page.locator('.compare-option').getByRole('checkbox').check()
  await page.getByLabel('Cari perusahaan', { exact: true }).fill('')
  await page.locator('.compare-option').filter({ hasText: company.name }).getByRole('checkbox').check()
  await expect(page.getByRole('alert')).toContainText('Perbandingan belum bisa dimuat')
  state.failCompare = false
  await page.getByRole('button', { name: 'Coba lagi' }).click()
  await expect(page.locator('.comparison-table')).toContainText('Manajemen')
  await page.getByRole('button', { name: `Batalkan pilihan ${company.name}` }).click()
  await expect(page.locator('.comparison-table')).toHaveCount(0)
})

test('salary failures do not imply an insufficient sample and employment type is visible after retry', async ({ page }) => {
  const state = await fixture(page)
  await openDirectory(page)
  await page.locator('.directory-row').filter({ hasText: company.name }).click()
  await page.locator('.company-tabs').getByRole('link', { name: 'Informasi gaji' }).click()
  await expect(page.getByRole('alert')).toContainText('Ringkasan gaji belum bisa dimuat')
  await expect(page.locator('.empty-state')).toHaveCount(0)
  state.failSalary = false
  await page.getByRole('button', { name: 'Coba lagi' }).click()
  await expect(page.locator('.salary-table')).toContainText('Kontrak')
  await expect(page.locator('.salary-table')).toContainText('tanpa tunjangan dan bonus')
})

test('dashboard and admin failures cannot be mistaken for empty contributions or an empty moderation queue', async ({ page }) => {
  const state = await fixture(page)
  await signIn(page)
  await expect(page.getByRole('alert')).toContainText('Aktivitas belum bisa dimuat')
  await expect(page.locator('.empty-state')).toHaveCount(0)
  state.failPrivate = false
  await page.getByRole('button', { name: 'Coba lagi' }).click()
  await expect(page.locator('.empty-state')).toContainText('Belum ada kontribusi')
  state.failPrivate = true
  await page.getByRole('link', { name: 'Admin', exact: true }).click()
  await page.getByRole('navigation', { name: 'Bagian admin' }).getByRole('link', { name: /^Moderasi/ }).click()
  await expect(page.getByRole('alert')).toContainText('Antrean belum bisa dimuat')
  await expect(page.getByText('Antrean bersih.', { exact: false })).toHaveCount(0)
  state.failPrivate = false
  await page.getByRole('button', { name: 'Coba lagi' }).click()
  await expect(page.locator('.admin-item')).toContainText('Rating keseluruhan')
  await expect(page.locator('.admin-item')).toContainText('Manajemen')
  await expect(page.locator('.admin-item dd').filter({ hasText: '/ 5' })).toHaveCount(5)
})

test('reports preserve login destination, enforce the server message limit, and reject invalid links', async ({ page }) => {
  const state = await fixture(page)
  const path = `/kontak?kategori=review&tentang=${company.id}`
  await page.goto(path)
  await page.waitForLoadState('networkidle')
  await page.getByRole('link', { name: 'Masuk untuk melaporkan review ini.' }).click()
  await expect(page).toHaveURL(url => url.searchParams.get('next') === path)
  await page.getByLabel('Email', { exact: true }).fill('launch@example.invalid')
  await page.getByLabel('Kata sandi', { exact: true }).fill('fixture-only-password-123')
  await page.getByRole('button', { name: 'Masuk ke akun' }).click()
  await expect(page).toHaveURL(path)
  await expect(page.locator('#contact-message')).toHaveAttribute('maxlength', '2000')
  await page.locator('#contact-message').fill('Mohon tinjau ulang informasi pribadi dalam ulasan ini.')
  await page.getByRole('button', { name: 'Kirim laporan' }).click()
  await expect(page.locator('.form-notice-success')).toBeFocused()
  expect(state.submittedReports).toBe(1)
  await page.goto('/kontak?kategori=review&tentang=invalid')
  await expect(page.getByRole('alert')).toContainText('Tautan laporan tidak valid')
  await expect(page.getByRole('button', { name: 'Kirim laporan' })).toHaveCount(0)
})

test('profile feedback stays beside its form and does not require scrolling past account deletion', async ({ page }) => {
  await fixture(page)
  await signIn(page, '/dashboard/pengaturan')
  await page.getByLabel('Nama tampilan').fill('Nama yang diperbarui')
  await page.getByRole('button', { name: 'Simpan perubahan' }).click()
  const feedback = page.locator('.settings-panel').first().getByRole('status')
  await expect(feedback).toHaveText('Nama akun berhasil diperbarui.')
  await expect(feedback).toBeFocused()
})
