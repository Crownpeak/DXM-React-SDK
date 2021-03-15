import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
    return (
        <html lang="en">
        <head>
            <title>JS Wrapper With Upload</title>
        </head>
        <body>
            <header>
                <h1>JS Wrapper With Upload</h1>
            </header>

            <img src="./logo.png"/>

            <div
                key={`body`}
                id="___gatsby"
                data-cms-wrapper-name="JS Wrapper With Upload"
                dangerouslySetInnerHTML={{ __html: props.body }}
            />

            <footer>
                <h2>JS Wrapper With Upload</h2>
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
        