import { authSchema } from '#shared/schemas'
import { consumeLimit } from '../../services/rate-limit'
import { configured, database } from '../../utils/supabase'
import { validatedBody } from '../../utils/validation'
import { currentAccount } from '../../utils/account'

export default defineEventHandler(async event => {
  if (!configured(event)) throw createError({ statusCode: 503, statusMessage: 'Layanan akun belum dikonfigurasi.' })
  if (await currentAccount(event)) throw createError({ statusCode: 409, statusMessage: 'Keluar dari akun saat ini sebelum membuat akun lain.' })
  await consumeLimit(event, 'register', 5)
  const body = await validatedBody(event, authSchema)
  const config = useRuntimeConfig(event)
  const { error } = await database(event).auth.signUp({
    email: body.email,
    password: body.password,
    options: { emailRedirectTo: `${config.siteUrl}/api/auth/callback` },
  })
  if (error) throw createError({ statusCode: 400, statusMessage: 'Pendaftaran belum berhasil. Periksa email dan kata sandi lalu coba lagi.' })
  return { accepted: true }
})
