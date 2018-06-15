/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('have defined urls', function(){
            for (let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].url).toBeTruthy();
            }
         });


        /* test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('have defined names', function(){
            for (let i = 0; i < allFeeds.length; i++){
                expect(allFeeds[i].name).toBeTruthy();
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
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
        

        

    /* TODO: Write a new test suite named "Initial Entries" */  
    describe('Initial Entries', function(){
        /* test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
       
         
         beforeEach(function(done){
           loadFeed(0, function(){
               done();
           });
         });

        
        it('will contain at least one entry', function(done){
            let feedLength = document.querySelector('.feed').children.length;
            expect(feedLength).not.toBe(0);
            done();
        });
    });
        

    /* TODO: Write a new test suite named "New Feed Selection" */
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
                loadFeed(1, function(){
                    done();
                });
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
