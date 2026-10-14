import { createClient } from '@supabase/supabase-js'
import { deleteCookie, parseCookies } from 'h3'
import { z } from 'zod'
import { consumeLimit } from '../../services/rate-limit'
import { requireUser, serviceDatabase } from '../../utils/supabase'
import { validatedBody } from '../../utils/validation'

const schema = z.object({ password: z.string().min(1).max(128), confirmation: z.literal('HAPUS AKUN') }).strict()
export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  await consumeLimit(event, 'account-deletion', 2, user.id)
  const body = await validatedBody(event, schema)
  const config = useRuntimeConfig(event)
  const verifier = createClient(config.supabaseUrl, config.supabasePublishableKey, { auth: { persistSession: false, autoRefreshToken: false } })
  const { data: verified, error: verificationError } = await verifier.auth.signInWithPassword({ email: user.email ?? '', password: body.password })
  if (verificationError || verified.user?.id !== user.id)
    throw createError({ statusCode: 403, statusMessage: 'Kata sandi belum cocok. Akun belum dihapus.' })
  // Revoke sessions before deletion; JWT authorization also checks auth.sessions.
  const { error: signOutError } = await db.auth.signOut({ scope: 'global' })
  await verifier.auth.signOut({ scope: 'global' })
  if (signOutError) throw createError({ statusCode: 503, statusMessage: 'Sesi belum berhasil dicabut. Akun belum dihapus.' })
  const { error } = await serviceDatabase(event).auth.admin.deleteUser(user.id)
  if (error) throw createError({ statusCode: 503, statusMessage: 'Akun belum berhasil dihapus. Coba lagi nanti.' })
  const cookiePrefix = `sb-${new URL(config.supabaseUrl).hostname.split('.')[0]}-auth-token`
  for (const name of Object.keys(parseCookies(event))) {
    if (name.startsWith(cookiePrefix))
      deleteCookie(event, name, { path: '/', sameSite: 'lax', secure: config.siteUrl.startsWith('https://'), httpOnly: true })
  }
  await verifier.auth.signOut()
  return { success: true, message: 'Akun dan kontribusimu sudah dihapus.' }
})
