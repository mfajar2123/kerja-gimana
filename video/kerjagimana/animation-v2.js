/* World point p maps to screen a by a - scale*p. Word reveals are local;
   camera movement is authored independently and deterministic under seeking. */
const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
const shot = (cx, cy, scale, ax = 760, ay = 520) => ({ x: ax - scale * cx, y: ay - scale * cy, scale })
const move = (target, pose, at, duration, ease = 'power2.inOut') => tl.to(target, { ...pose, duration, ease }, at)
const setupCamera = (target, pose, at) => tl.fromTo(target, pose, { ...pose, duration: 0.001, immediateRender: false }, at)
const word = (target, at, duration = 0.27) => tl.fromTo(target, { opacity: 0, y: 16, filter: 'blur(3px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration, immediateRender: false }, at)
const clear = (target, at, duration = 0.2) => tl.to(target, { opacity: 0, y: -16, filter: 'blur(3px)', duration, ease: 'power2.in' }, at)
const wide = { x: 0, y: 0, scale: 1 }

setupCamera('#hook-camera', shot(730, 405, 1.6, 750, 500), 0)
word('#h-kerja', 0)
move('#hook-camera', shot(585, 610, 1.6, 750, 500), 0.38, 0.34)
word('#h-di', 0.50)
word('#h-sana', 0.67)
move('#hook-camera', shot(915, 610, 1.6, 960, 500), 0.74, 0.30)
move('#hook-camera', wide, 1.04, 0.32)
clear('#hook', 1.50, 0.20)

setupCamera('#question-camera', shot(510, 345, 1.45, 750, 480), 1.70)
word('#q-yakin', 1.70)
word('#q-udah', 2.05)
move('#question-camera', shot(909, 338, 1.45, 1040, 480), 1.99, 0.52)
move('#question-camera', shot(455, 580, 1.45, 720, 535), 2.70, 0.43)
word('#q-tahu', 2.86)
word('#q-dalem', 3.15)
move('#question-camera', shot(1075, 573, 1.45, 1060, 535), 3.12, 0.50)
move('#question-camera', wide, 3.67, 0.50)
clear('#question', 4.75, 0.25)

// A close crop opens to context, gently drifts, then pushes into the next photo.
function photograph(scene, image, start, end, fromX = 0, toX = -25) {
  tl.fromTo(scene, { opacity: 0 }, { opacity: 1, duration: 0.20, immediateRender: false }, start)
  tl.fromTo(image, { scale: 1.42, x: fromX, filter: 'saturate(.45) blur(4px)' }, { scale: 1.08, x: 0, filter: 'saturate(.45) blur(0px)', duration: 0.52, immediateRender: false }, start)
  move(image, { scale: 1.03, x: toX }, start + 0.52, end - start - 0.95, 'none')
  move(image, { scale: 1.40, x: -toX }, end - 0.43, 0.43, 'power2.in')
  move(scene, { opacity: 0 }, end - 0.12, 0.16)
}
photograph('#photo-work', '#image-work', 5.0, 7.50, 50, -25)
photograph('#photo-salary', '#image-salary', 7.38, 10.20, -40, 24)
photograph('#photo-interview', '#image-interview', 10.08, 13.10, 35, -18)

function feature(camera, first, second, start, firstCenter, secondCenter, leave) {
  setupCamera(camera, shot(...firstCenter, 1.20, 680, 530), start)
  word(first, start + 0.08)
  move(camera, shot(...secondCenter, 1.20, 680, 530), start + 0.40, 0.36)
  word(second, start + 0.48)
  move(camera, wide, start + 0.88, 0.35)
  clear(first, leave, 0.19)
  clear(second, leave, 0.19)
}
feature('#work-camera', '#p-work-one', '#p-work-two', 5.10, [555, 500], [355, 680], 7.08)
feature('#salary-camera', '#p-salary-one', '#p-salary-two', 7.55, [485, 485], [300, 665], 9.78)
word('#salary-qualifier', 8.80, 0.25)
clear('#salary-qualifier', 9.78, 0.19)
feature('#interview-camera', '#p-interview-one', '#p-interview-two', 10.26, [390, 505], [490, 680], 12.66)

move('#paper', { opacity: 1 }, 13.02, 0.20)
setupCamera('#compare-camera', shot(755, 370, 1.32, 820, 490), 13.10)
word('#c-bandingkan', 13.10)
move('#compare-camera', shot(580, 600, 1.32, 680, 545), 13.50, 0.38)
word('#c-sebelum', 13.62)
word('#c-memilih', 13.85)
move('#compare-camera', shot(1231, 598, 1.32, 1060, 545), 13.80, 0.45)
move('#compare-camera', wide, 14.28, 0.35)
clear('#compare', 15.06, 0.20)

move('#closing-black', { opacity: 1 }, 15.23, 0.18)
setupCamera('#closing-camera', shot(550, 398, 1.33, 720, 490), 15.30)
word('#f-sebelum', 15.32)
word('#f-kerja', 15.55)
word('#f-disana', 15.78)
move('#closing-camera', shot(1306, 390, 1.33, 1090, 490), 15.50, 0.70)
move('#closing-camera', shot(410, 644, 1.33, 650, 535), 16.34, 0.38)
word('#f-cari', 16.48)
word('#f-tahu', 16.71)
word('#f-dulu', 16.94)
move('#closing-camera', shot(968, 635, 1.33, 970, 535), 16.72, 0.58)
move('#closing-camera', wide, 17.37, 0.46)
word('#brand', 18.0, 0.25)
word('#cta', 18.15, 0.30)
tl.to('#film', { opacity: 1, duration: 1.55 }, 18.45)
window.__timelines = window.__timelines || {}
window.__timelines['kerjagimana-horizontal'] = tl
window.videoTimeline = tl
window.videoReady = document.fonts.ready
