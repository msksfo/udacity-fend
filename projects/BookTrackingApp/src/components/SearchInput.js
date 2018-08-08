import React from 'react'
import '../App.css';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const SearchInput = (props) => {

    const filterSearch = (e) =>  {
        props.onTextChange(e.target.value);
    }

    return (
        <div className="search-books-bar">

            <Link to="/"
                className="close-search"
                onClick={props.handleClick}>Close
            </Link>

            <div className="search-books-input-wrapper">
                <input value={props.query}
                    onChange={filterSearch}
                    type="text"
                    placeholder="Search by title or author"
                />
            </div>

        </div>
    )
}

SearchInput.propTypes = {
    handleClick: PropTypes.func.isRequired,
    onTextChange: PropTypes.func.isRequired,
    query: PropTypes.string
}

export default SearchInput