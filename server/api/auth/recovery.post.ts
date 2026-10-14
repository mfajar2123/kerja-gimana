import { z } from 'zod'
import { consumeLimit } from '../../services/rate-limit'
import { configured, database } from '../../utils/supabase'
import { validatedBody } from '../../utils/validation'

const schema = z.object({ email: z.email().max(254) }).strict()
export default defineEventHandler(async event => {
  if (!configured(event)) throw createError({ statusCode: 503, statusMessage: 'Pemulihan akun belum tersedia.' })
  await consumeLimit(event, 'recovery', 3)
  const body = await validatedBody(event, schema)
  const config = useRuntimeConfig(event)
  const { error } = await database(event).auth.resetPasswordForEmail(body.email, {
    redirectTo: `${config.siteUrl}/api/auth/callback?next=%2Flupa-password%3Fmode%3Dreset`,
  })
  if (error) throw createError({ statusCode: 503, statusMessage: 'Permintaan belum dapat dikirim. Coba lagi nanti.' })
  return { accepted: true }
})
