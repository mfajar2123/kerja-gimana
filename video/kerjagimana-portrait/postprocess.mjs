import { createRequire } from 'node:module'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import { fileURLToPath } from 'node:url'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import ffmpeg from '../kerjagimana/node_modules/@ffmpeg-installer/ffmpeg/index.js'
import ffprobe from '../kerjagimana/node_modules/@ffprobe-installer/ffprobe/index.js'
const run=promisify(execFile)
const require=createRequire(new URL('../kerjagimana/package.json',import.meta.url))
const sharp=createRequire(require.resolve('hyperframes/package.json'))('sharp')
const out=new URL('../../artifacts/video/',import.meta.url)
const input=fileURLToPath(new URL('kerjagimana-portrait-20s-genz.mp4',out))
await mkdir(new URL('review-portrait/',out),{recursive:true})
const command=args=>run(ffmpeg.path,['-v','error',...args],{windowsHide:true,maxBuffer:4*1024*1024})
await command(['-i',input,'-f','null','-'])
await command(['-i',input,'-vf',"select='eq(n,42)+eq(n,132)+eq(n,195)+eq(n,276)+eq(n,354)+eq(n,444)+eq(n,529)+eq(n,570)',scale=270:480,tile=4x2",'-frames:v','1','-y',fileURLToPath(new URL('render-contact-sheet-portrait.png',out))])
await command(['-ss','19','-i',input,'-frames:v','1','-y',fileURLToPath(new URL('poster-portrait.png',out))])
const times=[17.65,18.1,18.3,18.45,19,599/30],tiles=[]
for(const [index,time]of times.entries()){
  const path=fileURLToPath(new URL(`review-portrait/delivered-${time.toFixed(3)}.png`,out))
  await command(['-ss',String(time),'-i',input,'-frames:v','1','-y',path])
  tiles.push({input:await sharp(path).resize(270,480).png().toBuffer(),left:(index%3)*270,top:Math.floor(index/3)*480})
}
await sharp({create:{width:810,height:960,channels:3,background:'#000'}}).composite(tiles).png().toFile(fileURLToPath(new URL('review-portrait/delivered-closing-strip.png',out)))
const reportFile=new URL('render-report-portrait.json',out)
const report=JSON.parse(await readFile(reportFile,'utf8'))
const metadata=JSON.parse((await run(ffprobe.path,['-v','error','-show_streams','-of','json',input],{windowsHide:true})).stdout)
const audio=metadata.streams.find(s=>s.codec_type==='audio')
const analysis=await run(ffmpeg.path,['-hide_banner','-i',input,'-vn','-af','loudnorm=I=-17:TP=-1.5:LRA=7:print_format=json','-f','null','-'],{windowsHide:true,maxBuffer:4*1024*1024})
const loudness=analysis.stderr.match(/\{\s*"input_i"[\s\S]*?\}/)?.[0]
const hash=async video=>(await command(['-i',video,'-map','0:a:0','-f','hash','-hash','sha256','-'])).stdout.trim()
const previous=fileURLToPath(new URL('kerjagimana-horizontal-20s-genz.mp4',out))
const decodedSha256=await hash(input),landscapeDecodedSha256=await hash(previous)
if(decodedSha256!==landscapeDecodedSha256)throw new Error('Portrait audio differs from the approved landscape version.')
report.fullDecodePassed=true
report.audio={codec:audio.codec_name,channels:audio.channels,sampleRate:audio.sample_rate,duration:audio.duration,measuredLoudness:loudness?JSON.parse(loudness):null,decodedSha256,landscapeDecodedSha256,identicalToLandscape:true,directlyAuditioned:false}
report.poster='artifacts/video/poster-portrait.png'
report.decodedFrameContactSheet='artifacts/video/render-contact-sheet-portrait.png'
report.decodedClosingStrip='artifacts/video/review-portrait/delivered-closing-strip.png'
await writeFile(reportFile,JSON.stringify(report,null,2))
console.log('Portrait full decode passed; stereo audio is identical to landscape. Poster and decoded frame review saved.')
