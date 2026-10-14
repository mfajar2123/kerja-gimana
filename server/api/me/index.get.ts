import { requireUser } from '../../utils/supabase'
import { databaseResult } from '../../utils/validation'
export default defineEventHandler(async event => {
  const { db, user } = await requireUser(event)
  const { data, error } = await db.from('profiles').select('display_name,role,status').eq('id', user.id).maybeSingle()
  const profile = databaseResult(data, error)
  if (profile.status !== 'active') throw createError({ statusCode: 403, statusMessage: 'Akun ini tidak dapat digunakan saat ini.' })
  return { id: user.id, email: user.email, display_name: profile.display_name, role: profile.role }
})
