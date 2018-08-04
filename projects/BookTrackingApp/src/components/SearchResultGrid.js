import React from 'react'
import '../App.css'
import Book from './Book'
import PropTypes from 'prop-types'

function SearchResultGrid(props) {

    return (
        <div className="search-books-results">
            <ol className="books-grid">

            {/* Conditional check for author property. If property does not exist, make the author 'anonymous' */}
            {props.filteredBooks.map(book => {
                if (book.authors){
                    return <li key={book.id}>
                                <Book bookTitle={book.title}
                                    authors={book.authors.join(', ')}
                                    bookCover={book.imageLinks}
                                    onChange={props.handleChange}
                                    id={book.id}
                                    selected={book.shelf}
                                />
                            </li>

                } else {
                    return <li key={book.id}>
                                <Book bookTitle={book.title}
                                    authors={`Anonymous`}
                                    bookCover={book.imageLinks}
                                    onChange={props.handleChange}
                                    id={book.id}
                                    selected={book.shelf}
                                />
                            </li>
                }

            })}

            </ol>
        </div>
    )
}

SearchResultGrid.propTypes = {
    filteredBooks: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired
}

export default SearchResultGrid