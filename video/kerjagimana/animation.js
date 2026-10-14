/* A single paused GSAP timeline owns every visible state. No network, timers or audio. */
const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
const enter = (target, time, duration = 0.4, y = 18, blur = 3) => tl.fromTo(target,
  { opacity: 0, y, filter: `blur(${blur}px)` },
  { opacity: 1, y: 0, filter: 'blur(0px)', duration, immediateRender: false }, time)
const exit = (target, time, duration = 0.23, y = -18, blur = 3) => tl.to(target,
  { opacity: 0, y, filter: `blur(${blur}px)`, duration, ease: 'power2.in' }, time)
const camera = (target, start, finish, at, duration) => tl.fromTo(target, start,
  { ...finish, duration, ease: 'power2.inOut', immediateRender: false }, at)

enter('#intro-one', 0, 0.35)
enter('#intro-two', 0.28, 0.4)
camera('#intro-rig', { scale: 1.12, x: 85, y: 15 }, { scale: 1.12, x: -10, y: 15 }, 0.2, 0.6)
tl.to('#intro-rig', { scale: 1, x: 0, y: 0, duration: 0.3 }, 0.8)
exit('#intro', 2.1)

enter('#question-one', 2.4, 0.35)
enter('#question-two', 2.85, 0.35)
enter('#question-three', 3.15, 0.35)
camera('#question-rig', { scale: 1.08, x: 35, y: 45 }, { scale: 1.08, x: -15, y: -15 }, 2.95, 0.65)
tl.to('#question-rig', { scale: 1, x: 0, y: 0, duration: 0.35 }, 3.6)
tl.fromTo('#opening-accent', { opacity: 0, x: 390 }, { opacity: 1, x: 0, duration: 0.6, immediateRender: false }, 3.6)
tl.fromTo('#shared-line', { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.35, immediateRender: false }, 3.6)
exit('#question', 5.35)
tl.to('#opening-context', { opacity: 0, duration: 0.23 }, 5.35)
tl.to('#opening-accent', { opacity: 0, duration: 0.3 }, 5.58)
tl.to('#shared-line', { x: 740, y: -112, width: 900, duration: 0.37, ease: 'power2.inOut' }, 5.58)
tl.to('#shared-line', { opacity: 0, duration: 0.18 }, 6.25)
tl.to('#paper', { opacity: 1, duration: 0.38 }, 5.8)

enter('#search-copy', 5.8)
enter('#product-brand', 6.2, 0.3, 0, 0)
enter('#product-footer', 6.4, 0.3, 0, 0)
enter('#search-field', 6.25, 0.4, 10, 0)
enter('#demo-label', 6.65, 0.05, 0, 0)
for (let index = 1; index <= 6; index++) {
  // Zero-duration text steps are intentionally rendered as narrow tweens for seek reliability.
  tl.to('#query', { textContent: 'Aurora'.slice(0, index), duration: 0.001 }, 6.7 + (index - 1) * 0.075)
}
tl.to('#typing-caret', { opacity: 1, duration: 0.03 }, 6.7)
tl.to('#typing-caret', { opacity: 0, duration: 0.03 }, 7.15)
enter('#company-header', 7.15, 0.35, 16, 2)
exit('#search-copy', 9.2)
exit('#search-field', 9.2, 0.23, -10, 0)
tl.to('#company-rig', { y: -243, height: 640, duration: 0.55, ease: 'power2.inOut' }, 9.2)
tl.to('#company-header', { height: 147, padding: '22px 0px', backgroundColor: '#f7f5f2', borderColor: 'rgba(0,0,0,0)', duration: 0.55 }, 9.2)
tl.to('#company-initial', { width: 82, height: 82, duration: 0.55 }, 9.2)
tl.to('#result-arrow', { opacity: 0, duration: 0.2 }, 9.2)

enter('#review-copy', 9.6)
enter('#profile-details', 10.05, 0.4, 12, 2)
enter('#review-panel', 10.05, 0.4, 12, 2)
enter('#review-note', 10.45, 0.3, 8, 0)
exit('#review-copy', 13)
tl.to('#tab-underline', { x: 274, width: 213, duration: 0.4, ease: 'power2.inOut' }, 13.23)
tl.to('#tab-review', { color: '#615c5a', duration: 0.25 }, 13.23)
tl.to('#tab-salary', { color: '#000', duration: 0.25 }, 13.23)
exit('#review-panel', 13.23, 0.17, 0, 2)
tl.to('#review-panel', { x: -70, duration: 0.32 }, 13.23)

enter('#salary-copy', 13.4)
tl.fromTo('#salary-panel', { opacity: 0, x: 70, filter: 'blur(2px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.45, immediateRender: false }, 13.4)
enter('#salary-note', 13.9, 0.3, 8, 0)
exit('#salary-copy', 17)
tl.to('#tab-underline', { x: 520, width: 118, duration: 0.4, ease: 'power2.inOut' }, 17.23)
tl.to('#tab-salary', { color: '#615c5a', duration: 0.25 }, 17.23)
tl.to('#tab-interview', { color: '#000', duration: 0.25 }, 17.23)
exit('#salary-panel', 17.23, 0.17, 0, 2)
tl.to('#salary-panel', { x: -70, duration: 0.32 }, 17.23)

enter('#interview-copy', 17.4)
tl.fromTo('#interview-panel', { opacity: 0, x: 70, filter: 'blur(2px)' }, { opacity: 1, x: 0, filter: 'blur(0px)', duration: 0.45, immediateRender: false }, 17.4)
enter('#interview-note', 17.9, 0.3, 8, 0)
exit('#interview-copy', 20.35)
tl.to('#company-rig', { opacity: 0, scaleX: 0.48, duration: 0.22, ease: 'power2.inOut' }, 20.58)
enter('#compare-copy', 20.8)
enter('#comparison-rig', 20.8, 0.35, 0, 2)
camera('#comparison-rig', { scale: 1.08, x: 15 }, { scale: 1, x: 0 }, 21.2, 0.45)
enter('#compare-lentera', 21.35, 0.4, 14, 2)
enter('#compare-note', 21.75, 0.3, 8, 0)
exit('#compare-copy', 24.6)
exit('#comparison-rig', 24.6, 0.3, -10, 2)
exit('#demo-label', 24.6, 0.3, 0, 0)
exit('#product-brand', 24.6, 0.3, 0, 0)
exit('#product-footer', 24.6, 0.3, 0, 0)
tl.to('#closing-wipe', { opacity: 1, x: -1920, duration: 0.27, ease: 'power2.inOut' }, 24.8)
tl.to('#paper', { opacity: 0, duration: 0.08 }, 24.98)
tl.to('#closing-wipe', { x: -3840, duration: 0.25, ease: 'power2.inOut' }, 25.07)

enter('#closing-one', 25, 0.35)
enter('#closing-two', 25.65, 0.35)
camera('#closing-rig', { scale: 1.08, x: 18, y: 35 }, { scale: 1.08, x: 0, y: -25 }, 25.6, 0.5)
tl.to('#closing-rig', { scale: 1, x: 0, y: 0, duration: 0.35 }, 26.1)
enter('#closing-brand', 26.45, 0.3, 8, 0)
enter('#closing-button', 26.75, 0.35, 12, 0)
enter('#closing-footer', 26.75, 0.35, 0, 0)
// Hold the settled closing frame through the full 30-second composition.
tl.to('#film', { opacity: 1, duration: 2.9 }, 27.1)

window.__timelines = window.__timelines || {}
window.__timelines['kerjagimana-horizontal'] = tl
window.videoTimeline = tl
window.videoReady = document.fonts.ready
