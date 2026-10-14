import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createServer, request as httpRequest, type Server } from 'node:http'
import { createApp, defineEventHandler, toNodeListener } from 'h3'
import { fetchNodeRequestHandler } from 'node-mock-http'
import { readLimitedJson } from '../../server/utils/request-body'
import { validatedBody } from '../../server/utils/validation'
import { loginSchema } from '../../shared/schemas'

const credentials = { email: 'body-probe@example.invalid', password: 'Synthetic test password' }
const app = createApp()
app.use(defineEventHandler(async event => {
  const first = await readLimitedJson(event)
  const second = await validatedBody(event, loginSchema)
  return { cached: first === second || first === event.context.requestJson, email: second.email }
}))
const handler = toNodeListener(app)

function cloudflareRequest(body: Uint8Array, headers: Record<string, string> = {}) {
  // Nitro's Cloudflare adapter buffers Request.arrayBuffer(), then uses this transport.
  return fetchNodeRequestHandler(handler, '/api/auth/login', {
    method: 'POST', headers: { 'content-type': 'application/json', ...headers }, body: Buffer.from(body),
  })
}

describe('JSON request body across production transports', () => {
  it('reads a Cloudflare buffered body without content-length and reuses it for validation', async () => {
    const response = await cloudflareRequest(Buffer.from(JSON.stringify(credentials)))
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ cached: true, email: credentials.email })
  })

  it('rejects malformed JSON and invalid UTF-8 on Cloudflare', async () => {
    for (const bytes of [Buffer.from('{broken'), new Uint8Array([0xff])]) {
      const response = await cloudflareRequest(bytes)
      expect(response.status).toBe(400)
    }
  })

  it('rejects buffered payloads above 32 KiB even when content-length understates their size', async () => {
    const bytes = Buffer.from(JSON.stringify({ ...credentials, padding: 'a'.repeat(32768) }))
    for (const headers of [{}, { 'content-length': '2' }]) {
      const response = await cloudflareRequest(bytes, headers)
      expect(response.status).toBe(413)
    }
  })

  it('continues rejecting genuinely missing or invalid fields', async () => {
    for (const value of [{}, { email: credentials.email, password: '' }]) {
      const response = await cloudflareRequest(Buffer.from(JSON.stringify(value)))
      expect(response.status).toBe(422)
    }
  })

  describe('native Node stream', () => {
    let server: Server
    let port: number
    beforeAll(async () => {
      server = createServer(handler)
      await new Promise<void>(resolve => server.listen(0, '127.0.0.1', resolve))
      const address = server.address()
      if (!address || typeof address === 'string') throw new Error('Missing test server port')
      port = address.port
    })
    afterAll(async () => {
      if (server) await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve()))
    })

    function streamBody(chunks: Uint8Array[]) {
      return new Promise<{ status: number; body: string }>((resolve, reject) => {
        const request = httpRequest({ hostname: '127.0.0.1', port, path: '/api/auth/login', method: 'POST', headers: { 'content-type': 'application/json' } }, response => {
          let body = ''
          response.setEncoding('utf8')
          response.on('data', chunk => { body += chunk })
          response.on('end', () => resolve({ status: response.statusCode!, body }))
          response.on('error', reject)
        })
        request.on('error', reject)
        for (const chunk of chunks) request.write(chunk)
        request.end()
      })
    }

    it('reads chunked JSON and caches it for validation', async () => {
      const body = Buffer.from(JSON.stringify(credentials))
      const response = await streamBody([body.subarray(0, 15), body.subarray(15)])
      expect(response.status).toBe(200)
      expect(JSON.parse(response.body)).toEqual({ cached: true, email: credentials.email })
    })

    it('rejects oversized chunked JSON without relying on content-length', async () => {
      const response = await streamBody([Buffer.from('{"padding":"'), Buffer.alloc(32768, 97), Buffer.from('"}')])
      expect(response.status).toBe(413)
    })
  })
})
