// Service Worker

const cacheName = 'v1'

const resources = [
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
    '/static/dist/fontawesome/js/all.min.js',
    '/static/dist/fontawesome/webfonts/fa-brands-400.woff2',
    '/static/dist/fontawesome/webfonts/fa-regular-400.woff2',
    '/static/dist/fontawesome/webfonts/fa-solid-900.woff2',
    '/static/dist/jquery/jquery.min.js',
    '/static/dist/js-cookie/js.cookie.min.js',
]

const addResourcesToCache = async (resources) => {
    try {
        console.debug('%c addResourcesToCache:', 'color: Cyan', resources)
        const cache = await caches.open(cacheName)
        await cache.addAll(resources)
    } catch (e) {
        console.warn(`e: ${e.message}`, e)
    }
}

const putInCache = async (request, response) => {
    console.debug(
        '%c putInCache:',
        'color: Yellow',
        `${request.url}`,
        request,
        response
    )
    const cache = await caches.open(cacheName)
    await cache.put(request, response)
}

const cleanupCache = async (event) => {
    console.debug('%c cleanupCache:', 'color: Magenta', event)
    const keys = await caches.keys()
    console.debug('keys:', keys)
    for (const key of keys) {
        if (key !== cacheName) {
            console.log('%c Removing Old Cache:', 'color: Yellow', `${key}`)
            await caches.delete(key)
        }
    }
}

const fetchResponse = async (event) => {
    const responseFromCache = await caches.match(event.request)
    if (responseFromCache?.ok) {
        console.debug(
            `%c responseFromCache:`,
            'color: LimeGreen',
            `${event.request.url}`,
            responseFromCache
        )
        return responseFromCache
    }

    const responseFromNetwork = await fetch(event.request)
    console.debug(
        `%c responseFromNetwork:`,
        'color: OrangeRed',
        `${event.request.url}`,
        responseFromNetwork
    )
    if (responseFromNetwork.ok) {
        // const url = new URL(event.request.url)
        // resources.some((p) => p === url.pathname)
        console.debug('%c checking url:', 'color: Magenta', event.request.url)
        if (event.request.url.includes('/static/')) {
            await putInCache(event.request, responseFromNetwork.clone())
        }
    }
    return responseFromNetwork
}

self.addEventListener('fetch', (event) => {
    event.respondWith(fetchResponse(event))
})

self.addEventListener('install', (event) => {
    console.debug('%c install:', 'color: Cyan', event)
    event.waitUntil(addResourcesToCache(resources))
})

self.addEventListener('activate', (event) => {
    console.debug('%c activate:', 'color: Cyan', event)
    event.waitUntil(cleanupCache(event))
})
