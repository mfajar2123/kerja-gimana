import { getQuery } from 'h3'
import { z } from 'zod'
import { database } from '../utils/supabase'
import { databaseResult } from '../utils/validation'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const ids = z.array(z.uuid()).min(2).max(3).safeParse(
    typeof query.ids === 'string' ? query.ids.split(',') : [],
  )
  if (!ids.success || new Set(ids.data).size !== ids.data.length) throw createError({ statusCode: 422, statusMessage: 'Pilih dua atau tiga perusahaan yang berbeda.' })
  const { data, error } = await database(event).rpc('compare_companies', { p_ids: ids.data })
  return databaseResult(data, error)
})
