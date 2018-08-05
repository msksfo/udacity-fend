import React from 'react';
import '../App.css'
import PropTypes from 'prop-types'

function Book(props) {

    return (
        <div id={props.id} className="book">
            <div className="book-top">

                {/* if the json data returns an image thumbnail for the book, display it as the background image for the book component. otherwise set a backgrouond color. */}

                { (props.bookCover && props.bookCover.thumbnail)
                    ? <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.bookCover.thumbnail})`}}></div>

                    : <div className='book-cover' style={{ width: 128, height: 193, background: '#becace'}}></div>
                }

                <div className="book-shelf-changer">
                    <select  aria-label="Bookshelves" defaultValue={props.selected} onChange={props.onChange}>
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>

            </div>

            <div className="book-title">{props.bookTitle}</div>
            <div className="book-authors">{props.authors}</div>
        </div>
    )
}


Book.propTypes = {
    id: PropTypes.string.isRequired,
    bookCover: PropTypes.object,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    bookTitle: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired
}

export default Book
