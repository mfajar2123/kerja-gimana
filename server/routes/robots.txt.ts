import { getRequestURL, setHeader } from 'h3'

export default defineEventHandler(event => {
  const origin = useRuntimeConfig(event).siteUrl || getRequestURL(event).origin
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600')
  return `User-agent: *\nAllow: /\nDisallow: /dashboard\nDisallow: /admin\nDisallow: /masuk\nDisallow: /daftar\nDisallow: /lupa-password\nSitemap: ${origin}/sitemap.xml\n`
})
