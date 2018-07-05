# FEND project 5- The Flying Foodie

## Project Overview

This is a restaurant reviews app in the spirit of the $100 hamburger. I was given starter code by Udacity of a static design that lacked accessibility. I converted the design to be responsive on different sized displays and accessible for screen reader use. I also added a service worker to begin the process of creating a seamless offline experience for the users.

Although certainly usable by anyone, the app is geared toward pilots. The list of restaurants can be filtered by airport, or by cuisine type. The detail view of each restaurant lists the hours of service, as well as the most recent reviews of that restaurant. 


## Dependencies 

* leaflet.js
* Google Fonts

### Getting Started

* Clone or download the repository.  In the root folder of the project, start up a simple HTTP server to serve up the site files on your local computer. Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 

* In a terminal, check the version of Python you have: `python -V`. If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

* With the server running, visit the site: `http://localhost:8000` to see the app in action.

## Code Navigation 

* index.js is where the service worker is registered
* sw.js holds the initial cached files and the service worker install, fetch, and activate events
* dbhelper.js contains common database helper functions
* main.js contains the code to fetch airports and cuisines as soon as the page is loaded
* restaurants.json contains all data for the restaurant info/reviews/map coords
* restaurant_info.js creates the restaurant and reveiw html and adds it to the page, and centers the map on the restaurant


## Photo credits:

* APC - Bruno Mendonca
* HAF - (haf2.jpg) Andre Taube
* HWD, SQL, O69, Two Niner Diner - Alex Esguerra
* PRB, SNS - Mary Medeiros McEnroe
* STS - Amber Lee Gray
* WVI - Kurt Thams
* 3O8 - Liezel Taube
* all others taken by me or downloaded from unsplash

## Application link 

https://msksfo.github.io/udacity-fend/projects/restaurantReviewsApp/



