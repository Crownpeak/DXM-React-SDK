const babelParser = require("@babel/parser");

let _pageName = "";

const parse = (content) => {
    const ast = babelParser.parse(content, {
        sourceType: "module",
        plugins: ["jsx"]
    });
    //console.log(JSON.stringify(ast));
    if (ast.errors && ast.errors.length > 0) {
        console.warn(`PAGE: Skipping due to errors`);
        return;
    }

    let results = [];
    let imports = [];
    const bodyParts = ast.program.body;
    for (let i = 0, len = bodyParts.length; i < len; i++) {
        const part = bodyParts[i];
        if (part.type === "ImportDeclaration" && part.specifiers && part.specifiers.length > 0) {
            for (let i in part.specifiers) {
                const specifier = part.specifiers[i];
                if ((specifier.type === "ImportDefaultSpecifier" || specifier.type === "ImportSpecifier")
                    && specifier.local && specifier.local.type === "Identifier") {
                    //console.log(`Found import ${specifier.local.name}`);
                    imports.push(specifier.local.name);
                }
            }
        }
        else if (part.type === "ExportDefaultDeclaration") {
            if (part.declaration.type === "ClassDeclaration"
                && part.declaration.superClass
                && (part.declaration.superClass.name === "CmsDynamicPage" || part.declaration.superClass.name === "CmsStaticPage")) {
                //console.log(`Found class ${part.declaration.id.name} extending CmsComponent`);
                const name = part.declaration.id.name;
                const result = processCmsPage(content, ast, part.declaration, imports);
                if (result) {
                    results.push({name: name, content: finalProcessMarkup(result)});
                }
            }
        }
    }
    return results;
};

const initialProcessMarkup = (content) => {
    // TODO: find a way to run this without breaking the ability to make replacements
    // Remove any { and }
    return content.replace(/[{]|[}]/g, "");
};

const finalProcessMarkup = (content) => {
    content = content.replace(/className/ig, "class");
    return trimSharedLeadingWhitespace(content);
};

const trimSharedLeadingWhitespace = (content) => {
    // Trim leading whitespace common to all lines except blanks
    const onlyWhitespace = /^\s*$/;
    const leadingWhitespace = /^\s*/;
    let lines = content.split(`\n`);
    let maxLeader = 99;
    for (let i in lines) {
        let line = lines[i];
        if (i == 0 || onlyWhitespace.test(line)) continue;
        let match = line.match(leadingWhitespace);
        if (match && match[0].length) maxLeader = Math.min(maxLeader, match[0].length);
    }
    if (maxLeader > 0) {
        const leadingWhitespaceReplacer = new RegExp(`^\\s{${maxLeader}}`);
        for (let i in lines) {
            let line = lines[i];
            if (i == 0 || onlyWhitespace.test(line)) continue;
            lines[i] = line.replace(leadingWhitespaceReplacer, "");
        }
        content = lines.join('\n');
    }
    return content;
};

const processCmsPage = (content, ast, declaration, imports) => {
    _pageName = declaration.id.name;
    //console.log(`Processing CmsPage ${declaration.id.name}`);
    const bodyParts = declaration.body.body;
    for (let i = 0, len = bodyParts.length; i < len; i++) {
        const part = bodyParts[i];
        if (part.type === "ClassMethod" && part.key.name === "render") {
            return processCmsPageReturn(content, declaration, part, imports);
        }
    }
};

const processCmsPageReturn = (content, page, render, imports) => {
    const parts = render.body.body;
    for (let i = 0, len = parts.length; i < len; i++) {
        const part = parts[i];
        if (part.type === "ReturnStatement"
            && part.argument.type === "JSXElement") {
            //console.log(`Found JSX pattern ${content.slice(part.argument.start, part.argument.end)}`);
            let replacements = [];
            processCmsPagePattern(content, page, part, replacements, imports);

            // Replace the items in the pattern
            // Go from last to first, so we don't change the index numbers
            let pattern = content.slice(part.argument.start, part.argument.end);
            const offset = part.argument.start;
            if (replacements.length > 0) {
                for (let j = replacements.length - 1; j >= 0; j--) {
                    var rep = replacements[j];
                    pattern = pattern.slice(0, rep.start - offset) + rep.value + pattern.substr(rep.end - offset);
                }
            }
            //console.log(`New JSX pattern ${pattern}`);
            return pattern;
        }
    }
};

const processCmsPagePattern = (content, component, object, replacements, imports) => {
    const children = object.children || object.argument.children || [];
    for (let i = 0, len = children.length; i < len; i++) {
        const child = children[i];
        //console.log(`Child ${i} = ${child.type}`);
        if (child.type === "JSXElement" && child.openingElement && child.openingElement.name
            && imports.find(i => child.openingElement.name.name === i)) {
            processJsxElement(content, component, child, replacements);
        }
        if (child.children) {
            processCmsPagePattern(content, component, child, replacements, imports);
        }
    }
};

const processJsxElement = (content, component, object, replacements) => {
    const componentName = object.openingElement.name.name;
    let prefix = "";
    let previouslyUsed = replacements.filter(r => r.component === componentName);
    if (previouslyUsed && previouslyUsed.length > 0) prefix = `${componentName}_${previouslyUsed.length + 1}:`;
    replacements.push({start: object.start, end: object.end, component: componentName, value: `{${prefix}${componentName}}`});
};

module.exports = {
    parse: parse
};