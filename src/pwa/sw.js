const VERSION = '__VERSION__'
const PRECACHE = __PRECACHE__
const PREFIX = `proximarche:${self.registration.scope}:`
const CACHE = `${PREFIX}${VERSION}`
const shell = new URL('index.html', self.registration.scope).href
const assets = new Set(PRECACHE.map((url) => new URL(url, self.location).href))

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
})
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys()
    await Promise.all(keys.filter((key) => key.startsWith(PREFIX) && key !== CACHE).map((key) => caches.delete(key)))
    await self.clients.claim()
  })())
})
self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})
self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return
  // Only the app shell and build assets are cached; API and account data stay on the network.
  if (request.mode === 'navigate' && url.href.startsWith(self.registration.scope)) {
    event.respondWith(caches.open(CACHE).then((cache) => cache.match(shell)).then((cached) => cached || fetch(request)))
  } else if (assets.has(url.href)) {
    event.respondWith(caches.open(CACHE).then((cache) => cache.match(request)).then((cached) => cached || fetch(request)))
  }
})
