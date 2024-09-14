import React from 'react'

const Breadcrumb = ({params}) => {
    return (
        <nav>
            <ol className="breadcrumbs_link d-flex justify-content-start align-items-center">
                <li className="breadcrumb_item"><a href="/">Home</a></li>
                <li className="breadcrumb_item"><a href={params}>{params}</a></li>
            </ol>
        </nav>
    )
}

export default Breadcrumb