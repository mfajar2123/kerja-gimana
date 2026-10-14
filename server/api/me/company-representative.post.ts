import { z } from 'zod'
import { detectPersonalInformation } from '#shared/constants/privacy'
import { consumeLimit } from '../../services/rate-limit'
import { requireUser } from '../../utils/supabase'
import { databaseResult, validatedBody } from '../../utils/validation'
const schema = z.object({ company_id: z.uuid(), evidence: z.string().trim().min(30).max(2000) }).strict()
export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  await consumeLimit(event, 'representative', 3, user.id)
  const body = await validatedBody(event, schema)
  if (detectPersonalInformation(body.evidence)) throw createError({ statusCode: 422, statusMessage: 'Jangan sertakan nomor telepon atau nomor identitas pribadi.' })
  const { data, error } = await db.rpc('request_company_representative', { p_company: body.company_id, p_evidence: body.evidence })
  return { id: databaseResult(data, error), status: 'pending' as const }
})
