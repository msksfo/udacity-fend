/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are within the $() function, to ensure the DOM is ready 
 * before the tests are run
 */
$(function() {
    // test ensures allFeeds is defined, and has at least one feed
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        
         it('have defined urls', function(){
           allFeeds.forEach(feed => expect(feed.url).toBeTruthy());
         });


        /* test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have defined names', function(){
            allFeeds.forEach(feed => expect(feed.name).toBeTruthy());
         });
    });


    describe('The menu', function(){
        // test ensures the menu element is hidden by default.        
        let icon = document.querySelector('.menu-icon-link');
        let body = document.querySelector('body');
        
        it('is initially hidden', function(){ 
            expect(body.classList.contains('menu-hidden')).toBe(true);        
        });

        /* test ensures the menu toggles
          * visibility when the menu icon is clicked. 
          */
        it ('toggles visibility on click', function(){  
           icon.click();
           expect(body.classList.contains('menu-hidden')).toBe(false);    

           icon.click();
           expect(body.classList.contains('menu-hidden')).toBe(true);    
        });
    });
        

    describe('Initial Entries', function(){
        /* test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
       
         
         beforeEach(function(done){
           loadFeed(0, done);
         });

        
        it('will contain at least one entry', function(done){
            let feedLength = document.querySelector('.feed').children.length;
            expect(feedLength).not.toBe(0);
            done();
        });
    });
        

    describe('New Feed Selection', function(){
        /* test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
    
        let firstEntry;
        let secondEntry;

         beforeEach(function(done){   
             // load the first feed       
            loadFeed(0, function(){
                // get the first entry of the first feed
                firstEntry = document.querySelector('.feed').children[0].innerText;
                
                // load the second feed
                loadFeed(1, done);
            });           
         });

        it('changes the feed content', function(done){
            // get the first entry of the second feed
            secondEntry = document.querySelector('.feed').children[0].innerText;

            // compare the first entry of the first and second feed
            expect(firstEntry).not.toEqual(secondEntry);
            done();
        });
    });
        
}());
