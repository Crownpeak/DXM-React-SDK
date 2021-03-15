import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
    return (
        <html lang="en">
        <head>
            <title>Simple JS Wrapper</title>
        </head>
        <body>
            <header>
                <h1>Simple JS Wrapper</h1>
            </header>

            <div
                key={`body`}
                id="___gatsby"
                data-cms-wrapper-name="Simple JS Wrapper"
                dangerouslySetInnerHTML={{ __html: props.body }}
            />

            <footer>
                <h2>Simple JS Wrapper</h2>
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
        