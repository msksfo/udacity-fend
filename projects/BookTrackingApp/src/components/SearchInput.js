import React, { Component } from 'react'
import '../App.css';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchInput extends Component {

    constructor(props){
        super(props)
    }

    filterSearch = (e) =>  {
        this.props.onTextChange(e.target.value);
    }

    render() {
        return (
            <div className="search-books-bar">
                <Link to="/" className="close-search" onClick={this.props.handleClick}>Close</Link>
                <div className="search-books-input-wrapper">

                    <input value={this.props.query}
                        onChange={this.filterSearch}
                        type="text"
                        placeholder="Search by title or author"/>

                </div>
            </div>
        )
    }
}

SearchInput.propTypes = {
    handleClick: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    query: PropTypes.string
}

export default SearchInput