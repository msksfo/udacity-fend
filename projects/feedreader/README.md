# Project Overview

This project was completed as part of the Udacity Frontend NanoDegree coursework. 

I was given a web-based application that reads RSS feeds. My job was to write tests, using the jasmine framework, to ensure the code works as expected. The first spec of the first test suite was given to me as an example. The other tests were completed by me. 


## Getting Started

Download or clone the repository. Click index.html and scroll to the bottom of the page to see the jasmine tests. Passing tests will be green. Failing tests will be red. 

# Included tests
The following are the included tests: 

6. Edit the `allFeeds` variable in **./js/app.js** to make the provided test fail and see how Jasmine visualizes this failure in your application.
7. Return the `allFeeds` variable to a passing state.
8. Write a test that loops through each feed in the `allFeeds` object and ensures it has a URL defined and that the URL is not empty.
9. Write a test that loops through each feed in the `allFeeds` object and ensures it has a name defined and that the name is not empty.
10. Write a new test suite named `"The menu"`.
11. Write a test that ensures the menu element is hidden by default. You'll have to analyze the HTML and the CSS to determine how we're performing the hiding/showing of the menu element.
12. Write a test that ensures the menu changes visibility when the menu icon is clicked. This test should have two expectations: does the menu display when clicked and does it hide when clicked again.
13. Write a test suite named `"Initial Entries"`.
14. Write a test that ensures when the `loadFeed` function is called and completes its work, there is at least a single `.entry` element within the `.feed` container.
15. Write a test suite named `"New Feed Selection"`.
16. Write a test that ensures when a new feed is loaded by the `loadFeed` function that the content actually changes.


19. Implement error handling for undefined variables and out-of-bound array access.
