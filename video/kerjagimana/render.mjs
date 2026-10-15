import { spawn } from 'node:child_process'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffprobe from '@ffprobe-installer/ffprobe'

const cwd = dirname(fileURLToPath(import.meta.url))
const output = fileURLToPath(new URL('../../artifacts/video/kerjagimana-horizontal-20s-genz.mp4', import.meta.url))
const run = (program, args, capture = false) => new Promise((resolve, reject) => {
  const child = spawn(program, args, { cwd, windowsHide: true, stdio: capture ? ['ignore', 'pipe', 'inherit'] : 'inherit' })
  let stdout = ''
  if (capture) child.stdout.on('data', chunk => { stdout += chunk })
  child.on('error', reject)
  child.on('exit', code => code === 0 ? resolve(stdout) : reject(new Error(`${program} exited with ${code}`)))
})
await run(process.execPath, ['prepare-assets.mjs'])
await mkdir(dirname(output), { recursive: true })
await run(process.execPath, ['tools.mjs', 'usage', '--json'])
await run(process.execPath, ['tools.mjs', 'render', '--output', output, '--fps', '30', '--quality', 'delivery', '--workers', '2', '--strict'])
const metadata = JSON.parse(await run(ffprobe.path, ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', output], true))
const video = metadata.streams.filter(stream => stream.codec_type === 'video')
const audio = metadata.streams.filter(stream => stream.codec_type === 'audio')
if (video.length !== 1 || audio.length !== 1) throw new Error('Expected exactly one video stream and one audio stream.')
const stream = video[0]
if (stream.width !== 1920 || stream.height !== 1080 || stream.avg_frame_rate !== '30/1') throw new Error('Unexpected video dimensions or frame rate.')
if (Math.abs(Number(metadata.format.duration) - 20) > 1 / 30 || Number(stream.nb_frames) !== 600) throw new Error('Expected a 20-second, 600-frame video.')
const report = { output, bytes: (await stat(output)).size, width: stream.width, height: stream.height, fps: stream.avg_frame_rate, frames: stream.nb_frames, duration: metadata.format.duration, codec: stream.codec_name, audioStreams: audio.length }
await writeFile(new URL('../../artifacts/video/render-report-20s.json', import.meta.url), JSON.stringify(report, null, 2))
console.log(JSON.stringify(report, null, 2))
