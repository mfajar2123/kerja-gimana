import { expect, test } from '@playwright/test'
test.setTimeout(60_000)

test('session updates the navbar, prevents returning to login, and clears on account switch', async ({ page }) => {
  const viewer = { id: 'fixture-user', email: 'user@example.invalid', display_name: 'Pengguna QA', role: 'user' }
  let session: typeof viewer | null = null
  await page.route('**/api/**', async route => {
    const path = new URL(route.request().url()).pathname
    if (path === '/api/auth/session') return route.fulfill({ json: { user: session } })
    if (path === '/api/auth/login') { session = viewer; return route.fulfill({ json: { user: viewer } }) }
    if (path === '/api/auth/logout') { session = null; return route.fulfill({ json: { success: true } }) }
    if (path === '/api/me') return route.fulfill({ json: viewer })
    if (path === '/api/me/contributions') return route.fulfill({ json: { items: [] } })
    if (path === '/api/companies') return route.fulfill({ json: { companies: [], total: 0, configured: true } })
    if (path === '/api/statistics') return route.fulfill({ json: { companies: 0, reviews: 0, salary_reports: 0, configured: true } })
    return route.fulfill({ json: [] })
  })
  await page.goto('/masuk')
  await page.getByLabel('Email', { exact: true }).fill(viewer.email)
  await page.getByLabel('Kata sandi', { exact: true }).fill('Fixture-password-123')
  await page.getByRole('button', { name: 'Masuk ke akun' }).click()
  await expect(page).toHaveURL('/dashboard')
  const menu = page.getByRole('button', { name: 'Menu akun saya' })
  await expect(menu).toBeVisible()
  await expect(page.locator('.nav-login')).toHaveCount(0)
  await menu.click()
  await expect(page.getByRole('menuitem', { name: 'Profil dan pengaturan' })).toBeVisible()
  await expect(page.getByRole('menuitem', { name: 'Ruang admin' })).toHaveCount(0)
  await page.keyboard.press('Escape')
  await expect(menu).toBeFocused()
  await page.getByRole('link', { name: 'KerjaGimana, beranda', exact: true }).first().click()
  await expect(page).toHaveURL('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Kerja')
  await menu.click()
  await page.getByRole('menuitem', { name: 'Keluar dan ganti akun' }).click()
  await expect(page).toHaveURL('/masuk?status=switched-account')
  await expect(page.getByText('Akun sebelumnya sudah keluar.')).toBeVisible()
  await expect(menu).toHaveCount(0)
  await page.getByRole('link', { name: 'KerjaGimana, beranda', exact: true }).first().click()
  await page.getByRole('link', { name: 'Tulis pengalamanmu' }).click()
  await expect(page).toHaveURL(url => url.pathname === '/masuk' && url.searchParams.get('next') === '/tulis-review')
})

test('admin login uses the same form and opens role-specific navigation', async ({ page }) => {
  const viewer = { id: 'fixture-admin', email: 'admin@example.invalid', display_name: 'Admin QA', role: 'admin' }
  let session: typeof viewer | null = null
  await page.route('**/api/**', async route => {
    const path = new URL(route.request().url()).pathname
    if (path === '/api/auth/session') return route.fulfill({ json: { user: session } })
    if (path === '/api/auth/login') { session = viewer; return route.fulfill({ json: { user: viewer } }) }
    if (path === '/api/me') return route.fulfill({ json: viewer })
    if (path === '/api/admin') return route.fulfill({ json: { companies: 0, pending_reviews: 0 } })
    return route.fulfill({ json: [] })
  })
  await page.goto('/masuk?next=%2Fadmin')
  await expect(page.getByRole('heading', { name: 'Masuk ke ruang admin.' })).toBeVisible()
  await page.getByLabel('Email', { exact: true }).fill(viewer.email)
  await page.getByLabel('Kata sandi', { exact: true }).fill('Fixture-password-123')
  await page.getByRole('button', { name: 'Masuk ke akun' }).click()
  await expect(page).toHaveURL('/admin')
  await expect(page.getByRole('heading', { name: 'Ruang admin', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Menu akun admin' })).toBeVisible()
  await expect(page.getByRole('banner')).toHaveClass(/admin-topbar/)
  await expect(page.locator('.nav-login')).toHaveCount(0)
  await page.getByRole('button', { name: 'Menu akun admin' }).click()
  await expect(page.getByRole('menuitem', { name: 'Ruang admin' })).toBeVisible()
  await page.keyboard.press('Escape')
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(page.viewportSize()!.width)
})
