import React from 'react';
import Bookshelf from './Bookshelf';
import '../App.css'
import PropTypes from 'prop-types'

function Main(props) {

    return (
        <div className="list-books-content">
            <Bookshelf  
                bookshelfTitle='Currently Reading' 
                onChange={props.onChange} 
                books={props.books.filter(value => value.shelf === 'currentlyReading')}
            />

            <Bookshelf 
                bookshelfTitle='Want To Read' 
                onChange={props.onChange} 
                books={props.books.filter(value => value.shelf === 'wantToRead')}
            />

            <Bookshelf 
            bookshelfTitle='Read' 
            onChange={props.onChange} 
            books={props.books.filter(value => value.shelf === 'read')}
            />

        </div>
    )
}

Main.propTypes = {
    books: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Main