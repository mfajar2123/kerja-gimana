import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from '@ffmpeg-installer/ffmpeg'
import { chromium } from '../../node_modules/@playwright/test/index.mjs'

const cwd = dirname(fileURLToPath(import.meta.url))
const regularChrome = chromium.executablePath()
const revision = basename(dirname(dirname(regularChrome))).replace('chromium-', '')
const headlessShell = join(dirname(dirname(dirname(regularChrome))), `chromium_headless_shell-${revision}`, 'chrome-headless-shell-win64', 'chrome-headless-shell.exe')
const env = {
  ...process.env,
  HYPERFRAMES_NO_TELEMETRY: '1',
  HYPERFRAMES_NO_UPDATE_CHECK: '1',
  HYPERFRAMES_BROWSER_PATH: existsSync(headlessShell) ? headlessShell : regularChrome,
  HYPERFRAMES_FFMPEG_PATH: ffmpeg.path,
}
try {
  const { default: ffprobe } = await import('@ffprobe-installer/ffprobe')
  env.HYPERFRAMES_FFPROBE_PATH = ffprobe.path
} catch { /* The static composition's browser checks do not require FFprobe. */ }
const child = spawn(process.execPath, ['node_modules/hyperframes/bin/hyperframes.mjs', ...process.argv.slice(2)], {
  cwd, env, stdio: 'inherit', windowsHide: true,
})
child.on('error', error => { console.error(error.message); process.exitCode = 1 })
child.on('exit', code => { process.exitCode = code ?? 1 })
