import { createClient } from '@supabase/supabase-js'

const names = ['SUPABASE_TEST_URL', 'SUPABASE_TEST_PUBLISHABLE_KEY', 'SUPABASE_TEST_USER_A_JWT', 'SUPABASE_TEST_USER_B_JWT']
const missing = names.filter(name => !process.env[name])
if (missing.length) {
  console.error(`RLS checks need a disposable Supabase project and these environment variables: ${missing.join(', ')}`)
  process.exit(2)
}

const { SUPABASE_TEST_URL: url, SUPABASE_TEST_PUBLISHABLE_KEY: key, SUPABASE_TEST_USER_A_JWT: tokenA, SUPABASE_TEST_USER_B_JWT: tokenB } = process.env
const clientFor = token => createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { headers: { Authorization: `Bearer ${token}` } } })
const a = clientFor(tokenA)
const b = clientFor(tokenB)
const [{ data: userA, error: errorA }, { data: userB, error: errorB }] = await Promise.all([a.auth.getUser(tokenA), b.auth.getUser(tokenB)])
if (errorA || errorB || !userA.user || !userB.user || userA.user.id === userB.user.id) throw new Error('Provide two different valid test-user access tokens.')

const [profileResult, reviewResult, moderationResult] = await Promise.all([
  a.from('profiles').select('id').eq('id', userB.user.id),
  a.from('reviews').select('author_id').eq('author_id', userB.user.id),
  a.rpc('moderation_queue', { p_kind: 'all', p_page: 1 }),
])
if (profileResult.error) throw new Error(`The profile RLS check failed to run: ${profileResult.error.message}`)
if ((profileResult.data || []).length) throw new Error('RLS exposed another account profile.')
if (reviewResult.error) throw new Error(`The submission RLS check failed to run: ${reviewResult.error.message}`)
if ((reviewResult.data || []).length) throw new Error('RLS exposed another account submission.')
if (!moderationResult.error) throw new Error('An ordinary user unexpectedly accessed the admin moderation queue.')

console.log('RLS checks passed: another user’s profile/submissions were hidden and admin moderation was denied.')
