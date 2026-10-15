import { spawn } from 'node:child_process'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import ffprobe from '../kerjagimana/node_modules/@ffprobe-installer/ffprobe/index.js'
const cwd = dirname(fileURLToPath(import.meta.url))
const output = fileURLToPath(new URL('../../artifacts/video/kerjagimana-portrait-20s-genz.mp4', import.meta.url))
const run = (program,args,capture=false) => new Promise((resolve,reject) => {
  const child=spawn(program,args,{ cwd,windowsHide:true,stdio:capture?['ignore','pipe','inherit']:'inherit' })
  let stdout=''
  if(capture)child.stdout.on('data',chunk=>{stdout+=chunk})
  child.on('error',reject)
  child.on('exit',code=>code===0?resolve(stdout):reject(new Error(`${program} exited with ${code}`)))
})
await run(process.execPath,['prepare-assets.mjs'])
await mkdir(dirname(output),{recursive:true})
await run(process.execPath,['tools.mjs','usage','--json'])
await run(process.execPath,['tools.mjs','render','--output',output,'--fps','30','--quality','delivery','--workers','2','--strict'])
const metadata=JSON.parse(await run(ffprobe.path,['-v','error','-show_format','-show_streams','-of','json',output],true))
const video=metadata.streams.filter(s=>s.codec_type==='video'),audio=metadata.streams.filter(s=>s.codec_type==='audio')
if(video.length!==1||audio.length!==1)throw new Error('Expected one video and one audio stream.')
const s=video[0]
if(s.width!==1080||s.height!==1920||s.avg_frame_rate!=='30/1'||s.pix_fmt!=='yuv420p'||s.codec_name!=='h264')throw new Error('Unexpected portrait video format.')
if(Math.abs(Number(metadata.format.duration)-20)>1/30||Number(s.nb_frames)!==600)throw new Error('Expected 20 seconds / 600 frames.')
if(audio[0].codec_name!=='aac'||audio[0].channels!==2||audio[0].sample_rate!=='48000')throw new Error('Unexpected audio format.')
const report={output,bytes:(await stat(output)).size,width:s.width,height:s.height,aspectRatio:'9:16',fps:s.avg_frame_rate,frames:s.nb_frames,duration:metadata.format.duration,codec:s.codec_name,pixelFormat:s.pix_fmt,audioStreams:audio.length}
await writeFile(new URL('../../artifacts/video/render-report-portrait.json',import.meta.url),JSON.stringify(report,null,2))
console.log(JSON.stringify(report,null,2))
