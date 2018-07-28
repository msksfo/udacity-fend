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
        books: []
    }
    this.handleChange = this.handleChange.bind(this)
    
  }

  componentDidMount(){
      BooksAPI.getAll().then(books => {
          this.setState({books})
      })
  }

  handleChange(e){
    const selectedOption = e.target.value;
    const bookComponent = e.target.parentElement.parentElement.parentElement;

    this.setState(((state) => {
        // get the array index of the book that triggered the change event
        const bookIndex = state.books.findIndex(value => value.id === bookComponent.id);

        // make a temporary book that updates the shelf to the selected option
        const tempBook = state.books[bookIndex];
        tempBook.shelf = selectedOption;

        /* delete the original book object from the array of books. add the temp book object to the array.  */
        state.books.splice(bookIndex, 1);
        state.books.push(tempBook);

        // update the state
        return {books: state.books}
    }))
}

  render() {
    return (
      <div className="app">
        <Route path="/search" component={SearchPage} />

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
