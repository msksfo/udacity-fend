import React, { Component } from 'react';
import '../App.css'
import PropTypes from 'prop-types'

class Book extends Component {
    constructor(props){
        super(props)
    }

    render() {

        return (
            <div id={this.props.id} className="book">
                <div className="book-top">

                    {/* if the json data returns an image thumbnail for the book, display it as the background image for the book component. otherwise set a backgrouond color. */}

                    { !this.props.imageLinks || !this.props.imageLinks.thumbnail
                        ? <div className='book-cover' style={{ width: 128, height: 193, background: '#becace'}}></div>

                        : <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imageLinks.thumbnail})`}}></div>
                    }
                    

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

                {/* if the json data lists an author(s) for the book, display it. otherwise display 'anonymous' */}
                { this.props.authors
                    ? <div className="book-authors">{this.props.authors}</div>
                    : <div className="book-authors">Anonymous</div> 
                }
                
            </div>
        )
    }

}


Book.propTypes = {
    id: PropTypes.string.isRequired,
    bookCover: PropTypes.string,
    selected: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    bookTitle: PropTypes.string.isRequired,
    authors: PropTypes.string
}

export default Book
