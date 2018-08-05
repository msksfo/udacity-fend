import React from 'react';
import '../App.css';
import SearchInput from './SearchInput'
import SearchResultGrid from './SearchResultGrid'
import PropTypes from 'prop-types'

function SearchPage(props) {

    if (props.filteredBooks.length > 0){
        return (
            <div className='search-books'>

                <SearchInput query={props.query}
                                handleClick={props.handleClick}
                                onTextChange={props.onTextChange}
                />

                <SearchResultGrid handleChange={props.handleChange}
                                    filteredBooks={props.filteredBooks}
                />

            </div>
        )
    } else {
        return (
            <div className='search-books'>

                <SearchInput query={props.query}
                                handleClick={props.handleClick}
                                onTextChange={props.onTextChange}
                />

            </div>
        )
    }


}

SearchPage.propTypes = {
    handleClick: PropTypes.func.isRequired,
    query: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    filteredBooks: PropTypes.array.isRequired,
    onTextChange: PropTypes.func.isRequired
}

export default SearchPage;
