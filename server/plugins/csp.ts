export default defineNitroPlugin(nitroApp => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    const nonce = event.context.cspNonce
    if (!nonce) return
    for (const key of ['head', 'body', 'bodyAppend'] as const) {
      html[key] = html[key].map(fragment => fragment.replace(/<script(?=[\s>])(?![^>]*\snonce=)/g, `<script nonce="${nonce}"`))
    }
  })
})
