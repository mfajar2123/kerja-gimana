import { getRouterParam } from 'h3'
import { z } from 'zod'
import { consumeLimit } from '../../../services/rate-limit'
import { requireAdmin } from '../../../utils/supabase'
import { databaseResult, validatedBody } from '../../../utils/validation'
const schema = z.object({ status: z.enum(['active','suspended']) }).strict()
export default defineEventHandler(async event => {
  const { db, user } = await requireAdmin(event)
  await consumeLimit(event, 'admin-user', 60, user.id)
  const id = z.uuid().safeParse(getRouterParam(event, 'id'))
  if (!id.success) throw createError({ statusCode: 422, statusMessage: 'ID pengguna tidak valid.' })
  const { status } = await validatedBody(event, schema)
  const { data, error } = await db.rpc('admin_update_user', { p_id: id.data, p_status: status })
  return databaseResult(data, error)
})
