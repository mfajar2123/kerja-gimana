import { createError, getRequestURL, sendRedirect, setHeader } from 'h3'
import { accountDestination, isAdminPath, isGuestPath, isPrivatePath } from '#shared/utils/auth'
import { currentAccount } from '../utils/account'

export default defineEventHandler(async event => {
  const url = getRequestURL(event)
  const path = url.pathname
  if (!['GET', 'HEAD'].includes(event.method) || path.startsWith('/api/') || path.startsWith('/_') || /\.[a-z0-9]+$/i.test(path)) return
  // The navbar is personal even on public pages; never cache another account's HTML.
  setHeader(event, 'Cache-Control', 'private, no-store')
  const viewer = await currentAccount(event)
  event.context.account = viewer
  if (isGuestPath(path) && viewer) return sendRedirect(event, accountDestination(url.searchParams.get('next'), viewer.role))
  if (!isPrivatePath(path)) return
  if (!viewer) return sendRedirect(event, `/masuk?next=${encodeURIComponent(path + url.search)}`)
  if (isAdminPath(path) && viewer.role !== 'admin') throw createError({ statusCode: 403, statusMessage: 'Akses admin tidak diizinkan.' })
  event.context.viewerIsAdmin = viewer.role === 'admin'
  event.context.viewerId = viewer.id
  event.context.siteUrl = useRuntimeConfig(event).siteUrl
})
