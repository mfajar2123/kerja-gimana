import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { writeFile } from 'node:fs/promises'
import ffmpeg from '@ffmpeg-installer/ffmpeg'
import ffprobe from '@ffprobe-installer/ffprobe'
const run = promisify(execFile)
const folder = new URL('./assets/revision-20s/', import.meta.url)
const path = name => fileURLToPath(new URL(name, folder))
const command = args => run(ffmpeg.path, ['-hide_banner', '-y', ...args], { windowsHide: true, maxBuffer: 4 * 1024 * 1024 })

await command(['-i', path('music-original.mp3'), '-af', 'atrim=start=8:end=28,asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.18,afade=t=out:st=18.6:d=1.4,loudnorm=I=-20:TP=-3:LRA=7', '-ar', '48000', '-ac', '2', path('music-bed.wav')])
await command(['-i', path('sweep-original.wav'), '-af', 'atrim=start=0:end=0.65,asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st=0.42:d=0.23,volume=0.28', '-ar', '48000', '-ac', '2', path('sweep.wav')])
await command(['-i', path('zoom-original.wav'), '-af', 'atrim=start=0:end=0.85,asetpts=PTS-STARTPTS,afade=t=in:d=0.025,afade=t=out:st=0.55:d=0.30,volume=0.24', '-ar', '48000', '-ac', '2', path('zoom.wav')])

const cues = [
  { id: 'row-reset', file: 'sweep.wav', start: 2.63, visualPeak: 2.92, role: 'Camera reset to second question line' },
  { id: 'photo-to-salary', file: 'zoom.wav', start: 7.17, visualPeak: 7.46, role: 'Zoom into first photo and reveal next photo' },
  { id: 'photo-to-interview', file: 'sweep.wav', start: 9.92, visualPeak: 10.21, role: 'Second photo handoff' },
  { id: 'context-pullback', file: 'zoom.wav', start: 12.74, visualPeak: 13.03, role: 'Photo opens to the comparison message' },
  { id: 'closing-pullback', file: 'sweep.wav', start: 17.33, visualPeak: 17.62, role: 'Whole closing phrase settles' },
]
const inputs = ['-i', path('music-bed.wav')]
for (const cue of cues) inputs.push('-i', path(cue.file))
const filters = cues.map((cue, index) => `[${index + 1}:a]adelay=${Math.round(cue.start * 1000)}|${Math.round(cue.start * 1000)},apad=whole_len=960000,atrim=duration=20[s${index}]`)
filters.push(`[0:a]${cues.map((_, i) => `[s${i}]`).join('')}amix=inputs=6:duration=first:dropout_transition=0,volume=6,loudnorm=I=-17:TP=-1.5:LRA=7,atrim=duration=20,afade=t=out:st=19.5:d=0.5[mix]`)
await command([...inputs, '-filter_complex', filters.join(';'), '-map', '[mix]', '-ar', '48000', '-ac', '2', path('mix.wav')])
const analysis = await command(['-i', path('mix.wav'), '-af', 'loudnorm=I=-17:TP=-1.5:LRA=7:print_format=json', '-f', 'null', '-'])
const json = analysis.stderr.match(/\{\s*"input_i"[\s\S]*?\}/)?.[0]
const loudness = json ? JSON.parse(json) : null
const probe = JSON.parse((await run(ffprobe.path, ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', path('mix.wav')], { windowsHide: true })).stdout)
const manifest = { duration: 20, sampleRate: 48000, channels: 2, voiceover: false, music: { title: 'Tech House vibes', artist: 'Alejandro Magaña (A. M.)', source: 'https://mixkit.co/free-stock-music/electronica/', download: 'https://assets.mixkit.co/music/130/130.mp3', license: 'https://mixkit.co/license/modal/musicFree/', sourceTrim: [8, 28], path: 'assets/revision-20s/music-bed.wav' }, cues, sources: [{ title: 'Fast small sweep transition', url: 'https://assets.mixkit.co/active_storage/sfx/166/166.wav', license: 'https://mixkit.co/license/modal/sfxFree/' }, { title: 'Air zoom vacuum', url: 'https://assets.mixkit.co/active_storage/sfx/2608/2608.wav', license: 'https://mixkit.co/license/modal/sfxFree/' }], loudness, audibleReview: 'Not yet auditioned; timings and levels are proposed and technically measured.', renderedDuration: probe.format.duration }
await writeFile(new URL('../../docs/video/audio-manifest.json', import.meta.url), JSON.stringify(manifest, null, 2))
console.log(JSON.stringify({ duration: probe.format.duration, channels: 2, loudness, cues: cues.length }, null, 2))
