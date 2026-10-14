import { contactSchema } from '#shared/schemas'
import { detectPersonalInformation } from '#shared/constants/privacy'
import { consumeLimit } from '../services/rate-limit'
import { configured, serviceDatabase } from '../utils/supabase'
import { currentAccount } from '../utils/account'
import { databaseResult, validatedBody } from '../utils/validation'

export default defineEventHandler(async event => {
  if (!configured(event)) throw createError({ statusCode: 503, statusMessage: 'Formulir kontak belum tersedia.' })
  await consumeLimit(event, 'contact', 3)
  const body = await validatedBody(event, contactSchema)
  if (detectPersonalInformation(body.message)) throw createError({ statusCode: 422, statusMessage: 'Hapus nomor identitas dan nomor telepon pribadi dari pesan.' })
  const account = await currentAccount(event)
  const { data, error } = await serviceDatabase(event).rpc('submit_contact', { p_data: { ...body, author_id: account?.id ?? null } })
  const id = databaseResult(data, error)
  return { id, received: true, authenticated: Boolean(account) }
})
