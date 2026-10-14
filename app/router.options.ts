import type { RouterConfig } from '@nuxt/schema'
import { START_LOCATION } from 'vue-router'

const companySection = /^\/perusahaan\/([^/]+)(?:\/(?:review|gaji|interview))?\/?$/

export default {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp()
    const router = useRouter()
    const sameCompany = companySection.exec(to.path)?.[1]
    const sectionChange = sameCompany && sameCompany === companySection.exec(from.path)?.[1] && to.path !== from.path
    const position = () => {
      if (router.currentRoute.value.fullPath !== to.fullPath) return false
      // Browser history restores the reader's actual position, including within long reviews.
      if (savedPosition) return { ...savedPosition, behavior: 'instant' as const }
      const selector = to.hash || (sectionChange ? '#company-sections' : '')
      if (selector) {
        let element: HTMLElement | null = null
        try { element = document.querySelector<HTMLElement>(selector) } catch { /* Invalid fragments fall back to the top. */ }
        if (element) {
          if (sectionChange) element.querySelector<HTMLElement>('[aria-current="page"]')?.focus({ preventScroll: true })
          return {
            el: element,
            top: (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0) + (parseFloat(getComputedStyle(element).scrollMarginTop) || 0),
            // Do not travel through the company header on every tab click.
            behavior: sectionChange || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' as const : 'smooth' as const,
          }
        }
      }
      return { left: 0, top: 0, behavior: 'instant' as const }
    }
    if (to.path === from.path) return savedPosition || to.hash || from.hash ? position() : false
    if (from === START_LOCATION) return position()
    return new Promise(resolve => {
      nuxtApp.hooks.hookOnce('page:loading:end', () => {
        requestAnimationFrame(() => resolve(position()))
      })
    })
  },
} satisfies RouterConfig
