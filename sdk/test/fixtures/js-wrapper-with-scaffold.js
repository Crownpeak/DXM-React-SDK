import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
    return (
        <html lang="en">
        <head>
            <title>JS Wrapper With Scaffold</title>
            {/* cp-scaffold present else */}
            absent{/* /cp-scaffold */}
            {/* cp-scaffold {metadata} /cp-scaffold */}
        </head>
        <body>
            <header>
                <h1>JS Wrapper With Scaffold</h1>
            </header>

            <div
                key={`body`}
                id="___gatsby"
                data-cms-wrapper-name="JS Wrapper With Scaffold"
                dangerouslySetInnerHTML={{ __html: props.body }}
            />

            <footer>
                <h2>JS Wrapper With Scaffold</h2>
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
        