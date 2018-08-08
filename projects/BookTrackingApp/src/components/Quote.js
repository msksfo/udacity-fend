import React from 'react'
import '../App.css'
import PropTypes from 'prop-types'

function Quote(props){
    const { quote } = props;
    return (
        <div className="quote-container">
            <q className="quote">{quote ? quote.quote : "We lose ourselves in books. We find ourselves there too"}</q>
            <p className="quote-author">~ {quote ? quote.author : "Anonymous"}</p>
        </div>
    )
}

Quote.propTypes = {
    quote: PropTypes.object.isRequired
}

export default Quote