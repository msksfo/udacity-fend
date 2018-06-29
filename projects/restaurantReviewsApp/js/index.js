// register the serice worker when the page is fully loaded IF the browser supports the api

if ('serviceWorker' in navigator){
    window.addEventListener('load', function(){
        navigator.serviceWorker.register('./sw.js')
        .then(function(registration) {
            // service worker registration was successful
            console.log('Successful registration');
        })
        .catch(function(error){
            console.log(`Registration failed with error ${error}`);
        })
    })
    
}


    

