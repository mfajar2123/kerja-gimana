import { createError, parseCookies, type H3Event } from 'h3'
import type { AccountViewer } from '#shared/utils/auth'
import { configured, database } from './supabase'

export async function currentAccount(event: H3Event): Promise<AccountViewer | null> {
  if (!configured(event)) return null
  const prefix = `sb-${new URL(useRuntimeConfig(event).supabaseUrl).hostname.split('.')[0]}-auth-token`
  if (!Object.keys(parseCookies(event)).some(name => name.startsWith(prefix))) return null
  const db = database(event)
  const { data, error } = await db.auth.getUser()
  if (error && (!error.status || error.status >= 500)) throw createError({ statusCode: 503, statusMessage: 'Sesi belum bisa diperiksa. Coba lagi.' })
  if (error || !data.user?.email_confirmed_at) return null
  const { data: profile, error: profileError } = await db.from('profiles').select('display_name,role,status').eq('id', data.user.id).maybeSingle()
  if (profileError) throw createError({ statusCode: 503, statusMessage: 'Profil belum bisa diperiksa. Coba lagi.' })
  if (!profile || profile.status !== 'active' || !['user', 'admin'].includes(profile.role)) return null
  return { id: data.user.id, email: data.user.email ?? '', display_name: profile.display_name, role: profile.role }
}
