import { configured, database } from '../utils/supabase'
import { databaseResult } from '../utils/validation'

export default defineEventHandler(async event => {
  if (!configured(event)) return []
  const { data, error } = await database(event).from('industries').select('id,name,slug').eq('is_active', true).order('name')
  return databaseResult(data, error)
})
