import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join, basename } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffmpeg from '../kerjagimana/node_modules/@ffmpeg-installer/ffmpeg/index.js'
import ffprobe from '../kerjagimana/node_modules/@ffprobe-installer/ffprobe/index.js'
import { chromium } from '../../node_modules/@playwright/test/index.mjs'
const cwd = dirname(fileURLToPath(import.meta.url))
const regularChrome = chromium.executablePath()
const revision = basename(dirname(dirname(regularChrome))).replace('chromium-', '')
const shell = join(dirname(dirname(dirname(regularChrome))), `chromium_headless_shell-${revision}`, 'chrome-headless-shell-win64', 'chrome-headless-shell.exe')
const child = spawn(process.execPath, [fileURLToPath(new URL('../kerjagimana/node_modules/hyperframes/bin/hyperframes.mjs', import.meta.url)), ...process.argv.slice(2)], {
  cwd, windowsHide: true, stdio: 'inherit', env: { ...process.env, HYPERFRAMES_NO_TELEMETRY: '1', HYPERFRAMES_NO_UPDATE_CHECK: '1', HYPERFRAMES_BROWSER_PATH: existsSync(shell) ? shell : regularChrome, HYPERFRAMES_FFMPEG_PATH: ffmpeg.path, HYPERFRAMES_FFPROBE_PATH: ffprobe.path },
})
child.on('error', error => { console.error(error.message); process.exitCode = 1 })
child.on('exit', code => { process.exitCode = code ?? 1 })
