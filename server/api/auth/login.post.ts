import { loginSchema } from '#shared/schemas'
import { consumeLimit } from '../../services/rate-limit'
import { configured, database } from '../../utils/supabase'
import { validatedBody } from '../../utils/validation'
import { currentAccount } from '../../utils/account'

export default defineEventHandler(async event => {
  if (!configured(event)) throw createError({ statusCode: 503, statusMessage: 'Layanan akun belum dikonfigurasi.' })
  if (await currentAccount(event)) throw createError({ statusCode: 409, statusMessage: 'Keluar dari akun saat ini sebelum masuk dengan akun lain.' })
  await consumeLimit(event, 'login', 5)
  const body = await validatedBody(event, loginSchema)
  const db = database(event)
  const { data, error } = await db.auth.signInWithPassword(body)
  if (error || !data.user) throw createError({ statusCode: 401, statusMessage: 'Email atau kata sandi belum cocok. Periksa kembali, lalu coba lagi.' })
  if (!data.user.email_confirmed_at) throw createError({ statusCode: 403, statusMessage: 'Verifikasi emailmu terlebih dahulu melalui tautan yang dikirim.' })
  const { data: profile, error: profileError } = await db.from('profiles').select('display_name,status,role').eq('id', data.user.id).maybeSingle()
  if (profileError || profile?.status !== 'active') {
    await db.auth.signOut()
    throw createError({ statusCode: 403, statusMessage: 'Akun ini tidak dapat masuk saat ini.' })
  }
  return { user: { id: data.user.id, email: data.user.email, display_name: profile.display_name, role: profile.role } }
})
