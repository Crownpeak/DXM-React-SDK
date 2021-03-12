const reStyle = /\sstyle\s*=\s*(\{+[^}]+\}+)/i;
const reStyleRule = /([^:\s]+)\s*:\s*(['"]?)([^"',]+)\2/ig;

const removeComments = (content) => {
    const commentRegexs = [
        /([ \t]*)\{\s*\/\*(.|\s)*?\*\/\s*\}([ \t]*)\r?\n/ig,
        /\{\s*\/\*(.|\s)*?\*\/\s*\}/ig
    ];
    for (let i = 0, len = commentRegexs.length; i < len; i++) {
        content = content.replace(commentRegexs[i], "");
    }
    return content;
};

const replaceJsxFragments = (content) => {
    const regex = /^[ \t]*<[\/]?>\r?\n?/gm;
    content = content.replace(regex, "");
    return content;
};

const replaceStyles = (content) => {
    let match = reStyle.exec(content);
    while (match) {
        const style = match[1];
        let replacements = [];
        //console.log("Found style ${style}");
        if (style.substr(0, 2) === "{{" && style.slice(-2) === "}}") {
            let ruleMatch = reStyleRule.exec(style.slice(2, style.length - 2));
            while (ruleMatch) {
                replacements.push(`${camelCaseToDashes(ruleMatch[1])}: ${prepareCssValue(ruleMatch[1], ruleMatch[3])}`);
                ruleMatch = reStyleRule.exec(style.slice(2, style.length - 2));
            }
        } else {
            // TODO: support other JSX style definition formats
        }
        content = content.replace(match[0], ` style='${replacements.join("; ")}'`);
        match = reStyle.exec(content);
    }
    return content;
};

const camelCaseToDashes = (str) => {
    return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

const prepareCssValue = (key, value) => {
    if (["animationIterationCount","borderImageOutset","borderImageSlice","borderImageWidth","boxFlex","boxFlexGroup","boxOrdinalGroup","columnCount","columns","flex","flexGrow","flexPositive","flexShrink","flexNegative","flexOrder","gridRow","gridRowEnd","gridRowSpan","gridRowStart","gridColumn","gridColumnEnd","gridColumnSpan","gridColumnStart","fontWeight","lineClamp","lineHeight","opacity","order","orphans","tabSize","widows","zIndex","zoom","fillOpacity","floodOpacity","stopOpacity","strokeDasharray","strokeDashoffset","strokeMiterlimit","strokeOpacity","strokeWidth"]
        .indexOf(key) < 0
        && (/^[0-9]+$/.test(value))) return value + "px";
    return value;
};

const trimSharedLeadingWhitespace = (content) => {
    // Trim leading whitespace common to all lines except blanks
    const onlyWhitespace = /^\s*$/;
    const leadingWhitespace = /^\s*/;
    let lines = content.split(`\n`);
    let maxLeader = 99;
    for (let i in lines) {
        let line = lines[i];
        if (onlyWhitespace.test(line)) continue;
        let match = line.match(leadingWhitespace);
        if (match && match[0].length) maxLeader = Math.min(maxLeader, match[0].length);
    }
    if (maxLeader > 0) {
        const leadingWhitespaceReplacer = new RegExp(`^\\s{${maxLeader}}`);
        for (let i in lines) {
            let line = lines[i];
            if (onlyWhitespace.test(line)) continue;
            lines[i] = line.replace(leadingWhitespaceReplacer, "");
        }
        content = lines.join('\n');
    }
    return content;
};

module.exports = {
    removeComments,
    replaceJsxFragments,
    replaceStyles,
    trimSharedLeadingWhitespace
};