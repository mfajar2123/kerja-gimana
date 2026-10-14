import { moderationSchema } from '#shared/schemas'
import { consumeLimit } from '../../services/rate-limit'
import { requireAdmin } from '../../utils/supabase'
import { databaseResult, validatedBody } from '../../utils/validation'
export default defineEventHandler(async event => {
  const { db, user } = await requireAdmin(event)
  await consumeLimit(event, 'moderation', 120, user.id)
  const body = await validatedBody(event, moderationSchema)
  const { data, error } = await db.rpc('moderate_content', {
    p_kind: body.kind, p_id: body.id, p_status: body.status, p_reason: body.reason, p_note: body.note,
  })
  return databaseResult(data, error)
})
