import { z } from 'zod'
import { consumeLimit } from '../../services/rate-limit'
import { requireUser } from '../../utils/supabase'
import { validatedBody } from '../../utils/validation'

const schema = z.object({ password: z.string().min(15).max(128) }).strict()
export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  await consumeLimit(event, 'password-update', 3, user.id)
  const { password } = await validatedBody(event, schema)
  const { error } = await db.auth.updateUser({ password })
  if (error) throw createError({ statusCode: 400, statusMessage: 'Kata sandi belum berhasil diperbarui.' })
  return { success: true }
})
