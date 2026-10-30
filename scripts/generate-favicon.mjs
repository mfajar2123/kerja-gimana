import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'

// Render the existing 64px brand mark at 3x and downsample for clean favicon edges.
const outputSize = 96
const scale = 3
const size = outputSize * scale
const rows = Array.from({ length: size }, () => Array.from({ length: size }, () => [0, 0, 0, 255]))
const polygon = [
  [15, 15], [23, 15], [23, 27], [35, 15], [46, 15], [29, 31],
  [46, 49], [35, 49], [23, 36], [23, 49], [15, 49],
].map(([x, y]) => [x * scale * 1.5, y * scale * 1.5])

function containsPoint(x, y) {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    if (containsPoint(x + 0.5, y + 0.5)) rows[y][x] = [255, 255, 255, 255]
    if (x >= 49 * scale * 1.5 && x < 57 * scale * 1.5 && y >= 42 * scale * 1.5 && y < 50 * scale * 1.5) {
      rows[y][x] = [255, 0, 0, 255]
    }
  }
}

const pixels = Buffer.alloc(outputSize * outputSize * 4)
for (let y = 0; y < outputSize; y++) {
  for (let x = 0; x < outputSize; x++) {
    const totals = [0, 0, 0, 0]
    for (let dy = 0; dy < scale; dy++) {
      for (let dx = 0; dx < scale; dx++) {
        const color = rows[y * scale + dy][x * scale + dx]
        for (let c = 0; c < 4; c++) totals[c] += color[c]
      }
    }
    const offset = (y * outputSize + x) * 4
    for (let c = 0; c < 4; c++) pixels[offset + c] = Math.round(totals[c] / (scale * scale))
  }
}

const crcTable = Array.from({ length: 256 }, (_, n) => {
  let value = n
  for (let bit = 0; bit < 8; bit++) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1
  return value >>> 0
})

function crc32(buffer) {
  let value = 0xffffffff
  for (const byte of buffer) value = crcTable[(value ^ byte) & 0xff] ^ (value >>> 8)
  return (value ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const name = Buffer.from(type)
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const checksum = Buffer.alloc(4)
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])))
  return Buffer.concat([length, name, data, checksum])
}

const scanlines = Buffer.alloc(outputSize * (outputSize * 4 + 1))
for (let y = 0; y < outputSize; y++) {
  const rowStart = y * (outputSize * 4 + 1)
  scanlines[rowStart] = 0
  pixels.copy(scanlines, rowStart + 1, y * outputSize * 4, (y + 1) * outputSize * 4)
}

const header = Buffer.alloc(13)
header.writeUInt32BE(outputSize, 0)
header.writeUInt32BE(outputSize, 4)
header[8] = 8 // bit depth
header[9] = 6 // RGBA
writeFileSync(new URL('../public/favicon.png', import.meta.url), Buffer.concat([
  Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
  chunk('IHDR', header),
  chunk('IDAT', deflateSync(scanlines)),
  chunk('IEND', Buffer.alloc(0)),
]))
