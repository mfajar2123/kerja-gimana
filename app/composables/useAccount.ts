import { accountDestination, type AccountViewer } from '#shared/utils/auth'

export function useAccount() {
  const event = useRequestEvent()
  const viewer = useState<AccountViewer | null>('account-viewer', () => event?.context.account ?? null)
  const revision = useState('account-revision', () => 0)
  const busy = useState('account-busy', () => false)
  const actionError = useState('account-action-error', () => '')
  const pageError = useError()
  function setViewer(value: AccountViewer | null) { revision.value++; viewer.value = value }
  function notifyTabs() {
    if (import.meta.client) {
      try { localStorage.setItem('kg-session-change', `${Date.now()}:${Math.random()}`) } catch { /* Storage can be disabled. */ }
    }
  }
  async function refresh() {
    const requestRevision = ++revision.value
    const { user: account } = await $fetch<{ user: AccountViewer | null }>('/api/auth/session')
    if (requestRevision === revision.value) viewer.value = account
    return viewer.value
  }
  async function signIn(email: string, password: string, next?: unknown) {
    const { user } = await $fetch<{ user: AccountViewer }>('/api/auth/login', { method: 'POST', body: { email, password } })
    setViewer(user)
    clearNuxtData()
    notifyTabs()
    await navigateTo(accountDestination(next, user.role), { replace: true })
  }
  async function signOut(destination = '/masuk') {
    if (busy.value) return
    busy.value = true
    actionError.value = ''
    try {
      await $fetch('/api/auth/logout', { method: 'POST', body: {} })
      setViewer(null)
      clearNuxtData()
      notifyTabs()
      if (pageError.value) await clearError({ redirect: destination })
      else await navigateTo(destination, { replace: true })
    } catch { actionError.value = 'Belum berhasil keluar. Coba lagi; akunmu masih masuk.' }
    finally { busy.value = false }
  }
  function forget() { setViewer(null); clearNuxtData(); notifyTabs() }
  return { viewer, revision: readonly(revision), busy, actionError, refresh, signIn, signOut, forget }
}
