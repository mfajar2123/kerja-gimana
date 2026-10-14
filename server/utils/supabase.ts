import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'
import { parseCookies, setCookie, setHeader, createError, type H3Event } from 'h3'

export function configured(event: H3Event) {
  const config = useRuntimeConfig(event)
  return Boolean(config.supabaseUrl && config.supabasePublishableKey)
}
export function database(event: H3Event) {
  const config = useRuntimeConfig(event)
  if (!configured(event)) throw createError({ statusCode: 503, statusMessage: 'Layanan belum terhubung. Coba lagi nanti.' })
  return createServerClient(config.supabaseUrl, config.supabasePublishableKey, {
    cookieOptions: { httpOnly: true, secure: config.siteUrl.startsWith('https://'), sameSite: 'lax', path: '/' },
    cookies: {
      getAll: () => Object.entries(parseCookies(event)).map(([name, value]) => ({ name, value })),
      setAll: cookies => {
        setHeader(event, 'Cache-Control', 'private, no-store')
        cookies.forEach(({ name, value, options }) => setCookie(event, name, value, options))
      },
    },
  })
}
export async function requireUser(event: H3Event) {
  if (!configured(event)) throw createError({ statusCode: 401, statusMessage: 'Masuk dulu untuk melanjutkan.' })
  const db = database(event)
  const { data, error } = await db.auth.getUser()
  if (error || !data.user) throw createError({ statusCode: 401, statusMessage: 'Masuk dulu untuk melanjutkan.' })
  if (!data.user.email_confirmed_at) throw createError({ statusCode: 403, statusMessage: 'Verifikasi email kamu dulu.' })
  const { data: profile, error: profileError } = await db.from('profiles').select('id,status').eq('id', data.user.id).maybeSingle()
  if (profileError) throw createError({ statusCode: 503, statusMessage: 'Sesi belum bisa diperiksa.' })
  if (!profile || profile.status !== 'active') throw createError({ statusCode: 403, statusMessage: 'Sesi atau akun ini tidak dapat digunakan.' })
  return { db, user: data.user }
}
export async function requireAdmin(event: H3Event) {
  const context = await requireUser(event)
  const { data, error } = await context.db.from('profiles').select('role,status').eq('id', context.user.id).single()
  if (error || data?.role !== 'admin' || data?.status !== 'active') throw createError({ statusCode: 403, statusMessage: 'Akses tidak diizinkan.' })
  return context
}
export function serviceDatabase(event: H3Event) {
  const config = useRuntimeConfig(event)
  if (!config.supabaseServiceRoleKey) throw createError({ statusCode: 503, statusMessage: 'Layanan akun belum siap.' })
  return createClient(config.supabaseUrl, config.supabaseServiceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
}
