import assert from 'node:assert/strict'
import { randomBytes, randomUUID } from 'node:crypto'
import { loadEnvFile } from 'node:process'
import { createClient } from '@supabase/supabase-js'
import { request } from '@playwright/test'

try { loadEnvFile('.env') } catch (error) { if (error.code !== 'ENOENT') throw error }
const required = ['NUXT_SUPABASE_URL', 'NUXT_SUPABASE_PUBLISHABLE_KEY', 'NUXT_SUPABASE_SERVICE_ROLE_KEY', 'NUXT_RATE_LIMIT_SECRET']
assert.equal(required.filter(name => !process.env[name]).join(', '), '', 'Configure all backend credentials in .env first.')
const origin = process.env.NUXT_SITE_URL || 'http://localhost:3000'
assert.ok(['localhost', '127.0.0.1'].includes(new URL(origin).hostname), 'Run this smoke test against the local app only.')
const url = process.env.NUXT_SUPABASE_URL
const key = process.env.NUXT_SUPABASE_PUBLISHABLE_KEY
const options = { auth: { persistSession: false, autoRefreshToken: false } }
const admin = createClient(url, process.env.NUXT_SUPABASE_SERVICE_ROLE_KEY, options)
const anonymous = createClient(url, key, options)
const users = []
const contexts = []
const clients = []
let companyId
let contactId
const checked = (result, label) => {
  assert.equal(result.error, null, `${label}: ${result.error?.message || 'unexpected error'}`)
  return result.data
}
const api = async () => {
  const context = await request.newContext({ baseURL: origin, extraHTTPHeaders: { origin } })
  contexts.push(context)
  return context
}
const expectStatus = async (response, status, label) => {
  let detail = ''
  if (response.status() !== status && response.status() >= 400) {
    const body = await response.json().catch(() => ({}))
    detail = body.statusMessage || body.message || ''
  }
  assert.equal(response.status(), status, `${label}: HTTP ${response.status()} ${detail}`)
  return response
}

try {
  const guest = await api()
  const statistics = await expectStatus(await guest.get('/api/statistics'), 200, 'Database statistics')
  assert.equal((await statistics.json()).configured, true)
  const industries = await expectStatus(await guest.get('/api/industries'), 200, 'Industry taxonomy')
  assert.equal((await industries.json()).length, 13)
  await expectStatus(await guest.get('/api/me'), 401, 'Guest profile access')
  assert.ok((await anonymous.from('profiles').select('id')).error, 'Anonymous profiles must be inaccessible.')
  assert.ok((await anonymous.rpc('consume_rate_limit', { p_key: '0'.repeat(64), p_limit: 5 })).error, 'Rate-limit RPC must be server-only.')
  console.log('PASS: database API, taxonomy, anonymous access, server-only rate limits')

  const password = `Kg!${randomBytes(24).toString('base64url')}`
  for (let index = 0; index < 2; index++) {
    const email = `kg-smoke-${randomUUID()}@example.com`
    const data = checked(await admin.auth.admin.createUser({ email, password, email_confirm: index === 1 }), 'Create temporary account')
    users.push(data.user.id)
    const context = await api()
    const client = createClient(url, key, options)
    clients.push(client)
    if (index === 0) {
      await expectStatus(await context.post('/api/auth/login', { data: { email, password } }), 401, 'Unverified login denied')
      const link = checked(await admin.auth.admin.generateLink({ type: 'signup', email, password }), 'Generate verification without sending email')
      const callback = await context.get(`/api/auth/callback?token_hash=${encodeURIComponent(link.properties.hashed_token)}&type=signup`, { maxRedirects: 0 })
      await expectStatus(callback, 302, 'Email verification callback')
      assert.equal(callback.headers().location, '/dashboard')
      await expectStatus(await context.get('/api/me'), 200, 'Verified cookie session')
      await expectStatus(await context.post('/api/auth/logout', { data: {} }), 200, 'Logout')
      await expectStatus(await context.get('/api/me'), 401, 'Logged-out access denied')
      await expectStatus(await context.post('/api/auth/login', { data: { email, password: `${password}-wrong` } }), 401, 'Wrong password denied')
    }
    await expectStatus(await context.post('/api/auth/login', { data: { email, password } }), 200, 'Password login')
    const me = await expectStatus(await context.get('/api/me'), 200, 'Authenticated profile')
    assert.equal((await me.json()).id, data.user.id)
    await expectStatus(await context.get('/api/admin'), 403, 'Ordinary user admin access')
    checked(await client.auth.signInWithPassword({ email, password }), 'Direct SDK login')
  }
  const [a, b] = clients
  const [aApi, bApi] = contexts.slice(1)
  assert.equal(checked(await a.from('profiles').select('id').eq('id', users[0]), 'Own profile').length, 1)
  assert.deepEqual(checked(await a.from('profiles').select('id').eq('id', users[1]), 'Other profile'), [])
  assert.ok((await a.from('profiles').update({ role: 'admin' }).eq('id', users[0])).error, 'Self-promotion must fail.')
  assert.ok((await a.rpc('moderation_queue', { p_kind: 'all', p_page: 1 })).error, 'Ordinary users cannot moderate.')
  checked(await admin.from('profiles').update({ status: 'suspended' }).eq('id', users[1]), 'Suspend temporary account')
  assert.ok((await b.from('profiles').update({ status: 'active' }).eq('id', users[1])).error, 'Suspended users cannot reactivate themselves.')
  assert.ok((await b.rpc('update_own_profile', { p_name: 'Must be denied' })).error, 'Suspended users cannot update their profiles through RPC.')
  await expectStatus(await bApi.get('/api/me'), 403, 'Suspended account API access')
  checked(await admin.from('profiles').update({ status: 'active' }).eq('id', users[1]), 'Restore temporary account')
  console.log('PASS: verification callback, password login, SSR cookies, logout, profile isolation, admin denial')

  const updated = await expectStatus(await aApi.patch('/api/me/profile', { data: { display_name: 'Backend smoke test' } }), 200, 'Profile update')
  assert.equal((await updated.json()).display_name, 'Backend smoke test')
  const suggestion = await expectStatus(await aApi.post('/api/companies', { data: {
    name: `Temporary backend check ${randomUUID()}`, industry: 'Teknologi', location: 'Jakarta', website: '',
    description: 'Temporary automated backend verification; never approve or publish this submission.',
  } }), 200, 'Company suggestion')
  companyId = (await suggestion.json()).id
  assert.ok(companyId)
  assert.equal(checked(await admin.from('companies').select('status').eq('id', companyId).single(), 'Stored suggestion').status, 'pending')
  assert.deepEqual(checked(await b.from('companies').select('id').eq('id', companyId), 'Other user suggestion isolation'), [])
  const ownRequests = checked(await a.rpc('my_company_requests'), 'Owner requests')
  assert.ok(ownRequests.suggestions.some(item => item.id === companyId))
  const otherRequests = await expectStatus(await bApi.get('/api/me/requests'), 200, 'Other user requests')
  assert.ok(!(await otherRequests.json()).suggestions.some(item => item.id === companyId))
  assert.ok((await a.rpc('submit_contact', { p_data: { email: 'backend-check@example.com', subject: 'Temporary backend check', message: 'Temporary database write and privacy verification; safe to delete.' } })).error, 'Direct contact RPC must be server-only.')
  const contact = await expectStatus(await aApi.post('/api/contact', { data: { email: 'backend-check@example.com', subject: 'Temporary backend check', message: 'Temporary database write and privacy verification; safe to delete.' } }), 200, 'Rate-limited contact insert')
  contactId = (await contact.json()).id
  assert.equal(checked(await a.from('contact_messages').select('id').eq('id', contactId), 'Own contact').length, 1)
  assert.deepEqual(checked(await b.from('contact_messages').select('id').eq('id', contactId), 'Other contact'), [])
  console.log('PASS: database writes, pending moderation, private submission ownership')
} finally {
  const cleanupFailures = []
  for (const client of clients) {
    try { checked(await client.auth.signOut({ scope: 'global' }), 'Revoke temporary sessions') } catch (error) { cleanupFailures.push(error.message) }
  }
  for (const [table, id] of [['contact_messages', contactId], ['companies', companyId]]) {
    if (!id) continue
    try { checked(await admin.from(table).delete().eq('id', id), `Remove temporary ${table}`) } catch (error) { cleanupFailures.push(error.message) }
  }
  for (const id of users) {
    try { checked(await admin.auth.admin.deleteUser(id), 'Remove temporary account') } catch (error) { cleanupFailures.push(error.message) }
  }
  await Promise.all(contexts.map(context => context.dispose()))
  assert.deepEqual(cleanupFailures, [], 'Some temporary resources could not be removed; inspect Supabase before rerunning.')
  console.log('Cleanup complete: temporary accounts and submissions removed.')
}
