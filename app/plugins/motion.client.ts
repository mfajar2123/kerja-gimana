export default defineNuxtPlugin(nuxtApp => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (reduced.matches || !('IntersectionObserver' in window)) return

  document.body.classList.add('motion-ready')
  const reveal = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      }
    }
  }, { threshold: 0.12, rootMargin: '0px' })

  const words = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }
  }, { threshold: 0.45 })

  const scan = (root: ParentNode = document) => {
    root.querySelectorAll('.reveal:not(.is-revealed)').forEach(element => reveal.observe(element))
    root.querySelectorAll('.assembly-line:not(.is-visible)').forEach(element => words.observe(element))
  }
  const scanPage = () => {
    reveal.disconnect()
    words.disconnect()
    scan()
  }
  // Scan once per rendered page, rather than the whole document on every DOM mutation.
  nuxtApp.hook('app:mounted', scanPage)
  nuxtApp.hook('page:finish', scanPage)

  return {
    provide: { motion: { cleanup: () => { reveal.disconnect(); words.disconnect() } } },
  }
})
