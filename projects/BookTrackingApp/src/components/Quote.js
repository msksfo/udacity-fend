import React from 'react'
import '../App.css'

function Quote(props){
    const { quote } = props;
    return (
        <div className="quote-container">
            <q className="quote">{quote.quote}</q>
            <p className="quote-author">~ {quote.author}</p>
        </div>
    )
}

export default Quote