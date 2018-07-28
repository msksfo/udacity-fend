import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom'

function OpenSearch(props) {
    
    return (
        <div className="open-search">
            <Link to="/search" >Search for a book</Link>
        </div>
    )
    
}

export default OpenSearch