import React, { Component } from 'react';
import '../App.css'
import PropTypes from 'prop-types'

class Book extends Component {


    render() {
        return (
            <div id={this.props.id} className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookCover})`}}></div>

                    <div className="book-shelf-changer">
                        <select  defaultValue={this.props.selected} onChange={this.props.onChange}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    
                </div> 

                <div className="book-title">{this.props.bookTitle}</div>
                <div className="book-authors">{this.props.authors}</div>
            </div>
        )
    }
    
}


Book.propTypes = {
    id: PropTypes.string.isRequired,
    bookCover: PropTypes.string.isRequired,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    bookTitle: PropTypes.string.isRequired,
    authors: PropTypes.string.isRequired
}

export default Book
