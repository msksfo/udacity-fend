import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
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
        searchResults: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
    this.clearSearchFields = this.clearSearchFields.bind(this)

    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  componentDidMount(){
      BooksAPI.getAll().then(books => {
          this.setState({books})
      })
  }

  /* Clear the query text and the array of search result books when the user navigates away from the search page */
  clearSearchFields(){
    let clearedQuery = this.state.query.slice();
    clearedQuery = ''

    let clearedArr = this.state.searchResults.slice();
    clearedArr = []

    this.setState({
      query: clearedQuery,
      searchResults: clearedArr
    })
  }

  handleChange(e){
    // make a copy of the two arrays of books so as not to modify the state directly
    const currentBooks = this.state.books.slice();
    const searchResultBooks = this.state.searchResults.slice();

    // get the book to be moved, and the shelf the user wants to move the book to
    const chosenShelf = e.target.value;
    const book = e.target.parentElement.parentElement.parentElement;

    // get the array index of the book that triggered the change event
    const currentBookIndex = currentBooks.findIndex(value => value.id === book.id);

    // make a temporary book that updates the shelf to the selected option
    const tempBook = currentBooks[currentBookIndex];
    tempBook.shelf = chosenShelf;

    /* delete the original book object from the array of bookshelved books. add the temp book object to that array IF the chosen shelf is not 'none'.  */
    if (chosenShelf === 'none'){
      currentBooks.splice(currentBookIndex, 1);
    }else {
      currentBooks.splice(currentBookIndex, 1, tempBook);
    }

    this.setState( {
      books: currentBooks
    })
    console.log(this.state.books)

  }

  

  handleSearchChange(e){
    // make a copy of the two arrays of books so as not to modify the state directly
    const currentBooks = this.state.books.slice();
    const searchResultBooks = this.state.searchResults.slice()

    // get the book and the shelf the user wants to move the book to
    const chosenShelf = e.target.value;
    const book = e.target.parentElement.parentElement.parentElement;
    
    // get the array index of the book that triggered the change event
    const searchBookIndex = searchResultBooks.findIndex(value => value.id === book.id);

    // make a temporary book that updates the shelf to the selected option
    let tempBook = searchResultBooks[searchBookIndex];
    tempBook.shelf = chosenShelf;

    // check if the targeted book is already on a bookshelf. If it is- get the index
    let bookMatch;
    let matchingIndex;

    currentBooks.forEach((value, index) => {
      if (value.id === book.id){
        bookMatch = true;
        matchingIndex = index;
      } else {
        bookMatch = false;
      }
    });

    /* IF the chosen shelf is 'none', AND the book is already on a bookshelf- delete it from the array of shelved books. Otherwise delete it from the array of search results and add the temp book to the array of shelved books.
    */
    if (chosenShelf === 'none' && bookMatch === true){
      currentBooks.splice(matchingIndex, 1);
    } else {
      searchResultBooks.splice(searchBookIndex, 1);
      currentBooks.push(tempBook)
    }

    this.setState( {
      books: currentBooks,
      searchResults: searchResultBooks
    })
      
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
          }
          this.setState( {searchResults: filteredBooks} )
          
        }).catch((err) => console.log('Error: ', err))
      }else {
        // necessary in order for search results to go away as user deletes search text
        this.setState( {searchResults: []} )
      }
      
    })
  }

  
  render() {
    
    return (
      <div className="app">
        <Route path="/search" render={() => (

          <SearchPage filteredBooks={this.state.searchResults}
                      value={this.state.query}
                      handleClick={this.clearSearchFields}
                      onTextChange={this.updateQuery}
                      handleChange={this.handleSearchChange}
           />

        )} />

        <Route exact path="/"  render={() => (

          <div className="list-books">
            <Header />
            <Main onChange={this.handleChange}  books={this.state.books}/>
            <OpenSearch />
          </div>

        )} />
      </div>

    )
  }
}
        
export default BooksApp
