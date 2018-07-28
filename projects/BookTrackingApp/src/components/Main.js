import React, { Component } from 'react';
import Bookshelf from './Bookshelf';
import '../App.css'
import PropTypes from 'prop-types'

class Main extends Component {

    render(){
        return (
            <div className="list-books-content">
                <Bookshelf  bookshelfTitle='Currently Reading' onChange={this.props.onChange} books={this.props.books.filter(value => value.shelf === 'currentlyReading')}/>
                                
                <Bookshelf bookshelfTitle='Want To Read' onChange={this.props.onChange} books={this.props.books.filter(value => value.shelf === 'wantToRead')}/>

                <Bookshelf bookshelfTitle='Read' onChange={this.props.onChange} books={this.props.books.filter(value => value.shelf === 'read')}/>
                
            </div>
        )
    }
}

Main.propTypes = {
    books: PropTypes.array.isRequired, 
    onChange: PropTypes.func.isRequired, 
}

export default Main