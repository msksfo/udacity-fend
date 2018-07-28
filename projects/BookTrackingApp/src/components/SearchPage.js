import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'


class SearchPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            query: ''
        }
        this.updateQuery = this.updateQuery.bind(this)
    }

    
    updateQuery(e) {
        let searchTermBooks

        BooksAPI.search(e.target.value).then(books => (
            this.setState({books})
        ))
        
        this.setState({
            query: e.target.value,
            books: searchTermBooks
        })

    }

    render(){       
        
        return (
            <div>
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        
                        <input value={this.state.query} onChange={this.updateQuery} type="text" placeholder="Search by title or author"/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        
                    </ol>
                </div>
            </div>
        )

    }
}

export default SearchPage;



{/*
    NOTES: The search from BooksAPI is limited to a particular set of search terms.
    You can find these search terms here:
    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
    you don't find a specific author or title. Every search is limited by search terms.
*/}