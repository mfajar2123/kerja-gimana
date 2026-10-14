import { reportSchema } from '#shared/schemas'
import { detectPersonalInformation } from '#shared/constants/privacy'
import { consumeLimit } from '../services/rate-limit'
import { requireUser } from '../utils/supabase'
import { databaseResult, validatedBody } from '../utils/validation'

export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  await consumeLimit(event, 'report', 3, user.id)
  const body = await validatedBody(event, reportSchema)
  if (detectPersonalInformation(body.details)) throw createError({ statusCode: 422, statusMessage: 'Hapus data pribadi dari laporan sebelum mengirim.' })
  const { data, error } = await db.rpc('submit_report', { p_review: body.review_id, p_reason: body.reason, p_details: body.details })
  return { id: databaseResult(data, error), status: 'pending' as const }
})
