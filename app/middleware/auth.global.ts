import { accountDestination, isAdminPath, isGuestPath, isPrivatePath } from '#shared/utils/auth'

export default defineNuxtRouteMiddleware(async to => {
  // Nitro checks documents; hydrate their identity without a guest-state flash.
  if (import.meta.server || (useNuxtApp().isHydrating && useNuxtApp().payload.serverRendered)) return
  const account = useAccount()
  let viewer
  try { viewer = await account.refresh() } catch {
    if (isPrivatePath(to.path) || isGuestPath(to.path)) throw createError({ statusCode: 503, statusMessage: 'Sesi belum bisa diperiksa. Coba lagi.' })
    return
  }
  if (isGuestPath(to.path) && viewer) return navigateTo(accountDestination(to.query.next, viewer.role), { replace: true })
  if (!isPrivatePath(to.path)) return
  if (!viewer) return navigateTo({ path: '/masuk', query: { next: to.fullPath } }, { replace: true })
  if (isAdminPath(to.path) && viewer.role !== 'admin') throw createError({ statusCode: 403, statusMessage: 'Akses admin tidak diizinkan.' })
})
