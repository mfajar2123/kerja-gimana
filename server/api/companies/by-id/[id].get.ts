import { getRouterParam } from 'h3'
import { z } from 'zod'
import type { Company } from '#shared/types'
import { database } from '../../../utils/supabase'
import { databaseResult } from '../../../utils/validation'

export default defineEventHandler(async (event): Promise<Company> => {
  const id = z.uuid().safeParse(getRouterParam(event, 'id'))
  if (!id.success) throw createError({ statusCode: 404, statusMessage: 'Perusahaan tidak ditemukan.' })
  const { data, error } = await database(event).rpc('company_by_id', { p_id: id.data })
  const company = databaseResult(data, error)
  if (!company) throw createError({ statusCode: 404, statusMessage: 'Perusahaan tidak ditemukan.' })
  return company as unknown as Company
})
