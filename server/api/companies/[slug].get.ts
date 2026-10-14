import { getRouterParam } from 'h3'
import type { Company } from '#shared/types'
import { database } from '../../utils/supabase'
import { databaseResult } from '../../utils/validation'

export default defineEventHandler(async (event): Promise<Company> => {
  const slug = getRouterParam(event, 'slug')
  if (!slug || slug.length > 150) throw createError({ statusCode: 404, statusMessage: 'Perusahaan tidak ditemukan.' })
  const { data, error } = await database(event).rpc('company_detail', { p_slug: slug })
  return databaseResult(data, error) as unknown as Company
})
