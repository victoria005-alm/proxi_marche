import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import vm from 'node:vm'

const handlers = {}
const entries = new Map()
const deleted = []
let claimed = false
let skipped = false
const scope = 'https://proxi.example/'
const cache = {
  async addAll(urls) {
    for (const url of urls) {
      assert.ok(existsSync(`dist${url}`), `Missing precached asset: ${url}`)
      entries.set(new URL(url, scope).href, new Response(readFileSync(`dist${url}`)))
    }
  },
  async match(request) { return entries.get(typeof request === 'string' ? request : request.url)?.clone() },
}
vm.runInNewContext(readFileSync('dist/sw.js', 'utf8'), {
  URL, Set, Promise,
  self: {
    registration: { scope }, location: new URL(`${scope}sw.js`),
    clients: { async claim() { claimed = true } },
    skipWaiting() { skipped = true },
    addEventListener(name, handler) { handlers[name] = handler },
  },
  caches: {
    async open() { return cache },
    async keys() { return [`proximarche:${scope}:old`, 'another-app'] },
    async delete(key) { deleted.push(key) },
  },
  fetch() { throw new Error('Offline: network must not be used for the app shell') },
})
let pending
handlers.install({ waitUntil(promise) { pending = promise } })
await pending
handlers.activate({ waitUntil(promise) { pending = promise } })
await pending
assert.ok(claimed)
assert.deepEqual(deleted, [`proximarche:${scope}:old`])
handlers.fetch({ request: { url: `${scope}client/recherche`, method: 'GET', mode: 'navigate' }, respondWith(promise) { pending = promise } })
assert.match(await (await pending).text(), /<div id="root">/)
let intercepted = false
handlers.fetch({ request: { url: `${scope}api/account`, method: 'GET' }, respondWith() { intercepted = true } })
assert.equal(intercepted, false)
handlers.message({ data: { type: 'SKIP_WAITING' } })
assert.ok(skipped)
const manifest = JSON.parse(readFileSync('dist/manifest.webmanifest', 'utf8'))
assert.equal(manifest.display, 'standalone')
for (const icon of manifest.icons) assert.ok(existsSync(`dist/${icon.src}`))
console.log('PWA checks passed: precache, offline navigation, cache cleanup, API exclusion, update activation and manifest.')
