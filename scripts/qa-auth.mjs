import assert from 'node:assert/strict'
import { loadEnvFile } from 'node:process'
import { randomBytes, randomUUID } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import { chromium, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { createClient } from '@supabase/supabase-js'

loadEnvFile('.env')
const origin = process.env.NUXT_SITE_URL || 'http://localhost:3000'
assert.ok(['localhost', '127.0.0.1'].includes(new URL(origin).hostname), 'QA must use the local app.')
const admin = createClient(process.env.NUXT_SUPABASE_URL, process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } })
const password = `QA!${randomBytes(24).toString('base64url')}`
const accounts = []
let browser
const checked = (result, label) => { assert.equal(result.error, null, `${label}: ${result.error?.message || ''}`); return result.data }
await mkdir('artifacts/auth-qa', { recursive: true })
try {
  for (const role of ['user', 'admin']) {
    const email = `kg-browser-qa-${randomUUID()}@example.com`
    const { user } = checked(await admin.auth.admin.createUser({ email, password, email_confirm: true }), 'Create QA account')
    accounts.push({ id: user.id, email, role })
    checked(await admin.from('profiles').update({ role, display_name: role === 'admin' ? 'Admin QA sementara' : 'Pengguna QA sementara' }).eq('id', user.id), 'Set temporary QA profile')
  }
  browser = await chromium.launch()
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const context = await browser.newContext({ baseURL: origin, viewport, reducedMotion: 'reduce' })
    context.setDefaultTimeout(15_000)
    console.log(`Checking ${viewport.width}px: user login and SSR session`)
    const page = await context.newPage()
    const pageErrors = []
    page.on('pageerror', error => pageErrors.push(error.message))
    page.on('console', message => { if (/hydration/i.test(message.text())) pageErrors.push(message.text()) })
    const login = async account => {
      await page.getByLabel('Email', { exact: true }).fill(account.email)
      await page.getByLabel('Kata sandi', { exact: true }).fill(password)
      await page.getByRole('button', { name: 'Masuk ke akun' }).click()
    }
    await page.goto('/masuk')
    await login(accounts[0])
    await expect(page).toHaveURL(`${origin}/dashboard`)
    await expect(page.getByRole('button', { name: 'Menu akun saya' })).toBeVisible()
    await expect(page.locator('.nav-login')).toHaveCount(0)
    await page.reload()
    await expect(page.getByRole('button', { name: 'Menu akun saya' })).toBeVisible()
    await page.goto('/masuk')
    await expect(page).toHaveURL(`${origin}/dashboard`)
    await page.goto('/daftar')
    await expect(page).toHaveURL(`${origin}/dashboard`)
    const deniedSwitch = await context.request.post('/api/auth/login', { headers: { origin }, data: { email: accounts[1].email, password } })
    assert.equal(deniedSwitch.status(), 409, 'An active account must sign out before switching.')
    assert.equal((await (await context.request.get('/api/auth/session')).json()).user.id, accounts[0].id)
    await page.getByRole('button', { name: 'Menu akun saya' }).click()
    await expect(page.getByRole('menuitem', { name: 'Ruang admin' })).toHaveCount(0)
    await expect(page.getByRole('menuitem', { name: 'Profil dan pengaturan' })).toBeVisible()
    await page.screenshot({ path: `artifacts/auth-qa/user-${viewport.width}.png` })
    await page.keyboard.press('Escape')
    await expect(page.getByRole('button', { name: 'Menu akun saya' })).toBeFocused()
    console.log(`Checking ${viewport.width}px: admin denial and explicit account switch`)
    const denial = await page.goto('/admin')
    assert.equal(denial.status(), 403)
    await expect(page.getByRole('heading', { name: 'Akses ini dibatasi.' })).toBeVisible()
    await page.getByRole('button', { name: 'Keluar dan ganti akun', exact: true }).click()
    await expect(page).toHaveURL(url => url.pathname === '/masuk' && url.searchParams.get('next') === '/admin')
    assert.equal((await (await context.request.get('/api/auth/session')).json()).user, null)
    await login(accounts[1])
    await expect(page).toHaveURL(`${origin}/admin`)
    console.log(`Checking ${viewport.width}px: admin navbar and accessibility`)
    await expect(page.getByRole('heading', { name: 'Ruang admin', exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Menu akun admin' })).toBeVisible()
    await expect(page.locator('.topbar')).toHaveClass(/admin-topbar/)
    await page.reload()
    await expect(page.getByRole('button', { name: 'Menu akun admin' })).toBeVisible()
    await page.goto('/masuk')
    await expect(page).toHaveURL(`${origin}/admin`)
    if (viewport.width < 680) {
      await page.getByRole('button', { name: 'Buka menu' }).click()
      await expect(page.getByRole('navigation', { name: 'Navigasi seluler' }).getByRole('link', { name: 'Moderasi', exact: true })).toBeVisible()
      await page.keyboard.press('Escape')
    }
    await page.getByRole('button', { name: 'Menu akun admin' }).click()
    await expect(page.getByRole('menuitem', { name: 'Ruang admin' })).toBeVisible()
    const audit = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    assert.deepEqual(audit.violations.filter(issue => ['serious', 'critical'].includes(issue.impact)).map(issue => ({ id: issue.id, nodes: issue.nodes.map(node => node.target) })), [], 'Account menu accessibility')
    await page.screenshot({ path: `artifacts/auth-qa/admin-${viewport.width}.png` })
    for (const width of viewport.width < 680 ? [320, 390] : [768, 1024, 1440]) {
      await page.setViewportSize({ width, height: viewport.height })
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Navbar overflow at ${width}px`)
    }
    await page.keyboard.press('Escape')
    // Keep the session when the logout request fails; do not falsely display a guest.
    await page.route('**/api/auth/logout', route => route.fulfill({ status: 503, json: { statusMessage: 'Simulated temporary failure' } }))
    await page.getByRole('button', { name: 'Menu akun admin' }).click()
    await page.getByRole('menuitem', { name: 'Keluar', exact: true }).click()
    await expect(page.getByRole('alert')).toContainText('Belum berhasil keluar')
    await expect(page.getByRole('button', { name: 'Menu akun admin' })).toBeVisible()
    await page.unroute('**/api/auth/logout')
    console.log(`Checking ${viewport.width}px: logout across tabs`)
    const otherTab = await context.newPage()
    await otherTab.goto('/dashboard')
    await expect(otherTab.getByRole('button', { name: 'Menu akun admin' })).toBeEnabled()
    // Hold an old session response while another tab logs out. The new signal must
    // trigger another check rather than being discarded behind the pending request.
    let releaseSession
    let sessionHeld = false
    const sessionGate = new Promise(resolve => { releaseSession = resolve })
    await otherTab.route('**/api/auth/session', async route => {
      const response = await route.fetch()
      sessionHeld = true
      await sessionGate
      await route.fulfill({ response })
    }, { times: 1 })
    await otherTab.evaluate(() => window.dispatchEvent(new Event('focus')))
    await expect.poll(() => sessionHeld).toBe(true)
    await page.bringToFront()
    await page.getByRole('button', { name: 'Menu akun admin' }).click()
    await page.getByRole('menuitem', { name: 'Keluar', exact: true }).click()
    await expect(page).toHaveURL(`${origin}/masuk`)
    await expect(page.getByRole('button', { name: 'Menu akun admin' })).toHaveCount(0)
    await otherTab.bringToFront()
    releaseSession()
    await expect(otherTab).toHaveURL(url => url.pathname === '/masuk')
    await page.bringToFront()
    await page.goto('/admin')
    await expect(page).toHaveURL(url => url.pathname === '/masuk' && url.searchParams.get('next') === '/admin')
    assert.deepEqual(pageErrors, [], 'Browser errors or hydration mismatches')
    console.log(`PASS ${viewport.width}px: user/admin login, SSR navbar, redirects, account switch, admin denial, logout failure, cross-tab logout, accessibility`)
    await context.close()
  }
} finally {
  if (browser) await browser.close()
  const failures = []
  for (const account of accounts) {
    const result = await admin.auth.admin.deleteUser(account.id)
    if (result.error) failures.push(result.error.message)
  }
  assert.deepEqual(failures, [], 'QA account cleanup failed')
  console.log('Temporary QA accounts removed; existing accounts were preserved.')
}
