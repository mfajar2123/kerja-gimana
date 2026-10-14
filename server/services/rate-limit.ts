import { createError, getHeader, getRequestIP, type H3Event } from 'h3'
import { createClient } from '@supabase/supabase-js'
import { configured } from '../utils/supabase'
import { databaseResult } from '../utils/validation'

export async function consumeLimit(event: H3Event, bucket: string, limit: number, userId?: string) {
  if (!configured(event)) return
  const config = useRuntimeConfig(event)
  if (!config.supabaseServiceRoleKey || !config.rateLimitSecret)
    throw createError({ statusCode: 503, statusMessage: 'Layanan belum siap menerima permintaan.' })
  // Cloudflare replaces this header at its edge. Node uses its direct connection address instead.
  const address = getRequestIP(event, { xForwardedFor: false }) || getHeader(event, 'cf-connecting-ip') || 'unknown'
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey('raw', encoder.encode(config.rateLimitSecret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const signature = new Uint8Array(await crypto.subtle.sign('HMAC', keyMaterial, encoder.encode(`${bucket}:${userId || address}`)))
  const key = Array.from(signature, byte => byte.toString(16).padStart(2, '0')).join('')
  const rateDb = createClient(config.supabaseUrl, config.supabaseServiceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } })
  const { data, error } = await rateDb.rpc('consume_rate_limit', { p_key: key, p_limit: limit })
  if (!databaseResult(data, error)) throw createError({ statusCode: 429, statusMessage: 'Terlalu banyak percobaan. Coba lagi dalam satu menit.' })
}
