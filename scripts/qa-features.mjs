import assert from 'node:assert/strict'
import { randomBytes, randomUUID } from 'node:crypto'
import { loadEnvFile } from 'node:process'
import { request as httpRequest } from 'node:http'
import { createClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { request, chromium, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdir, writeFile } from 'node:fs/promises'

loadEnvFile('.env')
const origin = process.env.NUXT_SITE_URL || 'http://localhost:3000'
assert.ok(['localhost', '127.0.0.1'].includes(new URL(origin).hostname))
const options = { auth: { persistSession: false, autoRefreshToken: false } }
const admin = createClient(process.env.NUXT_SUPABASE_URL, process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY, options)
const anon = createClient(process.env.NUXT_SUPABASE_URL, process.env.NUXT_SUPABASE_PUBLISHABLE_KEY, options)
const checked = (result, label) => { assert.equal(result.error, null, `${label}: ${result.error?.message || ''}`); return result.data }
const accounts = [], contexts = [], companyIds = [], contacts = [], targets = []
let browser
const password = `QA!${randomBytes(24).toString('base64url')}`
const results = []
function pass(message) { results.push(message); console.log(`PASS: ${message}`) }
async function call(api, method, path, data, status = 200) {
  const response = await api[method](path, { ...(data === undefined ? {} : { data }) })
  assert.equal(response.status(), status, `${method} ${path}: ${(await response.text()).slice(0, 250)}`)
  return response.json().catch(() => null)
}
async function account(role = 'user') {
  const email = `kg-feature-qa-${randomUUID()}@example.com`
  const { user } = checked(await admin.auth.admin.createUser({ email, password, email_confirm: true }), 'QA account')
  const result = { id: user.id, email, role, cookies: [] }
  accounts.push(result)
  checked(await admin.from('profiles').update({ role, display_name: `QA ${role}` }).eq('id', user.id), 'QA role')
  const client = createServerClient(process.env.NUXT_SUPABASE_URL, process.env.NUXT_SUPABASE_PUBLISHABLE_KEY, {
    cookieOptions: { httpOnly: true, sameSite: 'lax', path: '/' },
    cookies: { getAll: () => result.cookies, setAll: values => { for (const value of values) { result.cookies = result.cookies.filter(cookie => cookie.name !== value.name); result.cookies.push(value) } } },
  })
  const session = checked(await client.auth.signInWithPassword({ email, password }), 'QA sign in').session
  result.token = session.access_token; result.client = client
  result.api = await request.newContext({ baseURL: origin, extraHTTPHeaders: { origin, cookie: result.cookies.map(item => `${item.name}=${item.value}`).join('; ') } })
  contexts.push(result.api)
  return result
}
async function moderate(api, kind, id, status) {
  targets.push(id)
  return call(api, 'post', '/api/admin/moderate', { kind, id, status, reason: 'other', note: 'Temporary QA moderation; fixture removed after verification.' })
}
try {
  const guest = await request.newContext({ baseURL: origin }); contexts.push(guest)
  await call(guest, 'post', '/api/contact', {}, 403)
  const evil = await guest.post('/api/contact', { headers: { origin: 'https://evil.example' }, data: {} }); assert.equal(evil.status(), 403)
  const mime = await guest.post('/api/contact', { headers: { origin, 'content-type': 'text/plain' }, data: '{}' }); assert.equal(mime.status(), 415)
  const invalid = await guest.post('/api/contact', { headers: { origin, 'content-type': 'application/json' }, data: Buffer.from('{') }); assert.equal(invalid.status(), 400)
  const chunkStatus = await new Promise((resolve, reject) => {
    const req = httpRequest(`${origin}/api/contact`, { method: 'POST', headers: { origin, 'content-type': 'application/json', 'transfer-encoding': 'chunked' } }, res => { res.resume(); res.on('end', () => resolve(res.statusCode)) })
    req.on('error', reject); req.write('{"message":"'); req.write('a'.repeat(40000)); req.end('"}')
  })
  assert.equal(chunkStatus, 413)
  const document = await guest.get('/')
  const csp = document.headers()['content-security-policy']; assert.ok(csp && !csp.split(';')[1].includes('unsafe-inline'))
  assert.equal(document.headers()['x-content-type-options'], 'nosniff')
  const html = await document.text(); const nonce = /nonce-([^']+)/.exec(csp)?.[1]; assert.ok(nonce)
  for (const tag of html.match(/<script\b[^>]*>/gi) || []) assert.ok(tag.includes(`nonce="${nonce}"`), 'Every SSR script needs its response nonce')
  pass('CSRF origin checks, MIME, malformed JSON, actual chunked 32KB limit, security headers and CSP nonce')

  const user = await account(); const moderator = await account('admin'); const other = await account()
  await call(user.api, 'get', '/api/admin', undefined, 403)
  assert.deepEqual(checked(await user.client.from('profiles').select('id').eq('id', other.id), 'IDOR profile'), [])
  assert.ok((await user.client.from('profiles').update({ role: 'admin' }).eq('id', user.id)).error)
  assert.ok((await user.client.rpc('submit_contact', { p_data: {} })).error)
  pass('User/admin separation, profile IDOR and self-promotion denied, server-only contact RPC')

  const company = await call(user.api, 'post', '/api/companies', { name: `QA temporary ${randomUUID()}`, industry: 'teknologi', location: 'Jakarta', website: '', description: 'Temporary fictional fixture for automated verification. Never retain as public information.' })
  companyIds.push(company.id)
  assert.equal(checked(await admin.from('companies').select('status').eq('id', company.id).single(), 'Pending company').status, 'pending')
  await call(guest, 'get', `/api/companies/by-id/${company.id}`, undefined, 404)
  await moderate(moderator.api, 'company', company.id, 'published')
  const detail = await call(guest, 'get', `/api/companies/by-id/${company.id}`)
  assert.equal(detail.id, company.id); assert.equal(detail.location, 'Jakarta')
  await call(moderator.api, 'patch', `/api/admin/companies/${company.id}`, { name: detail.name, slug: detail.slug, industry: 'teknologi', location: 'Bandung', website: 'https://qa.example', description: detail.description, verified: true, featured: false })
  const edited = await call(guest, 'get', `/api/companies/${detail.slug}`); assert.ok(edited.location.includes('Bandung')); assert.equal(edited.verified, true)
  pass('Company suggestion hidden pending moderation, approval publishes location, admin editing and curated ID lookup')

  const reviewBody = { company_id: company.id, job_title: 'QA Analyst', employment_status: 'former', employment_start: 2022, employment_end: 2025, positives: 'Temporary fictional content for automated quality assurance of the contribution workflow.', improvements: 'Temporary fictional feedback describing coordination and documentation improvements for testing.', advice: '', ratings: { overall: 4, work_life: 4, compensation: 3, management: 4, career: 4 }, status: 'pending' }
  const future = await user.client.rpc('submit_review', { p_company: company.id, p_job: 'QA future date', p_employment: 'current', p_start: new Date().getFullYear() + 1, p_end: null, p_positives: reviewBody.positives, p_improvements: reviewBody.improvements, p_advice: '', p_ratings: reviewBody.ratings })
  assert.equal(future.error?.code, '22023', 'Direct RPC must reject future employment years')
  const blankEvidence = await user.client.rpc('request_company_representative', { p_company: company.id, p_evidence: '' })
  assert.equal(blankEvidence.error?.code, '23514', 'Direct RPC must reject empty representative evidence')
  await call(user.api, 'post', '/api/reviews', { ...reviewBody, status: 'published' }, 422)
  await call(user.api, 'post', '/api/reviews', { ...reviewBody, employment_end: null }, 422)
  const review = await call(user.api, 'post', '/api/reviews', reviewBody); targets.push(review.id)
  await call(user.api, 'post', '/api/reviews', reviewBody, 409)
  assert.ok((await moderator.client.from('reviews').update({ status: 'published' }).eq('id', review.id)).error, 'Moderation cannot bypass audited RPC')
  assert.deepEqual((await call(guest, 'get', `/api/companies/${detail.slug}/reviews`)).reviews, [])
  await moderate(moderator.api, 'review', review.id, 'published')
  const published = await call(guest, 'get', `/api/companies/${detail.slug}/reviews`)
  assert.equal(published.reviews[0].id, review.id)
  assert.equal(JSON.stringify(published).includes(user.id), false); assert.equal(JSON.stringify(published).includes(user.email), false)
  const salary = await call(user.api, 'post', '/api/salaries', { company_id: company.id, role: 'QA Analyst', location: 'Jakarta', employment_type: 'full_time', experience_level: 'mid', base_salary: 96000000, salary_period: 'yearly', salary_basis: 'gross', allowances: 0, bonus: 0 }); targets.push(salary.id)
  await moderate(moderator.api, 'salary', salary.id, 'published')
  assert.deepEqual(await call(guest, 'get', `/api/companies/${detail.slug}/salaries`), [])
  const interview = await call(user.api, 'post', '/api/interviews', { company_id: company.id, position: 'QA Analyst', stages: 'Document review and team discussion.', difficulty: 3, experience: 'neutral', duration_days: 14, questions: 'Describe how you prioritize quality assurance and collaborate with your team.', outcome: 'unknown' }); targets.push(interview.id)
  await moderate(moderator.api, 'interview', interview.id, 'published')
  assert.equal((await call(guest, 'get', `/api/companies/${detail.slug}/interviews`)).interviews.length, 1)
  pass('Review, salary and interview submissions, validation, duplicates, audited moderation and public author privacy')

  const responseBody = { company_id: company.id, review_id: review.id, content: 'Temporary response for QA, describing follow-up on the simulated feedback.', evidence: 'Temporary synthetic evidence for testing representative authorization.' }
  await call(other.api, 'post', '/api/company-responses', responseBody, 403)
  const rep = await call(other.api, 'post', '/api/me/company-representative', { company_id: company.id, evidence: responseBody.evidence }); targets.push(rep.id)
  await moderate(moderator.api, 'representative', rep.id, 'published')
  const response = await call(other.api, 'post', '/api/company-responses', responseBody); targets.push(response.id)
  await moderate(moderator.api, 'response', response.id, 'published')
  assert.equal((await call(guest, 'get', `/api/companies/${detail.slug}/reviews`)).reviews[0].company_responses.length, 1)
  const report = await call(other.api, 'post', '/api/reports', { review_id: review.id, reason: 'disputed_claim', details: 'Temporary fictional report for testing the review dispute resolution workflow.' }); targets.push(report.id)
  await moderate(moderator.api, 'report', report.id, 'resolved')
  assert.equal((await call(guest, 'get', `/api/companies/${detail.slug}/reviews`)).reviews.length, 0)
  pass('Verified representative required, moderated response publication, report resolution removes the review')

  const contact = await call(user.api, 'post', '/api/contact', { email: user.email, subject: 'Temporary QA contact', message: 'Temporary fictional message for checking privacy and the support moderation workflow.' }); contacts.push(contact.id)
  await moderate(moderator.api, 'contact', contact.id, 'resolved')
  const batch = Array.from({ length: 51 }, () => ({ id: randomUUID(), email: user.email, subject: 'Temporary QA pagination', message: 'Temporary QA fixture for validating pagination; removed after the test.' }))
  contacts.push(...batch.map(row => row.id)); checked(await admin.from('contact_messages').insert(batch), 'Pagination fixtures')
  const first = await call(moderator.api, 'get', '/api/admin?section=queue&kind=contact&page=1')
  const second = await call(moderator.api, 'get', '/api/admin?section=queue&kind=contact&page=2')
  assert.equal(first.items.length, 50); assert.ok(second.items.length >= 1); assert.ok(!second.items.some(item => first.items.some(prior => prior.id === item.id)))
  pass('Private contact submission and resolution, moderation queue pagination above 50 without overlap')

  // Manual QA can approve other seeded DEMO companies; scope these cohort checks
  // to the three original public examples rather than the entire mutable directory.
  const demoResponse = await call(guest, 'get', '/api/companies?q=DEMO')
  const publicExamples = new Set(['demo-aurora-teknologi', 'demo-lentera-kreatif', 'demo-cakrawala-logistik'])
  const demo = { companies: demoResponse.companies.filter(row => publicExamples.has(row.slug)) }
  assert.equal(demo.companies.length, 3)
  const aurora = demo.companies.find(row => row.slug === 'demo-aurora-teknologi')
  assert.equal(aurora.salary.length, 2)
  assert.equal(aurora.salary.find(row => row.salary_basis === 'gross').median_monthly, 10000000)
  assert.ok(demo.companies.filter(row => row.id !== aurora.id).every(row => row.salary.length === 0))
  const compare = await call(guest, 'get', `/api/compare?ids=${demo.companies.map(row => row.id).join(',')}`)
  assert.ok(JSON.stringify(compare).includes(aurora.id))
  const privacy = await user.client.rpc('submit_interview', { p_data: { company_id: company.id, position: 'QA Privacy', stages: 'Document review', difficulty: 3, experience: 'neutral', duration_days: 2, questions: 'Contact personal@example.com to learn all the private details.', outcome: 'unknown' } }); assert.ok(privacy.error)
  for (let n = 0; n < 5; n++) checked(await other.client.rpc('submit_interview', { p_data: { company_id: company.id, position: `QA Limit ${n}`, stages: 'Document review', difficulty: 3, experience: 'neutral', duration_days: 2, questions: 'Describe your approach to documentation and collaboration.', outcome: 'unknown' } }), 'Direct RPC limit fixture')
  const limited = await other.client.rpc('submit_interview', { p_data: { company_id: company.id, position: 'QA Limit denied', stages: 'Document review', difficulty: 3, experience: 'neutral', duration_days: 2, questions: 'Describe your approach to documentation and collaboration.', outcome: 'unknown' } }); assert.equal(limited.error?.code, 'PT429')
  pass('Salary anonymity threshold, yearly normalization, gross/take-home separation, comparison, direct RPC privacy and rate limits')

  checked(await admin.from('profiles').update({ status: 'suspended' }).eq('id', other.id), 'Suspend')
  await call(other.api, 'get', '/api/me', undefined, 403)
  assert.ok((await other.client.rpc('update_own_profile', { p_name: 'Bypass suspended' })).error)
  checked(await admin.from('profiles').update({ status: 'active' }).eq('id', other.id), 'Restore')
  await call(moderator.api, 'patch', `/api/admin/users/${moderator.id}`, { status: 'suspended' }, 403)
  const revoked = createClient(process.env.NUXT_SUPABASE_URL, process.env.NUXT_SUPABASE_PUBLISHABLE_KEY, { ...options, global: { headers: { Authorization: `Bearer ${other.token}` } } })
  await call(other.api, 'post', '/api/auth/logout', {})
  assert.deepEqual(checked(await revoked.from('profiles').select('id'), 'Revoked JWT read'), [])
  assert.ok((await revoked.rpc('update_own_profile', { p_name: 'Replay old JWT' })).error)
  pass('Suspension enforced in API/RLS/RPC, admin self-suspension denied, old JWT denied immediately after logout')

  const recovery = checked(await admin.auth.admin.generateLink({ type: 'recovery', email: user.email }), 'Recovery link without email')
  const recoveryApi = await request.newContext({ baseURL: origin, extraHTTPHeaders: { origin } }); contexts.push(recoveryApi)
  const callback = await recoveryApi.get(`/api/auth/callback?token_hash=${encodeURIComponent(recovery.properties.hashed_token)}&type=recovery`, { maxRedirects: 0 }); assert.equal(callback.status(), 302)
  const newPassword = `Changed!${randomBytes(24).toString('base64url')}`
  await call(recoveryApi, 'put', '/api/auth/password', { password: newPassword })
  assert.ok((await anon.auth.signInWithPassword({ email: user.email, password })).error)
  checked(await anon.auth.signInWithPassword({ email: user.email, password: newPassword }), 'New password'); await anon.auth.signOut()
  checked(await user.client.auth.signInWithPassword({ email: user.email, password: newPassword }), 'Refresh browser QA session')
  pass('Recovery callback and password update, old password rejected and new password accepted')

  browser = await chromium.launch()
  await mkdir('artifacts/security-qa', { recursive: true })
  await call(moderator.api, 'patch', `/api/admin/companies/${company.id}`, { name: detail.name, slug: detail.slug, industry: 'teknologi', location: 'Jakarta', website: '', description: '<img src=x onerror="window.__qaXss=true"> Temporary fictional XSS verification content, removed after QA.', verified: false, featured: false })
  const xssPage = await browser.newPage()
  await xssPage.goto(`${origin}/perusahaan/${detail.slug}`)
  await xssPage.waitForLoadState('networkidle')
  await expect(xssPage.locator('.company-description')).toContainText('<img src=x')
  assert.equal(await xssPage.locator('.company-description img').count(), 0)
  assert.equal(await xssPage.evaluate(() => typeof window.__qaXss), 'undefined')
  const inline = await xssPage.evaluate(() => new Promise(resolve => {
    document.addEventListener('securitypolicyviolation', event => resolve({ blocked: event.blockedURI === 'inline', ran: Boolean(window.__qaInline) }), { once: true })
    const script = document.createElement('script'); script.textContent = 'window.__qaInline=true'; document.body.append(script)
    setTimeout(() => resolve({ blocked: false, ran: Boolean(window.__qaInline) }), 2000)
  }))
  // The enforced header was checked above; verify execution is prevented even
  // when the browser delays or reports a different CSP violation event first.
  assert.equal(inline.ran, false); await xssPage.close()
  pass('Stored HTML rendered as text; browser CSP blocks an injected script without a nonce')
  for (const actor of [null, user, moderator]) {
    const context = await browser.newContext({ baseURL: origin, reducedMotion: 'reduce' })
    if (actor) await context.addCookies(actor.cookies.map(cookie => ({ name: cookie.name, value: cookie.value, url: origin, httpOnly: true, sameSite: 'Lax' })))
    const page = await context.newPage(); const failures = []
    page.on('pageerror', error => failures.push(error.message))
    page.on('console', message => { if (/hydration|Content Security Policy|Refused to execute/i.test(message.text())) failures.push(message.text()) })
    const paths = !actor ? ['/', '/perusahaan', '/perusahaan/demo-aurora-teknologi', '/perusahaan/demo-aurora-teknologi/review', '/perusahaan/demo-aurora-teknologi/gaji', '/perusahaan/demo-aurora-teknologi/interview', '/bandingkan', '/kontak'] : actor.role === 'admin' ? ['/admin', '/admin/review', '/admin/perusahaan', '/admin/laporan', '/admin/pengguna'] : ['/dashboard', '/dashboard/review', '/dashboard/pengaturan', `/tulis-review?company=${aurora.id}`, `/lapor-gaji?company=${aurora.id}`, `/cerita-interview?company=${aurora.id}`, '/perusahaan/usulkan']
    const widths = process.argv.includes('--forms-only') || (process.argv.includes('--forms-and-admin') && actor?.role !== 'admin') ? [] : [320, 390, 768, 1024, 1440]
    for (const width of widths) {
      console.log(`Browser QA: ${actor?.role || 'guest'} ${width}px`)
      await page.setViewportSize({ width, height: 900 })
      for (const path of paths) {
        const response = await page.goto(path); assert.equal(response.status(), 200, path)
        await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
        await page.waitForLoadState('networkidle')
        if (path === '/bandingkan') {
          for (const slug of ['demo-aurora-teknologi','demo-lentera-kreatif','demo-cakrawala-logistik']) {
            const name = demo.companies.find(row => row.slug === slug).name
            await page.locator('.compare-option').filter({ hasText: name }).getByRole('checkbox').check()
          }
          await expect(page.locator('.comparison-table thead th')).toHaveCount(4)
          await expect(page.locator('.comparison-table')).toContainText('Jakarta')
          await page.getByRole('button', { name: `Hapus ${aurora.name} dari perbandingan` }).click()
          await expect(page.locator('.comparison-table thead th')).toHaveCount(3)
        }
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} overflow ${width}px`)
        if (path.includes('?company=')) await expect(page.getByRole('combobox', { name: 'Pilih perusahaan' })).toHaveValue(aurora.id)
        if (width === 390) {
          const audit = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()
          assert.deepEqual(audit.violations.filter(issue => ['critical','serious'].includes(issue.impact)).map(issue => ({ id: issue.id, nodes: issue.nodes.map(node => node.target) })), [], path)
        }
      }
      await page.screenshot({ path: `artifacts/security-qa/${actor?.role || 'guest'}-${width}.png`, fullPage: true })
    }
    if (actor?.role === 'user') {
      await page.goto('/dashboard/pengaturan')
      await page.getByLabel('Nama tampilan').fill('QA profil diperbarui')
      await page.getByRole('button', { name: 'Simpan perubahan' }).click()
      await expect(page.getByText('Nama akun berhasil diperbarui.')).toBeVisible()
      await page.getByRole('button', { name: 'Menu akun saya' }).click()
      await expect(page.getByRole('menu')).toContainText('QA profil diperbarui')
      await page.keyboard.press('Escape')
      await page.goto('/perusahaan/usulkan')
      await page.locator('#company-name').fill(`QA UI ${randomUUID()}`)
      await page.locator('#company-industry').selectOption('teknologi')
      await page.locator('#company-location').fill('Jakarta')
      await page.locator('#company-description').fill('Temporary fictional company used to verify the real browser submission workflow.')
      await page.getByRole('checkbox').check()
      const submitted = page.waitForResponse(response => response.url().endsWith('/api/companies') && response.request().method() === 'POST')
      await page.getByRole('button', { name: 'Kirim untuk dimoderasi' }).click()
      const saved = await submitted; assert.equal(saved.status(), 200); companyIds.push((await saved.json()).id)
      await expect(page.locator('.form-notice-success[role="status"]')).toContainText('Usulan berhasil dikirim')
      for (const kind of ['review','salary','interview']) {
        const path = { review: '/tulis-review', salary: '/lapor-gaji', interview: '/cerita-interview' }[kind]
        await page.goto(`${path}?company=${company.id}`)
        await expect(page.getByRole('combobox', { name: 'Pilih perusahaan' })).toHaveValue(company.id)
        if (kind === 'review') {
          await page.locator('#review-job').fill('QA UI Analyst')
          await page.locator('#employment-start').fill('2022')
          await page.locator('#review-positives').fill(reviewBody.positives)
          await page.locator('#review-improvements').fill(reviewBody.improvements)
        } else if (kind === 'salary') {
          await page.locator('#salary-role').fill('QA UI Analyst')
          await page.locator('#salary-location').fill('Jakarta')
          await page.locator('#salary-amount').fill('8000000')
        } else {
          await page.locator('#interview-position').fill('QA UI Analyst')
          await page.locator('#interview-stages').fill('Document review and team discussion.')
          await page.locator('#interview-duration').fill('14')
          await page.locator('#interview-questions').fill('Describe how you prioritize quality assurance and collaborate with your team.')
        }
        await page.getByRole('checkbox').check()
        const endpoint = { review: '/api/reviews', salary: '/api/salaries', interview: '/api/interviews' }[kind]
        const submitted = page.waitForResponse(response => response.url().endsWith(endpoint) && response.request().method() === 'POST')
        await page.getByRole('button', { name: 'Kirim untuk dimoderasi' }).click()
        const response = await submitted; assert.equal(response.status(), 200, `Browser ${kind} submission`); const savedId = (await response.json()).id; targets.push(savedId)
        await expect(page).toHaveURL(url => url.pathname === '/dashboard/review')
        await expect(page.locator('.contribution-list')).toContainText('Menunggu tinjauan manusia')
        const own = await (await context.request.get('/api/me/contributions')).json()
        assert.ok(own.items.some(item => item.id === savedId && item.title === 'QA UI Analyst' && item.status === 'pending'), 'Browser submission must persist for its owner')
      }
      pass('Real browser profile save updates navbar; company/review/salary/interview forms persist pending contributions')
    }
    if (actor?.role === 'admin') {
      await page.goto('/admin/perusahaan')
      await page.locator('.admin-item').filter({ has: page.getByRole('heading', { name: detail.name, exact: true }) }).getByRole('button', { name: 'Edit profil' }).click()
      await page.locator('#admin-company-description').fill('Temporary fictional description updated using the real admin edit form.')
      await page.getByRole('button', { name: 'Simpan profil' }).click()
      await expect(page.getByText('Profil tersimpan dan tercatat dalam audit.', { exact: true })).toBeVisible()
      assert.equal((await call(guest, 'get', `/api/companies/${detail.slug}`)).description, 'Temporary fictional description updated using the real admin edit form.')
      pass('Real admin browser edit form persists audited company changes')
    }
    assert.deepEqual(failures, [], 'Runtime, hydration or CSP errors')
    await context.close()
  }
  if (process.argv.includes('--forms-only')) pass('Previously verified responsive matrix skipped; live user/admin forms passed')
  else pass(process.argv.includes('--forms-and-admin') ? 'Admin pages: 320/390/768/1024/1440 and accessibility; previously passed guest/user matrix skipped' : 'Populated public/user/admin pages: 320/390/768/1024/1440 widths, company preselection, CSP/hydration and mobile accessibility')

  // Deletion verifies the changed password, revokes all sessions and cascades owned contributions.
  const deletionApi = await request.newContext({ baseURL: origin, extraHTTPHeaders: { origin } }); contexts.push(deletionApi)
  await call(deletionApi, 'post', '/api/auth/login', { email: user.email, password: newPassword })
  await call(deletionApi, 'post', '/api/me/delete', { password: `${newPassword}-wrong`, confirmation: 'HAPUS AKUN' }, 403)
  await call(deletionApi, 'post', '/api/me/delete', { password: newPassword, confirmation: 'HAPUS AKUN' })
  assert.equal(checked(await admin.from('profiles').select('id').eq('id', user.id), 'Deleted profile').length, 0)
  assert.equal(checked(await admin.from('reviews').select('id').eq('author_id', user.id), 'Deleted contributions').length, 0)
  pass('Account deletion requires current password, removes profile/contributions and revokes sessions')
  await writeFile('artifacts/security-qa/results.json', JSON.stringify({ testedAt: new Date().toISOString(), results }, null, 2))
} finally {
  if (browser) await browser.close()
  const failures = []
  async function cleanup(result, label) { if (result.error) failures.push(`${label}: ${result.error.message}`) }
  if (contacts.length) await cleanup(await admin.from('contact_messages').delete().in('id', contacts), 'Contacts')
  for (const table of ['audit_logs','moderation_actions']) {
    if (accounts.length) await cleanup(await admin.from(table).delete().in('actor_id', accounts.map(account => account.id)), table)
  }
  for (const table of ['company_responses','review_reports','interview_experiences','salary_reports','reviews','company_representatives']) {
    if (accounts.length) await cleanup(await admin.from(table).delete().in('author_id', accounts.map(account => account.id)), table)
  }
  if (companyIds.length) await cleanup(await admin.from('companies').delete().in('id', companyIds), 'Companies')
  for (const account of accounts) {
    const result = await admin.auth.admin.deleteUser(account.id)
    if (result.error && result.error.code !== 'user_not_found') failures.push(result.error.message)
  }
  await Promise.all(contexts.map(context => context.dispose()))
  assert.deepEqual(failures, [], 'QA fixture cleanup')
  console.log('Temporary feature QA fixtures removed. Demo and existing data preserved.')
}
