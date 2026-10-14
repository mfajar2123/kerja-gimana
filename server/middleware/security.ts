import { createError, getHeader, getRequestURL, setHeader } from 'h3'
import { readLimitedJson } from '../utils/request-body'

export default defineEventHandler(async event => {
  const path = getRequestURL(event).pathname
  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
  setHeader(event, 'X-Frame-Options', 'DENY')
  setHeader(event, 'Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  // Vite embeds small self-hosted font subsets as data URLs in production CSS.
  const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(24))))
  event.context.cspNonce = nonce
  setHeader(event, 'Content-Security-Policy', `default-src 'self'; script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self'${import.meta.dev ? ' ws: wss:' : ''}; frame-ancestors 'none'; object-src 'none'; base-uri 'none'; form-action 'self'`)
  if (useRuntimeConfig(event).siteUrl.startsWith('https://')) setHeader(event, 'Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  if (!path.startsWith('/api/')) return
  setHeader(event, 'Cache-Control', 'private, no-store')
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(event.method)) {
    const origin = getHeader(event, 'origin')
    const requestSite = getRequestURL(event).origin
    if (!origin || origin !== requestSite || origin !== new URL(useRuntimeConfig(event).siteUrl).origin)
      throw createError({ statusCode: 403, statusMessage: 'Asal permintaan tidak diizinkan.' })
    if (getHeader(event, 'sec-fetch-site') === 'cross-site') throw createError({ statusCode: 403, statusMessage: 'Asal permintaan tidak diizinkan.' })
    if (getHeader(event, 'content-type')?.split(';')[0]?.trim().toLowerCase() !== 'application/json') throw createError({ statusCode: 415, statusMessage: 'Format permintaan tidak didukung.' })
    if (Number(getHeader(event, 'content-length') || 0) > 32768) throw createError({ statusCode: 413, statusMessage: 'Isian terlalu panjang.' })
    await readLimitedJson(event)
  }
})
