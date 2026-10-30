import { createError, readRawBody, type H3Event } from 'h3'

export async function readLimitedJson(event: H3Event, limit = 32768): Promise<unknown> {
  if (Object.hasOwn(event.context, 'requestJson')) return event.context.requestJson
  const chunks: Uint8Array[] = []
  let size = 0
  const tooLarge = () => createError({ statusCode: 413, statusMessage: 'Isian terlalu panjang.' })
  function append(chunk: Uint8Array) {
    size += chunk.byteLength
    if (size > limit) throw tooLarge()
    chunks.push(chunk)
  }
  const request = event.node.req
  // Nitro's Cloudflare adapter does not forward DELETE bodies to its mock Node
  // request. The original request remains available on the platform context.
  const cloudflareRequest = event.method === 'DELETE' ? event.context._platform?.cloudflare?.request as Request | undefined : undefined
  const webBody = event.web?.request?.body ?? cloudflareRequest?.body
  if (webBody) {
    const reader = webBody.getReader()
    try {
      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        append(value)
      }
    } catch (error) { void reader.cancel().catch(() => {}); throw error }
    finally { reader.releaseLock() }
  } else if ('body' in request || 'rawBody' in request || Symbol.for('h3RawBody') in request) {
    // Nitro's Cloudflare localFetch supplies a buffered body on an already-ended
    // mock Node request. H3 reads that buffer; listening for stream data loses it.
    const bufferedBody = await readRawBody(event, false)
    if (bufferedBody) append(bufferedBody)
  } else {
    if (!request.readableEnded) await new Promise<void>((resolve, reject) => {
      function cleanup() { request.off('data', onData); request.off('end', onEnd); request.off('error', onError); request.off('aborted', onAborted) }
      function onData(chunk: Uint8Array) {
        try { append(chunk) } catch (error) { cleanup(); request.resume(); reject(error) }
      }
      function onEnd() { cleanup(); resolve() }
      function onError(error: Error) { cleanup(); reject(error) }
      function onAborted() { cleanup(); reject(createError({ statusCode: 400, statusMessage: 'Permintaan terputus.' })) }
      request.on('data', onData).once('end', onEnd).once('error', onError).once('aborted', onAborted)
    })
  }
  const bytes = new Uint8Array(size)
  let offset = 0
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength }
  try { event.context.requestJson = size ? JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes)) : undefined }
  catch { throw createError({ statusCode: 400, statusMessage: 'JSON tidak valid.' }) }
  return event.context.requestJson
}
