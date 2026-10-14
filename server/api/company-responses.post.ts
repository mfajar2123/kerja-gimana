import { responseSchema } from '#shared/schemas'
import { detectPersonalInformation } from '#shared/constants/privacy'
import { consumeLimit } from '../services/rate-limit'
import { requireUser } from '../utils/supabase'
import { databaseResult, validatedBody } from '../utils/validation'

export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  await consumeLimit(event, 'company-response', 5, user.id)
  const body = await validatedBody(event, responseSchema)
  if (detectPersonalInformation(body.content) || detectPersonalInformation(body.evidence))
    throw createError({ statusCode: 422, statusMessage: 'Hapus email, nomor telepon, dan nomor identitas pribadi dari tanggapan.' })
  const { data, error } = await db.rpc('submit_company_response', {
    p_company: body.company_id, p_review: body.review_id, p_content: body.content, p_evidence: body.evidence,
  })
  return { id: databaseResult(data, error), status: 'pending' as const }
})
