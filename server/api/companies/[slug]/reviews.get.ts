import { getQuery, getRouterParam } from 'h3'
import { z } from 'zod'
import type { PublicReview } from '#shared/types'
import { database } from '../../../utils/supabase'
import { databaseResult } from '../../../utils/validation'

export default defineEventHandler(async event => {
  const slug = getRouterParam(event, 'slug')
  const page = z.coerce.number().int().min(1).max(1000).safeParse(getQuery(event).page ?? '1')
  if (!slug || slug.length > 150 || !page.success) throw createError({ statusCode: 422, statusMessage: 'Permintaan halaman review tidak valid.' })
  const { data, error } = await database(event).rpc('company_reviews', { p_slug: slug, p_page: page.data })
  return databaseResult(data, error) as unknown as { reviews: PublicReview[]; total: number; page: number; per_page: number }
})
