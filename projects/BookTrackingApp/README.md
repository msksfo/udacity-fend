# Udacity Front End Nanodegree Project 6- MyReads

## Project Description
This project was built as part of the Udacity FrontEnd Nanodegree curriculum. I was given starter code by Udacity as a template for a static HTML and CSS site. I refactored the code into an interactive React application that allows users to organize by shelf, books that they are currently reading, want to read, and have read.

## Project Dependencies
* react
* react-dom
* react-router-dom
* prop-types
* sort-by
* escape-string-regexp

## Launch the app in your browser:
* clone or download this repo
* install all project dependencies with `npm install`
* run `npm start` in the project root directory to start the development server and launch the   app in the browser window

## Live link
Don't feel like bothering with installation? Click here https://msksfo.github.io/UdacityFEND-myReads/

## Use the app
The main page has three bookshelves: currently reading, want to read, and read. Each book shelved there has a control on the bottom right hand corner that allows you to move the book to another shelf or remove it from the page altogether (shelf 'none').

There is green circle with an '+' icon fixed to the bottom right hand corner of the main page. Click this if you would like to search for more books to add to your bookshelves. Input your search query at the top, where it says 'Search by title or author'. The books returned from the search will have the same control on the bottom right hand corner of the book as the books on the main page. You may move books to your bookshelves with this control.

To return to the main page, click the arrow next to the search text input field, or hit the browser's back button.


## Search Terms
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

