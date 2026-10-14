import { getRouterParam } from 'h3'
import { database } from '../../../utils/supabase'
import { databaseResult } from '../../../utils/validation'

export default defineEventHandler(async event => {
  const slug = getRouterParam(event, 'slug')
  if (!slug || slug.length > 150) throw createError({ statusCode: 404, statusMessage: 'Perusahaan tidak ditemukan.' })
  const db = database(event)
  const { data: companyData, error: companyError } = await db.rpc('company_detail', { p_slug: slug })
  const company = databaseResult(companyData, companyError) as { id: string }
  const { data, error } = await db.rpc('company_salary_insights', { p_company: company.id })
  return databaseResult(data, error)
})
