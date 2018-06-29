/* GLobal Variables */

let cacheName = 'cache-v1';
let cachedFiles = [
    '/',
    '/data/restaurants.json',
    '/css/styles.css',
    'index.html',
    'js/index.js',
    'js/main.js',
    'js/dbhelper.js',
    'js/restaurant_info.js',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
]


/* service worker install event */
self.addEventListener('install', function(event){
    // use the install event to cache everything needed to load the page

   //make the install event wait until this promise is resolved
   event.waitUntil(
       // open the cache 
       caches.open('cache-v1').then(function(cache) {

           // add all files needed for offline viewing of the app
           return cache.addAll(cachedFiles);
       })
   );
});

/* service worker fetch event */
self.addEventListener('fetch', function(event) {

    event.respondWith(
        caches.match(event.request)
            .then(function(response){
                // if the response is part of the cache, return it
                if (response) {
                    return response;
                }

            // if the response is NOT part of the cache...

            // clone the request & response, so the new data can be added it to the cache 
            
            let requestClone = event.request.clone();


            return fetch(requestClone) // pass in the cloned request
                .then(function(response) {
                    // check for any problem with the response
                    if (!response) {
                        return response;
                    }

                    // the response was valid, so clone it
                    let responseClone = response.clone();

                    caches.open(cacheName).then(function(cache) {
                        cache.put(event.request, responseClone);
                    });
                    return response;
                })   
            })
    );
});


self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activated');

    event.waitUntil(
        // loop through the cache and remove anything that corresponds to a cache name that is not this cache name

        caches.keys().then(function(cacheNames){ // all the cache names
            return Promise.all(cacheNames.map(function(thisCacheName) {
                // loop through everything in the cache. get this specific cache

                if (thisCacheName !== cacheName) {
                    console.log('[ServiceWorker] Removing Cached Files from this cache name');

                    return caches.delete(thisCacheName);
                }
            }))

        })
    )
})
