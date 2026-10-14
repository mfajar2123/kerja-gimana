import type { AccountViewer } from '#shared/utils/auth'

export default defineNuxtPlugin(async () => {
  const event = useRequestEvent()
  // Nuxt renders error pages in a separate request without Nitro's document context.
  if (event && event.context.account === undefined) {
    const { viewer } = useAccount()
    const { user } = await useRequestFetch()<{ user: AccountViewer | null }>('/api/auth/session')
    viewer.value = user
  }
})
