import { interviewSchema } from '#shared/schemas'
import { detectPersonalInformation } from '#shared/constants/privacy'
import { consumeLimit } from '../services/rate-limit'
import { requireUser } from '../utils/supabase'
import { databaseResult, validatedBody } from '../utils/validation'

export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  await consumeLimit(event, 'interview', 5, user.id)
  const body = await validatedBody(event, interviewSchema)
  if ([body.position, body.stages, body.questions].some(detectPersonalInformation)) {
    throw createError({ statusCode: 422, statusMessage: 'Hapus email, nomor telepon, atau nomor identitas pribadi sebelum mengirim cerita.' })
  }
  const { data, error } = await db.rpc('submit_interview', { p_data: body })
  return { id: databaseResult(data, error), status: 'pending' as const }
})
