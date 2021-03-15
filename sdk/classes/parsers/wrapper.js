const { EOL } = require('os');
const cssParser = require("./css");
const utils = require("crownpeak-dxm-sdk-core/lib/crownpeak/utils");
const reactUtils = require("../utils/utils");

const reSignature = new RegExp("<([a-z:0-9\\-]+)[^>]+data-cms-wrapper-name\\s*=\\s*[\"']([^\"']+)[\"'](?:.|\\r|\\n)*?(?:<\\/\\1>|\\/>)", "im");
const reReactTags = [/^[ \t]*(.*\s*=\s*)?\{+[^}]*\}+\r?\n/gm, /\s(.*\s*=\s*)?\{+[^}]*\}+/gm, /(.*\s*=\s*)?\{+[^}]*\}+/gm];

const parse = (file, content) => {
    let match = content.match(reSignature);
    if (match && match.length > 2) {
        let position = match.index;
        let signature = match[0];
        // Process this file - it's good
        //console.log(`Found ${signature} at position ${position}`);
        
        let result = content;
        if (file.slice(-3) === ".js") {
            result = replacePreScaffolds(result);
            result = processJavaScript(result);
            result = replacePostScaffolds(result);
        } else {
            result = processScaffolds(result);
        }

        result = utils.replaceAssets(file, result, cssParser, false, ["public"]);

        match = result.content.match(reSignature);
        position = match.index;
        signature = match[0];
        const head = result.content.substr(0, position);
        const foot = result.content.substr(position + signature.length);

        let name = match[2];
        name = name[0].toUpperCase() + name.substr(1);
        return {wrapper: {name: name, head: head, foot: foot }, uploads: result.uploads};
    }

    return {};
};

const processJavaScript = (content) => {
    let result = /<html(.|\s)*?<\/html>/i.exec(content);
    if (result === null) return content;
    result = result[0];
    reReactTags.forEach(re => result = result.replace(re, ""));
    // Parse out any styles
    result = reactUtils.replaceStyles(result);
    // Remove any React-style comments
    result = reactUtils.removeComments(result);
    result = result.replace(/className/ig, "class");
    // Remove any JSX Fragments
    result = reactUtils.replaceJsxFragments(result);
    // Replacements from .cpscaffold.json file
    result = utils.replaceMarkup(result);
    result = reactUtils.trimSharedLeadingWhitespace(result);
    result = `<!DOCTYPE html>${EOL}${result}`;
    return result;
};

const processScaffolds = (content) => {
    const scaffoldRegexs = [
        { source: "<!--\\s*cp-scaffold\\s*((?:.|\\r|\\n)*?)\\s*else\\s*-->\\s*((?:.|\\r|\\n)*?)\\s*<!--\\s*\\/cp-scaffold\\s*-->", replacement: "$1" },
        { source: "<!--\\s*cp-scaffold\\s*((?:.|\\r|\\n)*?)\\s*\\/cp-scaffold\\s*-->", replacement: "$1"}
    ];
    let result = content;
    for (let j = 0, lenJ = scaffoldRegexs.length; j < lenJ; j++) {
        let regex = new RegExp(scaffoldRegexs[j].source);
        let match = regex.exec(result);
        while (match) {
            let replacement = scaffoldRegexs[j].replacement;
            //console.log(`Replacing [${match[0]}] with [${replacement}]`);
            result = result.replace(regex, replacement);
            match = regex.exec(result);
        }
    }
    return result;
};

const replacePreScaffolds = (content) => {
    const scaffoldRegexs = [
        { source: "\\{\\s*\\/\\*\\s*cp-scaffold\\s*((?:.|\\r|\\n)*?)\\s*else\\s*\\*\\/\\}\\s*((?:.|\\r|\\n)*?)\\s*\\{\\s*\\/\\*\\s*\\/cp-scaffold\\s*\\*\\/\\}", replacement: (_match, p1) => `<!-- cp-pre-scaffold ${Buffer.from(p1, 'binary').toString('base64')} /cp-pre-scaffold -->`},
        { source: "\\{\\s*\\/\\*\\s*cp-scaffold\\s*((?:.|\\r|\\n)*?)\\s*\\/cp-scaffold\\s*\\*\\/\\}", replacement: (_match, p1) => `<!-- cp-pre-scaffold ${Buffer.from(p1, 'binary').toString('base64')} /cp-pre-scaffold -->`}
    ];
    let result = content;
    for (let j = 0, lenJ = scaffoldRegexs.length; j < lenJ; j++) {
        let regex = new RegExp(scaffoldRegexs[j].source);
        let match = regex.exec(result);
        while (match) {
            let replacement = scaffoldRegexs[j].replacement;
            //console.log(`Replacing [${match[0]}] with [${replacement}]`);
            result = result.replace(regex, replacement);
            match = regex.exec(result);
        }
    }
    return result;
};

const replacePostScaffolds = (content) => {
    const scaffoldRegexs = [
        { source: "<!--\\s*cp-pre-scaffold\\s*((?:.|\\r|\\n)*?)\\s*\\/cp-pre-scaffold\\s*-->", replacement: (_match, p1) => `${Buffer.from(p1, 'base64').toString('binary')}`}
    ];
    let result = content;
    for (let j = 0, lenJ = scaffoldRegexs.length; j < lenJ; j++) {
        let regex = new RegExp(scaffoldRegexs[j].source);
        let match = regex.exec(result);
        while (match) {
            let replacement = scaffoldRegexs[j].replacement;
            //console.log(`Replacing [${match[0]}] with [${replacement}]`);
            result = result.replace(regex, replacement);
            match = regex.exec(result);
        }
    }
    return result;
};

module.exports = {
    parse: parse
};