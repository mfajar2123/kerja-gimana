import { createRequire } from 'node:module'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { readFile, writeFile } from 'node:fs/promises'
import ffmpeg from '@ffmpeg-installer/ffmpeg'
import ffprobe from '@ffprobe-installer/ffprobe'

const run = promisify(execFile)
const require = createRequire(import.meta.url)
const sharp = createRequire(require.resolve('hyperframes/package.json'))('sharp')
const out = new URL('../../artifacts/video/', import.meta.url)
const input = fileURLToPath(new URL('kerjagimana-horizontal-20s-genz.mp4', out))
await run(ffmpeg.path, ['-v', 'error', '-i', input, '-f', 'null', '-'], { windowsHide: true, maxBuffer: 1024 * 1024 })
// Inspect frames decoded from the delivered MP4, not only browser screenshots.
await run(ffmpeg.path, ['-v', 'error', '-i', input, '-vf', "select='eq(n,8)+eq(n,42)+eq(n,132)+eq(n,195)+eq(n,276)+eq(n,354)+eq(n,444)+eq(n,570)',scale=480:270,tile=4x2", '-frames:v', '1', '-y', fileURLToPath(new URL('render-contact-sheet-20s.png', out))], { windowsHide: true })
await run(ffmpeg.path, ['-v', 'error', '-ss', '19', '-i', input, '-frames:v', '1', '-y', fileURLToPath(new URL('poster-20s.png', out))], { windowsHide: true })
for (const [name, times] of [['word-follow', [.25,.75,1.1,1.4,1.98,2.56,3.12,3.63]], ['photo-handoff', [6.5,7.25,7.48,7.85,9.2,10.14,10.55,11.8]], ['closing', [15.6,16.2,16.65,17.2,17.65,18.1,19]], ['delivered-closing', [17.65,18.1,18.3,18.45,19,19.966]]]) {
  const tiles = []
  const count = times.length
  for (let index = 0; index < count; index++) {
    const path = fileURLToPath(new URL(`review-20s/${name === 'delivered-closing' ? 'delivered-' : ''}frame-${times[index]}.png`, out))
    if (name === 'delivered-closing') await run(ffmpeg.path, ['-v', 'error', '-ss', String(times[index]), '-i', input, '-frames:v', '1', '-y', path], { windowsHide: true })
    tiles.push({ input: await sharp(path).resize(480, 270).png().toBuffer(), left: (index % 4) * 480, top: Math.floor(index / 4) * 270 })
  }
  await sharp({ create: { width: 1920, height: Math.ceil(count / 4) * 270, channels: 3, background: '#242020' } }).composite(tiles).png().toFile(fileURLToPath(new URL(`review-20s/${name}-strip.png`, out)))
}
const metadataFile = new URL('render-report-20s.json', out)
const report = JSON.parse(await readFile(metadataFile, 'utf8'))
const metadata = JSON.parse((await run(ffprobe.path, ['-v','error','-show_streams','-of','json',input], { windowsHide: true })).stdout)
const audioStream = metadata.streams.find(stream => stream.codec_type === 'audio')
if (!audioStream || audioStream.channels !== 2) throw new Error('Expected stereo audio in the delivered MP4.')
const audioCheck = await run(ffmpeg.path, ['-hide_banner','-i',input,'-vn','-af','loudnorm=I=-17:TP=-1.5:LRA=7:print_format=json','-f','null','-'], { windowsHide: true, maxBuffer: 1024*1024 })
const loudness = audioCheck.stderr.match(/\{\s*"input_i"[\s\S]*?\}/)?.[0]
report.audio = { codec: audioStream.codec_name, channels: audioStream.channels, sampleRate: audioStream.sample_rate, duration: audioStream.duration, measuredLoudness: loudness ? JSON.parse(loudness) : null, directlyAuditioned: false }
report.fullDecodePassed = true
report.decodedFrameContactSheet = 'artifacts/video/render-contact-sheet-20s.png'
report.poster = 'artifacts/video/poster-20s.png'
report.decodedClosingStrip = 'artifacts/video/review-20s/delivered-closing-strip.png'
const audioHash = async video => (await run(ffmpeg.path, ['-v','error','-i',video,'-map','0:a:0','-f','hash','-hash','sha256','-'], { windowsHide: true })).stdout.trim()
const previous = fileURLToPath(new URL('kerjagimana-horizontal-20s-audio-domain.mp4', out))
report.audio.decodedSha256 = await audioHash(input)
report.audio.previousDecodedSha256 = await audioHash(previous)
report.audio.identicalToPrevious = report.audio.decodedSha256 === report.audio.previousDecodedSha256
if (!report.audio.identicalToPrevious) throw new Error('Decoded audio changed unexpectedly in this visual-only revision.')
await writeFile(metadataFile, JSON.stringify(report, null, 2))
console.log('Full MP4 decode passed; decoded frame contact sheet, poster and transition strips saved.')
