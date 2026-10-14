import type { z } from 'zod'
import { createError, type H3Event } from 'h3'
import { readLimitedJson } from './request-body'
export async function validatedBody<T extends z.ZodType>(event: H3Event, schema: T): Promise<z.output<T>> {
  const parsed = schema.safeParse(await readLimitedJson(event))
  if (!parsed.success) throw createError({ statusCode: 422, statusMessage: 'Periksa isian kamu.', data: { fields: parsed.error.issues.map(i => ({ path: i.path.join('.'), message: i.message })) } })
  return parsed.data
}
export function databaseResult<T>(data: T, error: { code?: string } | null): NonNullable<T> {
  if (error) {
    const statusCode = error.code === 'PT429' ? 429 : error.code === '23505' ? 409 : error.code === '42501' ? 403 : error.code === 'P0002' ? 404 : 400
    throw createError({ statusCode, statusMessage: statusCode === 409 ? 'Data ini sudah pernah dikirim.' : 'Permintaan belum bisa diproses.' })
  }
  if (data == null) throw createError({ statusCode: 404, statusMessage: 'Data tidak ditemukan.' })
  return data
}
