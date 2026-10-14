import type { Ref } from 'vue'

/** Reveal the refreshed list after pagination, without moving it for ordinary refreshes. */
export function useListNavigation(page: Ref<number>, pending: Ref<boolean>, selector: string) {
  let requested = false
  watch(page, () => { requested = true }, { flush: 'sync' })
  watch([page, pending], async (_value, _previous, onCleanup) => {
    if (!import.meta.client || !requested || pending.value) return
    let cancelled = false
    onCleanup(() => { cancelled = true })
    await nextTick()
    if (cancelled || pending.value) return
    requested = false
    const element = document.querySelector<HTMLElement>(selector)
    if (!element) return
    element.focus({ preventScroll: true })
    element.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }, { flush: 'post' })
}
