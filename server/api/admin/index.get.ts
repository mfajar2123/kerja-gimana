import { getQuery } from 'h3'
import { z } from 'zod'
import { requireAdmin } from '../../utils/supabase'
import { databaseResult } from '../../utils/validation'
export default defineEventHandler(async event => {
  const { db } = await requireAdmin(event)
  const parsed = z.object({ section: z.enum(['overview','queue','companies','users']).default('overview'), kind: z.string().max(32).default('all'), page: z.coerce.number().int().min(1).max(1000).default(1) }).safeParse(getQuery(event))
  if (!parsed.success) throw createError({ statusCode: 422, statusMessage: 'Filter admin tidak valid.' })
  if (parsed.data.section === 'overview') {
    const { data, error } = await db.rpc('admin_dashboard_statistics')
    return databaseResult(data, error)
  }
  if (parsed.data.section === 'companies') {
    const { data, error } = await db.rpc('admin_companies', { p_page: parsed.data.page })
    return databaseResult(data, error)
  }
  if (parsed.data.section === 'users') {
    const { data, error } = await db.rpc('admin_users', { p_page: parsed.data.page })
    return databaseResult(data, error)
  }
  const { data, error } = await db.rpc('moderation_queue', { p_kind: parsed.data.kind, p_page: parsed.data.page })
  return databaseResult(data, error)
})
