import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
    return (
        <html lang="en">
        <head>
            <title>JS Wrapper With CSS</title>
            <link type="text/css" rel="stylesheet" href="./test.css"/>
        </head>
        <body>
            <header>
                <h1>JS Wrapper With CSS</h1>
            </header>

            <div
                key={`body`}
                id="___gatsby"
                data-cms-wrapper-name="JS Wrapper With CSS"
                dangerouslySetInnerHTML={{ __html: props.body }}
            />

            <footer>
                <h2>JS Wrapper With CSS</h2>
            </footer>
        </body>
        </html>
    )
}

HTML.propTypes = {
    htmlAttributes: PropTypes.object,
    headComponents: PropTypes.array,
    bodyAttributes: PropTypes.object,
    preBodyComponents: PropTypes.array,
    body: PropTypes.string,
    postBodyComponents: PropTypes.array,
}
        