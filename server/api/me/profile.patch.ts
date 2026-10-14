import { z } from 'zod'
import { requireUser } from '../../utils/supabase'
import { databaseResult, validatedBody } from '../../utils/validation'
const schema = z.object({ display_name: z.string().trim().min(1).max(60) }).strict()
export default defineEventHandler(async event => {
  const { db } = await requireUser(event)
  const body = await validatedBody(event, schema)
  const { data, error } = await db.rpc('update_own_profile', { p_name: body.display_name })
  return databaseResult(data, error)
})
