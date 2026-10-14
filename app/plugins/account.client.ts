import { accountDestination, isAdminPath, isGuestPath, isPrivatePath } from '#shared/utils/auth'

export default defineNuxtPlugin(nuxtApp => {
  const account = useAccount()
  const route = useRoute()
  const pageError = useError()
  let checking = false
  let pending = false
  async function sync() {
    if (document.visibilityState !== 'visible' || account.busy.value) return
    if (checking) { pending = true; return }
    checking = true
    try {
      const previousIdentity = `${account.viewer.value?.id}:${account.viewer.value?.role}`
      const requestRevision = account.revision.value + 1
      const viewer = await account.refresh()
      if (account.revision.value !== requestRevision || account.busy.value || pageError.value) return
      const identityChanged = previousIdentity !== `${viewer?.id}:${viewer?.role}`
      if (identityChanged) clearNuxtData()
      if (isPrivatePath(route.path) && !viewer) await navigateTo({ path: '/masuk', query: { next: route.fullPath } }, { replace: true })
      else if (isAdminPath(route.path) && viewer?.role !== 'admin') await navigateTo('/dashboard', { replace: true })
      else if (isGuestPath(route.path) && viewer) await navigateTo(accountDestination(route.query.next, viewer.role), { replace: true })
      else if (identityChanged && !isPrivatePath(route.path)) await refreshNuxtData()
    } catch { /* A network failure must not pretend to log out a user. */ }
    finally {
      checking = false
      if (pending) { pending = false; void sync() }
    }
  }
  nuxtApp.hook('app:mounted', () => {
    window.addEventListener('focus', sync)
    window.addEventListener('pageshow', sync)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('storage', event => { if (event.key === 'kg-session-change') void sync() })
    void sync()
  })
})
