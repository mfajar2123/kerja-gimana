import { getQuery } from 'h3'
import { directorySchema } from '#shared/schemas'
import type { DirectoryResult } from '#shared/types'
import { configured, database } from '../../utils/supabase'
import { databaseResult } from '../../utils/validation'

export default defineEventHandler(async (event): Promise<DirectoryResult> => {
  if (!configured(event)) return { companies: [], total: 0, configured: false }
  const parsed = directorySchema.safeParse(getQuery(event))
  if (!parsed.success) throw createError({ statusCode: 422, statusMessage: 'Filter perusahaan tidak valid.' })
  const db = database(event)
  const { data, error } = await db.rpc('company_search', {
    p_query: parsed.data.q,
    p_industry: parsed.data.industry,
    p_location: parsed.data.location,
    p_page: parsed.data.page,
  })
  const result = databaseResult(data, error) as unknown as Omit<DirectoryResult, 'configured'>
  return { ...result, configured: true }
})
