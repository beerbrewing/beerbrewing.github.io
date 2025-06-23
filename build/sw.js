/**
 * Service Worker for Pyrmont Brewery
 */

const CACHE_NAME = 'pyrmontbrewery-cache-v1';
const MEDIA_CACHE_NAME = 'pyrmontbrewery-media-v1';

// Resources to cache on install
const PRECACHE_URLS = [
    '/',
    '/build/player.html',
    '/build/bundle.js'
];

// Install event - precache static assets
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    const currentCaches = [CACHE_NAME, MEDIA_CACHE_NAME];

    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
            })
            .then(cachesToDelete => {
                return Promise.all(cachesToDelete.map(cacheToDelete => {
                    return caches.delete(cacheToDelete);
                }));
            })
            .then(() => self.clients.claim())
    );
});

// Fetch event - network first for media, cache first for others
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);

    // Special handling for media files
    if (isMediaRequest(event.request)) {
        event.respondWith(handleMediaRequest(event.request));
        return;
    }

    // For non-media requests, use cache-first strategy
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return fetch(event.request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response before returning it
                        const responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
    );
});

// Handle media file requests with special caching strategy
async function handleMediaRequest(request) {
    // Try from cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
        return cachedResponse;
    }

    // If not in cache, fetch from network
    try {
        const response = await fetch(request);

        // Cache the response for future use
        if (response.status === 200) {
            const responseToCache = response.clone();
            const cache = await caches.open(MEDIA_CACHE_NAME);
            cache.put(request, responseToCache);
        }

        return response;
    } catch (error) {
        console.error('Error fetching media:', error);
        return new Response('Media fetch failed', { status: 504 });
    }
}

// Check if a request is for media content
function isMediaRequest(request) {
    const url = new URL(request.url);

    // Check file extension or content-type if available
    const mediaExtensions = ['.mp4', '.webm', '.ogg', '.m4v', '.mov'];
    const isMediaExtension = mediaExtensions.some(ext => url.pathname.endsWith(ext));

    // Also consider blob URLs which might be media
    const isBlobUrl = url.protocol === 'blob:';

    return isMediaExtension || isBlobUrl;
}

// Listen for messages from the main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CACHE_MEDIA') {
        const { url } = event.data;

        event.waitUntil(
            fetch(url)
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    return caches.open(MEDIA_CACHE_NAME);
                })
                .then(cache => {
                    return cache.add(url);
                })
                .then(() => {
                    self.clients.matchAll().then(clients => {
                        clients.forEach(client => {
                            client.postMessage({
                                type: 'MEDIA_CACHED',
                                url
                            });
                        });
                    });
                })
                .catch(error => {
                    console.error('Failed to cache media:', error);
                })
        );
    }
});
