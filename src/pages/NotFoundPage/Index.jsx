import React from 'react'

import './NotFoundPageStyles.scss'

const NotFoundPage = (props) => {
    document.title = 'Error 404 Not found'
    return(
        <div id="not_found_container">
            <p id="not_found__title">Error 404 not found</p>
            <p id="not_found__desc">The page you're looking for doesn't exist. Try to make a new search above.</p>
        </div>
    )
}

export default NotFoundPage