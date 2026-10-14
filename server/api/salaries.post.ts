import { salarySchema } from '#shared/schemas'
import { consumeLimit } from '../services/rate-limit'
import { requireUser } from '../utils/supabase'
import { databaseResult, validatedBody } from '../utils/validation'

export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  await consumeLimit(event, 'salary', 5, user.id)
  const body = await validatedBody(event, salarySchema)
  const { data, error } = await db.rpc('submit_salary', { p_data: body })
  return { id: databaseResult(data, error), status: 'pending' as const }
})
