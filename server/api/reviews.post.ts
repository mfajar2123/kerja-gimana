import { reviewSchema } from '#shared/schemas'
import { detectPersonalInformation } from '#shared/constants/privacy'
import { consumeLimit } from '../services/rate-limit'
import { requireUser } from '../utils/supabase'
import { databaseResult, validatedBody } from '../utils/validation'

export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  await consumeLimit(event, 'review', 5, user.id)
  const body = await validatedBody(event, reviewSchema)
  if ([body.job_title, body.positives, body.improvements, body.advice].some(detectPersonalInformation)) {
    throw createError({ statusCode: 422, statusMessage: 'Hapus email, nomor telepon, atau nomor identitas pribadi dari cerita sebelum dikirim.' })
  }
  const { data, error } = await db.rpc('submit_review', {
    p_company: body.company_id, p_job: body.job_title, p_employment: body.employment_status,
    p_start: body.employment_start, p_end: body.employment_end, p_positives: body.positives,
    p_improvements: body.improvements, p_advice: body.advice, p_ratings: body.ratings,
  })
  return { id: databaseResult(data, error), status: 'pending' as const }
})
