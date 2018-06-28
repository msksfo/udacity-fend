// register the serice worker

if (!navigator.serviceWorker) return;

window.addEventListener('load', function(){
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        // service worker registration was successful
        console.log('successful registration');
    }, function(err) {
        // registration failed
        console.log(`registration failed with error ${err}`);
    })
});
