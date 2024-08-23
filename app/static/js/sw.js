// Service Worker

const cacheName = 'v1'

const resources = [
    '/',
    '/news/',
    '/message/',
    '/contact/',

    '/static/css/main.css',
    '/static/bootstrap/bootstrap.css',
    '/static/bootstrap/theme.js',

    '/static/js/forms.js',
    '/static/js/home.js',
    '/static/js/main.js',
    '/static/js/news.js',
    '/static/js/socket.js',
    '/static/js/user.js',

    '/static/images/apple-touch-icon.png',
    '/static/images/avatar.png',
    '/static/images/favicon.ico',
    '/static/images/favicon.svg',

    '/static/dist/bootstrap/bootstrap.bundle.min.js',
    '/static/dist/clipboard/clipboard.min.js',
    '/static/dist/fontawesome/css/all.min.css',
    '/static/dist/fontawesome/webfonts/fa-brands-400.woff2',
    '/static/dist/fontawesome/webfonts/fa-regular-400.woff2',
    '/static/dist/fontawesome/webfonts/fa-solid-900.woff2',
    '/static/dist/jquery/jquery.min.js',
    '/static/dist/js-cookie/js.cookie.min.js',
]

const excludes = ['/admin', '/flower', '/phpmyadmin', '/redis', '/ws']

const addResourcesToCache = async (resources) => {
    console.debug('%c addResourcesToCache:', 'color: Cyan', resources)
    try {
        const cache = await caches.open(cacheName)
        await cache.addAll(resources)
    } catch (e) {
        console.error(`cache.addAll error: ${e.message}`, e)
    }
}

const putInCache = async (request, response) => {
    console.debug('%c putInCache:', 'color: Khaki', `${request.url}`)
    try {
        const cache = await caches.open(cacheName)
        await cache.put(request, response)
    } catch (e) {
        console.error(`cache.put error: ${e.message}`, e)
    }
}

const cleanupCache = async (event) => {
    console.debug('%c cleanupCache:', 'color: Coral', event)
    const keys = await caches.keys()
    console.debug('keys:', keys)
    for (const key of keys) {
        if (key !== cacheName) {
            console.log('%c Removing Old Cache:', 'color: Yellow', `${key}`)
            try {
                await caches.delete(key)
            } catch (e) {
                console.error(`caches.delete error: ${e.message}`, e)
            }
        }
    }
}

const cacheFirst = async (event) => {
    // console.debug('%ccacheFirst:', 'color: Aqua', event.request.url)

    const responseFromCache = await caches.match(event.request)
    if (responseFromCache?.ok) {
        return responseFromCache
    }

    try {
        const responseFromNetwork = await fetch(event.request)
        if (responseFromNetwork?.ok) {
            await putInCache(event.request, responseFromNetwork.clone())
        }
        return responseFromNetwork
    } catch (e) {
        console.debug(`fetch error: ${e.message}`, 'color: OrangeRed')
    }

    console.debug('%cNo Cache or Network:', 'color: Red', event.request.url)
    return new Response('No Cache or Network Available', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
    })
}

const networkFirst = async (event) => {
    // console.debug('%cnetworkFirst:', 'color: Coral', event.request.url)

    try {
        const responseFromNetwork = await fetch(event.request)
        if (responseFromNetwork?.ok) {
            // await putInCache(event.request, responseFromNetwork.clone())
            putInCache(event.request, responseFromNetwork.clone()).then()
            return responseFromNetwork
        }
    } catch (e) {
        console.debug(`fetch error: ${e.message}`, 'color: OrangeRed')
    }

    const responseFromCache = await caches.match(event.request)
    if (responseFromCache?.ok) {
        return responseFromCache
    }

    console.debug('%cNo Network or Cache:', 'color: Red', event.request.url)
    return new Response('No Network or Cache Available', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
    })
}

async function fetchResponse(event) {
    // console.debug('fetchResponse:', event.request)
    const url = new URL(event.request.url)
    // console.debug('url:', url)
    if (
        event.request.method !== 'GET' ||
        self.location.origin !== url.origin ||
        excludes.some((e) => url.pathname.startsWith(e))
    ) {
        console.debug('%cExcluded Request:', 'color: Yellow', event.request.url)
        return
    }
    if (url.pathname.startsWith('/static/')) {
        return event.respondWith(cacheFirst(event))
    }
    return event.respondWith(networkFirst(event))
}

self.addEventListener('fetch', fetchResponse)

self.addEventListener('install', (event) => {
    console.debug('%c install:', 'color: Cyan', event)
    self.skipWaiting()
    event.waitUntil(addResourcesToCache(resources))
})

self.addEventListener('activate', (event) => {
    console.debug('%c activate:', 'color: Cyan', event)
    event.waitUntil(cleanupCache(event))
})
