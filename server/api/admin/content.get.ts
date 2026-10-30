import { getQuery } from 'h3'
import { z } from 'zod'
import { requireAdmin } from '../../utils/supabase'
import { databaseResult } from '../../utils/validation'

const querySchema = z.object({ kind: z.enum(['review', 'salary', 'interview', 'response']), page: z.coerce.number().int().min(1).max(1000).default(1) })
export default defineEventHandler(async event => {
  const { db } = await requireAdmin(event)
  const query = querySchema.safeParse(getQuery(event))
  if (!query.success) throw createError({ statusCode: 422, statusMessage: 'Filter tidak valid.' })
  const { data, error } = await db.rpc('admin_content', { p_kind: query.data.kind, p_page: query.data.page })
  return databaseResult(data, error)
})
