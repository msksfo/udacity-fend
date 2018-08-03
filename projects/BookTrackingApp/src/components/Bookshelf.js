import React, { Component } from 'react'
import '../App.css'
import Book from './Book';
import PropTypes from 'prop-types'


class Bookshelf extends Component {

    render(){
        /* 1. map over the array of books that will be passed to this bookshelf
           2. for each book object in the array, create an li element
           3. add a book component (with all necessary props passed in) to each li.  If no        author property exists, make the author 'anonymous'
        */

        const bookshelfBooks = this.props.books;

        if (bookshelfBooks.length > 0){
            return (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>

                    <ol className="books-grid">

                        {bookshelfBooks.map(book => {
                            if(book.authors){
                                return <li key={book.id}>
                                            <Book bookTitle={book.title}
                                                authors={book.authors.join(', ')}
                                                bookCover={book.imageLinks}
                                                onChange={this.props.onChange}
                                                id={book.id}
                                                selected={book.shelf}
                                            />
                                        </li>

                            }else {
                                return <li key={book.id}>
                                            <Book bookTitle={book.title}
                                                authors={`Anonymous`}
                                                bookCover={book.imageLinks}
                                                onChange={this.props.onChange}
                                                id={book.id}
                                                selected={book.shelf}
                                            />
                                        </li>
                            }

                        })}

                    </ol>
                </div>
            )
        } else {
            return (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{this.props.bookshelfTitle}</h2>
                </div>
            )
        }


    }
}


Bookshelf.propTypes = {
    books: PropTypes.array.isRequired,
    bookshelfTitle: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}


export default Bookshelf