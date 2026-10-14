import { setHeader } from 'h3'
import { configured, database } from '../utils/supabase'

const publicPaths = ['/', '/perusahaan', '/bandingkan', '/tentang', '/panduan-review', '/privasi', '/ketentuan', '/kontak']
const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;')

export default defineEventHandler(async event => {
  const origin = useRuntimeConfig(event).siteUrl.replace(/\/$/, '')
  const urls = [...publicPaths.map(path => `${origin}${path}`)]
  if (configured(event)) {
    try {
      const db = database(event)
      const { data, error } = await db.from('companies').select('slug,updated_at').eq('status', 'approved').order('updated_at', { ascending: false }).limit(5000)
      if (error) throw error
      for (const company of data || []) {
        urls.push(`<url><loc>${escapeXml(`${origin}/perusahaan/${company.slug}`)}</loc><lastmod>${new Date(company.updated_at).toISOString()}</lastmod></url>`)
        for (const section of ['review', 'gaji', 'interview']) urls.push(`<url><loc>${escapeXml(`${origin}/perusahaan/${company.slug}/${section}`)}</loc></url>`)
      }
    } catch {
      // A sitemap remains available with the static public routes when the database is temporarily unavailable.
    }
  }
  const entries = urls.map(url => url.startsWith('<url>') ? url : `<url><loc>${escapeXml(url)}</loc></url>`).join('')
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=1800, stale-while-revalidate=3600')
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`
})
