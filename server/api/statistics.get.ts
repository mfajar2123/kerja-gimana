import type { CompanyStatistics } from '#shared/types'
import { configured, database } from '../utils/supabase'
import { databaseResult } from '../utils/validation'

export default defineEventHandler(async (event): Promise<CompanyStatistics> => {
  if (!configured(event)) return { companies: 0, reviews: 0, salary_reports: 0, configured: false }
  const { data, error } = await database(event).rpc('company_statistics')
  return { ...(databaseResult(data, error) as CompanyStatistics), configured: true }
})
