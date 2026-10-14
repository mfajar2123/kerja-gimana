import { companySchema } from '#shared/schemas'
import { detectPersonalInformation } from '#shared/constants/privacy'
import { getRouterParam } from 'h3'
import { z } from 'zod'
import { consumeLimit } from '../../../services/rate-limit'
import { requireAdmin } from '../../../utils/supabase'
import { databaseResult, validatedBody } from '../../../utils/validation'
const schema = companySchema.extend({ slug: z.string().trim().min(2).max(150).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), verified: z.boolean(), featured: z.boolean() }).strict()
export default defineEventHandler(async event => {
  const { db, user } = await requireAdmin(event)
  await consumeLimit(event, 'admin-company', 60, user.id)
  const id = z.uuid().safeParse(getRouterParam(event, 'id'))
  if (!id.success) throw createError({ statusCode: 422, statusMessage: 'ID perusahaan tidak valid.' })
  const body = await validatedBody(event, schema)
  if (detectPersonalInformation(body.description)) throw createError({ statusCode: 422, statusMessage: 'Hapus data pribadi dari keterangan perusahaan.' })
  const { data, error } = await db.rpc('admin_update_company', { p_id: id.data, p_data: body })
  return databaseResult(data, error)
})
