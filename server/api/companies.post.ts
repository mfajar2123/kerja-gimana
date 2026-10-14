import { companySchema } from '#shared/schemas'
import { detectPersonalInformation } from '#shared/constants/privacy'
import { consumeLimit } from '../services/rate-limit'
import { requireUser } from '../utils/supabase'
import { databaseResult, validatedBody } from '../utils/validation'

export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  await consumeLimit(event, 'company-suggestion', 3, user.id)
  const body = await validatedBody(event, companySchema)
  if (detectPersonalInformation(body.description)) throw createError({ statusCode: 422, statusMessage: 'Hapus data pribadi dari keterangan perusahaan.' })
  let result = await db.from('industries').select('slug').eq('slug', body.industry).eq('is_active', true).maybeSingle()
  if (!result.error && !result.data) result = await db.from('industries').select('slug').eq('name', body.industry).eq('is_active', true).maybeSingle()
  if (result.error) throw createError({ statusCode: 503, statusMessage: 'Industri belum bisa diperiksa.' })
  if (!result.data) throw createError({ statusCode: 422, statusMessage: 'Pilih industri yang tersedia.' })
  const industry = result.data
  const { data, error } = await db.rpc('submit_company_suggestion', {
    p_data: { ...body, industry: industry.slug },
  })
  return { id: databaseResult(data, error), status: 'pending' as const }
})
