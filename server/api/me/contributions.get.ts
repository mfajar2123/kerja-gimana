import { requireUser } from '../../utils/supabase'
import { databaseResult } from '../../utils/validation'
export default defineEventHandler(async event => {
  const { db } = await requireUser(event)
  const { data, error } = await db.rpc('my_contributions')
  return databaseResult(data, error)
})
