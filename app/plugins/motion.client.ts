export default defineNuxtPlugin(nuxtApp => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
  if (!('IntersectionObserver' in window)) return
  const seen = new WeakSet<Element>()
  const animations = new Set<Animation>()
  function enter(element: Element, heading = false) {
    element.classList.add('is-revealed')
    seen.add(element)
    if (reduced.matches || typeof element.animate !== 'function') return
    const animation = element.animate([
      { transform: `translateY(${heading ? 8 : 18}px)` },
      { transform: 'translateY(0)' },
    ], { duration: heading ? 300 : 480, easing: 'cubic-bezier(.2,.7,.2,1)' })
    animations.add(animation)
    void animation.finished.then(() => animations.delete(animation), () => animations.delete(animation))
  }
  const reveal = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        enter(entry.target)
        observer.unobserve(entry.target)
      }
    }
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' })

  const words = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }
  }, { threshold: 0.45 })

  function stop() {
    reveal.disconnect()
    words.disconnect()
    animations.forEach(animation => animation.cancel())
    animations.clear()
  }
  const scanPage = () => {
    stop()
    document.body.classList.toggle('motion-ready', !reduced.matches)
    if (reduced.matches) return
    const root = document.querySelector('#main-content') || document
    root.querySelectorAll('.reveal, .page-heading, .directory-intro, .subpage-intro, .info-intro, .company-hero-detail, .form-shell > h1').forEach(element => {
      if (seen.has(element)) return
      const bounds = element.getBoundingClientRect()
      if (bounds.top < window.innerHeight && bounds.bottom > 0) {
        // Keep first-screen content immediately readable; animate only the page heading.
        if (!element.classList.contains('reveal')) enter(element, true)
        else { element.classList.add('is-revealed'); seen.add(element) }
      } else if (bounds.bottom > 0) reveal.observe(element)
    })
    root.querySelectorAll('.assembly-line:not(.is-visible)').forEach(element => words.observe(element))
  }
  // Scan once per rendered page, rather than the whole document on every DOM mutation.
  nuxtApp.hook('app:mounted', scanPage)
  nuxtApp.hook('page:finish', scanPage)
  reduced.addEventListener('change', scanPage)
  const cleanup = () => { stop(); reduced.removeEventListener('change', scanPage); document.body.classList.remove('motion-ready') }
  import.meta.hot?.dispose(cleanup)

  return {
    provide: { motion: { cleanup } },
  }
})
