# Project Overview
This project was completed as part of the Udacity Frontend NanoDegree coursework. 

I was given a web-based application that reads RSS feeds. My job was to write tests, using the jasmine framework, to ensure the code works as expected. The first spec of the first test suite was given to me as an example. The other tests were completed by me. 


## Getting Started
Download or clone the repository. Click index.html and scroll to the bottom of the page to see the jasmine tests. Passing tests will be green. Failing tests will be red. 


## Included tests
The following are the included tests: 

1. Test ensures `allFeeds` is defined and has a length greater than 0
2. Test loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
3. Test loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.
4. Test ensures the menu element is hidden by default. 
5. Test ensures the menu toggles visibility when the menu icon is clicked.
6. Test ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
7. Test ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.
