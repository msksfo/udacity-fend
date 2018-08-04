import React from 'react'
import '../App.css'
import PropTypes from 'prop-types'

function Quote(props){
    const { quote } = props;
    return (
        <div className="quote-container">
            <q className="quote">{quote.quote}</q>
            <p className="quote-author">~ {quote.author}</p>
        </div>
    )
}

Quote.propTypes = {
    quote: PropTypes.object.isRequired
}

export default Quote