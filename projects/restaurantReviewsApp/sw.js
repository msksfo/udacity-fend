// Global Variables 

let cacheName = 'cache-v1';

let cachedFiles = [
    '/',
    'css/styles.css',
    'index.html',
    'restaurant.html',
    'js/restaurant_info.js',
    'data/restaurants.json',
    'js/dbhelper.js',
    'js/index.js',
    'js/main.js',
    'img/apc.jpg',
    'img/haf.jpg',
    'img/haf2.jpg',
    'img/haf3.jpg',
    'img/harrisRanchAirport.jpg',
    'img/hwd.jpg',
    'img/lvk.jpg',
    'img/paloalto.jpg',
    'img/petaluma.jpg',
    'img/pasoRobles.jpg',
    'img/salinas.jpg',
    'img/sql.jpg',
    'img/shelterCove.jpg',
    'img/sts2.jpg',
    'img/wvi.jpg'
];


/* service worker install event */
self.addEventListener('install', function(event){
    // use the install event to cache everything needed to load the page

   //make the install event wait until this promise is resolved
   event.waitUntil(
       // open the cache 
       caches.open(cacheName).then(function(cache) {

           // add all files needed for offline viewing of the app
           return cache.addAll(cachedFiles);

       }).catch(function(err) {
           console.log('Error: ', err);
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

    event.waitUntil(
        // loop through the cache and remove anything that corresponds to a cache name that is not this cache name

        caches.keys().then(function(cacheNames){ // all the cache names
            return Promise.all(cacheNames.map(function(thisCacheName) {
                // loop through everything in the cache. get this specific cache

                if (thisCacheName !== cacheName) {

                    return caches.delete(thisCacheName);
                }
            }))

        })
    )
});

