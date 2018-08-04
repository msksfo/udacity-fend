import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import * as Quotes from './quotes.json'
import './App.css'

import SearchPage from './components/SearchPage';

import Main from './components/Main';
import Header from './components/Header';
import OpenSearch from './components/OpenSearch';

class BooksApp extends Component {

  constructor(props){
    super(props)
    this.state = {
        books: [],
        query: '',
        searchResults: [],
        quote: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
    this.clearSearchFields = this.clearSearchFields.bind(this)
  }

  // render the initial books to the bookshelves, and quote to the header
  componentDidMount(){
      const firstQuote = this.getNewQuote();

      BooksAPI.getAll().then(books => {
          this.setState({
            books: books,
            quote: firstQuote
          });
      })

  }

  /* Clear the query text and the array of search result books when the user navigates away from the search page */
  clearSearchFields(){
    let clearedQuery = this.state.query.slice();
    clearedQuery = ''

    let clearedArr = this.state.searchResults.slice();
    clearedArr = []

    // put a new quote in the header each time the user returns to the main page
    const newQuote = Object.assign({}, this.getNewQuote())

    this.setState({
      query: clearedQuery,
      searchResults: clearedArr,
      quote: newQuote
    })
  }


  handleChange(e){
    // make a copy of the two arrays of books so as not to modify the state directly
    const currentBooks = this.state.books.slice();
    const searchResultBooks = this.state.searchResults.slice();

    // get the book to be moved, and the shelf the user wants to move the book to
    const chosenShelf = e.target.value;
    const book = e.target.parentElement.parentElement.parentElement;

    BooksAPI.update(book, chosenShelf)
      .then( (data) => {

        // check if the targeted book is already on a bookshelf. If it is- get the index
        let bookMatch = false;
        let matchingIndex;

        currentBooks.some((value, index) => {
          if (value.id === book.id){
            bookMatch = true;
            matchingIndex = index;
          }
        });
        /*
        currentBooks.forEach((value, index) => {
          if (value.id === book.id){
            bookMatch = true;
            matchingIndex = index;
          } else {
            bookMatch = false;
          }
        });
        */


        /* A. If the chosen shelf is 'none', AND the book is already on a bookshelf- delete it           from the array of shelved books.
          B. If the chosen shelf is anything besides 'none', AND the book is already on a         bookshelf- delete that book object and replace it with the one showing the chosen    shelf (the temp book).
          C. Otherwise add the book to the array of shelved books.
        */
        if (bookMatch){
          if (chosenShelf === 'none') {
            currentBooks.splice(matchingIndex, 1);
          }else {
            currentBooks[matchingIndex].shelf = chosenShelf;
          }
        } else {
          // get the array index of the book that triggered the change event
          const searchBookIndex = searchResultBooks.findIndex(value => value.id === book.id);

          // make a temporary book that updates the shelf to the selected option
          const tempBook = Object.assign({}, searchResultBooks[searchBookIndex]);
          tempBook.shelf = chosenShelf;

          // add the temp book to the array of current books
          currentBooks.push(tempBook)
        }

        this.setState( {
          books: currentBooks,
          searchResults: searchResultBooks
        })
      })
      .catch( (err) => console.log('Error: ', err))
  }


  updateQuery(text) {
    // 1. set the state of the query based off of user input
    // 2. search the database for books or authors matching the query
    // 3. loop over the search results to see if the book is already on a bookshelf
    // 4. if it is, keep the shelf assignment, otherwise assign it to shelf 'none'

    this.setState({query: text}, () => {
      if (text) {
        BooksAPI.search(text).then(filteredBooks => {
          if (filteredBooks.length > 0){
            filteredBooks.forEach(filteredBook => {
              let bookMatch = this.state.books.find(value => value.id === filteredBook.id)
              if (bookMatch) {
                filteredBook.shelf = bookMatch.shelf
              } else {
                filteredBook.shelf = 'none'
              }
            })
            this.setState( {searchResults: filteredBooks} )
          }else {
            filteredBooks = [];
            this.setState( {searchResults: filteredBooks} )
          }
        }).catch((err) => console.log('Error: ', err))
      }else {
        // necessary in order for search results to go away as user deletes search text
        this.setState( {searchResults: []} )
      }

    })
  }


  // get a random quote from the quotes json file
  getNewQuote(){
    let quotes = Quotes;
    let randomQuote = Quotes[Math.floor(Math.random() * quotes.length)]
    return randomQuote;
  }


  render() {

    return (
      <div className="app">
        <Route path="/search" render={() => (

          <SearchPage filteredBooks={this.state.searchResults}
                      query={this.state.query}
                      handleClick={this.clearSearchFields}
                      onTextChange={this.updateQuery}
                      handleChange={this.handleChange}
           />

        )} />

        <Route exact path="/"  render={() => (

          <div className="list-books">
            <Header quote={this.state.quote}/>
            <Main onChange={this.handleChange}  books={this.state.books}/>
            <OpenSearch />
          </div>

        )} />
      </div>

    )
  }
}

export default BooksApp
