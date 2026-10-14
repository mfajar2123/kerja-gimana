import { getQuery, getRequestURL, sendRedirect } from 'h3'
import { configured, database } from '../../utils/supabase'
import { accountDestination } from '#shared/utils/auth'

export default defineEventHandler(async event => {
  if (!configured(event)) return sendRedirect(event, '/masuk?error=auth-unavailable')
  const query = getQuery(event)
  const params = getRequestURL(event).searchParams
  const code = typeof query.code === 'string' ? query.code : params.get('code')
  const tokenHash = typeof query.token_hash === 'string' ? query.token_hash : params.get('token_hash')
  const type = typeof query.type === 'string' ? query.type : params.get('type')
  const db = database(event)
  let success = false

  if (code) {
    const { error } = await db.auth.exchangeCodeForSession(code)
    success = !error
  } else if (tokenHash && type && ['signup', 'recovery', 'email', 'magiclink'].includes(type)) {
    const { error } = await db.auth.verifyOtp({ token_hash: tokenHash, type: type as 'signup' | 'recovery' | 'email' | 'magiclink' })
    success = !error
  }

  if (!success) return sendRedirect(event, '/masuk?status=verification-failed')
  if (type === 'recovery') return sendRedirect(event, '/lupa-password?mode=reset')
  const { data: identity } = await db.auth.getUser()
  const { data: profile } = identity.user
    ? await db.from('profiles').select('role').eq('id', identity.user.id).maybeSingle()
    : { data: null }
  return sendRedirect(event, accountDestination(query.next, profile?.role === 'admin' ? 'admin' : 'user'))
})
