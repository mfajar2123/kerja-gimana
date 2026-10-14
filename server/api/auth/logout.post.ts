import { configured, database } from '../../utils/supabase'
export default defineEventHandler(async event => {
  if (configured(event)) {
    const { error } = await database(event).auth.signOut({ scope: 'local' })
    if (error) throw createError({ statusCode: 503, statusMessage: 'Belum berhasil keluar. Coba lagi.' })
  }
  return { success: true }
})
