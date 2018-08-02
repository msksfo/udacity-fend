import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom'
import Book from './Book'


class SearchPage extends Component {
    constructor(props){
        super(props)
        this.filterSearch = this.filterSearch.bind(this)
    }


    filterSearch(e) {
        this.props.onTextChange(e.target.value);
    }

    render(){
        const filteredBooks = this.props.filteredBooks;
        
        if (filteredBooks.length > 0){
            return (
                <div className='search-books'>
                    <div className="search-books-bar">
                        <Link to="/" className="close-search" onClick={this.props.handleClick}>Close</Link>
                        <div className="search-books-input-wrapper">
                            
                            <input value={this.props.query}
                                onChange={this.filterSearch}
                                type="text" 
                                placeholder="Search by title or author"/>
    
                        </div>
                    </div>
    
                    <div className="search-books-results">
                        <ol className="books-grid">
    
                        {filteredBooks.map(book => (
                            <li key={book.id}>
                                <Book bookTitle={book.title}
                                    authors={book.authors.join(', ')}
                                    bookCover={book.imageLinks.thumbnail}
                                    onChange={this.props.handleChange}  
                                    id={book.id}
                                    selected={book.shelf}
                                />
                            </li>
                        ))}
    
                        </ol>
                    </div>
                </div>
            )
        } else {
            return (
                <div className='search-books'>
                    <div className="search-books-bar">
                        <Link to="/" className="close-search">Close</Link>
                        <div className="search-books-input-wrapper">
                            
                            <input value={this.props.query}
                                onChange={this.filterSearch}
                                type="text" 
                                placeholder="Search by title or author"/>
    
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
    
    
}

export default SearchPage;
