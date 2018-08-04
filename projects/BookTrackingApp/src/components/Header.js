import React from 'react';
import Quote from './Quote';
import '../App.css';

function Header(props) {

    return (
        <div className="list-books-title">
            <div className="content-wrapper">
                <Quote quote={props.quote}/>
                <h1>MyReads</h1>
            </div>
        </div>
    )

}

export default Header;