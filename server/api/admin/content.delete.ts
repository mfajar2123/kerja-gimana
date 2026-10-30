import { z } from 'zod'
import { requireAdmin } from '../../utils/supabase'
import { consumeLimit } from '../../services/rate-limit'
import { databaseResult, validatedBody } from '../../utils/validation'

const schema = z.object({ kind: z.enum(['company', 'review', 'salary', 'interview', 'response']), id: z.uuid(), note: z.string().trim().min(10).max(2000) }).strict()
export default defineEventHandler(async event => {
  const { db, user } = await requireAdmin(event)
  await consumeLimit(event, 'admin-delete', 30, user.id)
  const body = await validatedBody(event, schema)
  const { data, error } = await db.rpc('admin_delete_content', { p_kind: body.kind, p_id: body.id, p_note: body.note })
  return databaseResult(data, error)
})
