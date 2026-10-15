// Portrait framing is authored in 1080x1920 world coordinates, independently
// of the landscape camera. All timings match the original audio mix.
const tl = gsap.timeline({ paused: true, defaults: { ease: 'power2.out' } })
const shot = (cx, cy, scale, ax = 480, ay = 900) => ({ x: ax - scale * cx, y: ay - scale * cy, scale })
const move = (target, pose, at, duration, ease = 'power2.inOut') => tl.to(target, { ...pose, duration, ease }, at)
const setupCamera = (target, pose, at) => tl.fromTo(target, pose, { ...pose, duration: .001, immediateRender: false }, at)
const word = (target, at, duration = .27) => tl.fromTo(target, { opacity: 0, y: 16, filter: 'blur(3px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration, immediateRender: false }, at)
const clear = (target, at, duration = .2) => tl.to(target, { opacity: 0, y: -16, filter: 'blur(3px)', duration, ease: 'power2.in' }, at)
const wide = { x: 0, y: 0, scale: 1 }

setupCamera('#hook-camera', shot(410, 685, 1.18, 485, 770), 0)
word('#h-kerja', 0)
move('#hook-camera', shot(166, 865, 1.18, 300, 870), .38, .34)
word('#h-di', .50)
word('#h-sana', .67)
move('#hook-camera', shot(425, 865, 1.18, 550, 870), .74, .30)
move('#hook-camera', wide, 1.04, .32)
clear('#hook', 1.50, .20)

setupCamera('#question-camera', shot(260, 550, 1.15, 400, 760), 1.70)
word('#q-yakin', 1.70)
word('#q-udah', 2.05)
move('#question-camera', shot(600, 550, 1.15, 580, 760), 1.99, .52)
move('#question-camera', shot(285, 765, 1.15, 400, 825), 2.70, .43)
word('#q-tahu', 2.86)
word('#q-dalem', 3.15)
move('#question-camera', shot(445, 970, 1.05, 480, 880), 3.12, .50)
move('#question-camera', wide, 3.67, .50)
clear('#question', 4.75, .25)

function photograph(scene, image, start, end, fromX, toX) {
  tl.fromTo(scene, { opacity: 0 }, { opacity: 1, duration: .20, immediateRender: false }, start)
  tl.fromTo(image, { scale: 1.30, x: fromX, filter: 'saturate(.45) blur(4px)' }, { scale: 1.06, x: 0, filter: 'saturate(.45) blur(0px)', duration: .52, immediateRender: false }, start)
  move(image, { scale: 1.025, x: toX }, start + .52, end - start - .95, 'none')
  move(image, { scale: 1.30, x: -toX }, end - .43, .43, 'power2.in')
  move(scene, { opacity: 0 }, end - .12, .16)
}
photograph('#photo-work', '#image-work', 5.0, 7.50, 25, -12)
photograph('#photo-salary', '#image-salary', 7.38, 10.20, -20, 12)
photograph('#photo-interview', '#image-interview', 10.08, 13.10, 18, -10)

function feature(camera, first, second, start, firstCenter, secondCenter, leave, scale = 1.08) {
  setupCamera(camera, shot(...firstCenter, scale, 480, 1000), start)
  word(first, start + .08)
  move(camera, shot(...secondCenter, scale, 480, 1030), start + .40, .36)
  word(second, start + .48)
  move(camera, wide, start + .88, .35)
  clear(first, leave, .19)
  clear(second, leave, .19)
}
feature('#work-camera', '#p-work-one', '#p-work-two', 5.10, [386, 985], [342, 1155], 7.08)
feature('#salary-camera', '#p-salary-one', '#p-salary-two', 7.55, [316, 985], [310, 1155], 9.78)
word('#salary-qualifier', 8.80, .25)
clear('#salary-qualifier', 9.78, .19)
feature('#interview-camera', '#p-interview-one', '#p-interview-two', 10.26, [300, 985], [472, 1150], 12.66, 1.04)

move('#paper', { opacity: 1 }, 13.02, .20)
setupCamera('#compare-camera', shot(397, 640, 1.15, 470, 780), 13.10)
word('#c-bandingkan', 13.10)
move('#compare-camera', shot(250, 830, 1.15, 400, 850), 13.50, .38)
word('#c-sebelum', 13.62)
word('#c-memilih', 13.85)
move('#compare-camera', shot(383, 1020, 1.15, 480, 950), 13.80, .45)
move('#compare-camera', wide, 14.28, .35)
clear('#compare', 15.06, .20)

move('#closing-black', { opacity: 1 }, 15.23, .18)
setupCamera('#closing-camera', shot(202, 540, 1.18, 400, 700), 15.30)
word('#f-sebelum', 15.32)
word('#f-kerja', 15.55)
word('#f-disana', 15.78)
move('#closing-camera', shot(253, 710, 1.18, 450, 850), 15.50, .70)
move('#closing-camera', shot(196, 930, 1.18, 400, 900), 16.34, .38)
word('#f-cari', 16.48)
word('#f-tahu', 16.71)
word('#f-dulu', 16.94)
move('#closing-camera', shot(332, 1100, 1.18, 480, 990), 16.72, .58)
move('#closing-camera', wide, 17.37, .46)
word('#brand', 18.0, .25)
word('#cta', 18.15, .30)
tl.to('#film', { opacity: 1, duration: 1.55 }, 18.45)
window.__timelines = window.__timelines || {}
window.__timelines['kerjagimana-portrait'] = tl
window.videoTimeline = tl
window.videoReady = document.fonts.ready
