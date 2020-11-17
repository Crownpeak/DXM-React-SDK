const babelParser = require("@babel/parser");
const fs = require("fs");
const path = require('path');
const cssParser = require("./css");
const utils = require("crownpeak-dxm-sdk-core/lib/crownpeak/utils");
const extensions = [".js", ".ts"];
const reStyle = /\sstyle\s*=\s*(\{+[^}]+\}+)/i;
const reStyleRule = /([^:\s]+)\s*:\s*(['"]?)([^"',]+)\2/ig;

let _pageName = "";
let _fileName = "";

const parse = (content, file) => {
    _fileName = file;

    content = initialProcessMarkup(content);

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
    let uploads = [];
    let imports = [];
    const bodyParts = ast.program.body;
    for (let i = 0, len = bodyParts.length; i < len; i++) {
        const part = bodyParts[i];
        if (part.type === "ImportDeclaration" && part.specifiers && part.specifiers.length > 0) {
            for (let i in part.specifiers) {
                const specifier = part.specifiers[i];
                if ((specifier.type === "ImportDefaultSpecifier" || specifier.type === "ImportSpecifier")
                    && specifier.local && specifier.local.type === "Identifier") {
                    //console.log(`Found import ${specifier.local.name}, ${part.source.value}`);
                    imports.push({name: specifier.local.name, source: part.source.value});
                }
            }
        }
        else if (part.type === "ExportDefaultDeclaration" || part.type === "ExportNamedDeclaration") {
            if (part.declaration.type === "FunctionDeclaration"
                && part.declaration.body.body.some(p => p.type === "VariableDeclaration"
                    && p.declarations.some(d => d.init.type === "CallExpression"
                        && d.init.callee && d.init.callee.object
                        && ["CmsStaticPage","CmsDynamicPage"].indexOf(d.init.callee.object.name > -1)))) {
                //console.log(`Found exported function ${part.declaration.id.name} as a CmsPage`);
                const name = part.declaration.id.name;
                const result = processCmsPage(content, ast, part.declaration, imports);
                if (result && result.content) {
                    const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser);
                    uploads = uploads.concat(processedResult.uploads);
                    results.push({name: name, content: processedResult.content, wrapper: result.wrapper, useTmf: result.useTmf === true, suppressFolder: result.suppressFolder === true, suppressModel: result.suppressModel === true});
                }
            }
        }
        else if (part.type === "FunctionDeclaration"
            && part.body.body.some(p => p.type === "VariableDeclaration"
                && p.declarations.some(d => d.init.type === "CallExpression"
                    && d.init.callee && d.init.callee.object
                    && ["CmsStaticPage","CmsDynamicPage"].indexOf(d.init.callee.object.name > -1)))) {
            //console.log(`Found function ${part.id.name} as a CmsPage`);
            const name = part.id.name;
            const result = processCmsPage(content, ast, part, imports);
            if (result && result.content) {
                const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser);
                uploads = uploads.concat(processedResult.uploads);
                results.push({name: name, content: processedResult.content, wrapper: result.wrapper, useTmf: result.useTmf === true, suppressFolder: result.suppressFolder === true, suppressModel: result.suppressModel === true});
            }
        }
    }
    return { pages: results, uploads: uploads };
};

const initialProcessMarkup = (content) => {
    // Remove the check for isLoaded before rendering
    content = content.replace(/(return\s*\()\s*this.state.isLoaded\s+&&(\s*)/ig, "$1$2");
    // TODO: find a way to run this without breaking the ability to make replacements
    // Remove any { and }
    // content = content.replace(/[{]|[}]/g, "");
    return content;
};

const finalProcessMarkup = (content) => {
    // Parse out any styles
    content = replaceStyles(content);
    // Remove any React-style comments
    content = removeComments(content);
    content = content.replace(/className/ig, "class");
    return trimSharedLeadingWhitespace(content);
};

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
    let result = {};
    const temp = processCmsFunction(declaration, imports);
    if (temp.suppressFolder) result.suppressFolder = true;
    if (temp.suppressModel) result.suppressModel = true;
    if (temp.useTmf) result.useTmf = true;
    result.wrapper = temp.wrapper;
    for (let i = 0, len = bodyParts.length; i < len; i++) {
        const part = bodyParts[i];
        if (part.type === "ReturnStatement") {
            result.content = processCmsPageReturn(content, declaration, part, imports); 
        }
    }
    return result;
};

const processCmsFunction = (page, imports) => {
    return { 
        useTmf: getFunctionAssignedValue(page, "cmsUseTmf", false),
        suppressFolder: getFunctionAssignedValue(page, "cmsSuppressFolder", false),
        suppressModel: getFunctionAssignedValue(page, "cmsSuppressModel", false),
        wrapper: getFunctionAssignedValue(page, "cmsWrapper", undefined)
    };
};

const getFunctionAssignedValue = (fn, name, defaultValue) => {
    const parts = fn.body.body;
    for (let i = 0, len = parts.length; i < len; i++) {
        const part = parts[i];
        if (part.type === "VariableDeclaration" && part.declarations) {
            for (let j = 0, lenJ = part.declarations.length; j < lenJ; j++) {
                const declarator = part.declarations[j];
                if (declarator.type === "VariableDeclarator" && declarator.id
                    && declarator.id.name === name && declarator.init) {
                    // Items of the form
                    // var name = value;
                    return declarator.init.value;
                }
            }
        }
    }
    return defaultValue;
};

const processCmsPageReturn = (content, page, part, imports) => {
    let jsx = null;
    if (part.argument.type === "JSXElement") {
        jsx = part.argument;
    } else if (part.argument.type === "LogicalExpression" && part.argument.right.type === "JSXElement") {
        jsx = part.argument.right;
    }
    if (jsx) {
        //console.log(`Found JSX pattern ${content.slice(jsx.start, jsx.end)}`);
        let replacements = [];
        processCmsPagePattern(content, page, part, replacements, imports);

        // Replace the items in the pattern
        // Go from last to first, so we don't change the index numbers
        let pattern = content.slice(jsx.start, jsx.end);
        const offset = jsx.start;
        if (replacements.length > 0) {
            for (let j = replacements.length - 1; j >= 0; j--) {
                var rep = replacements[j];
                pattern = pattern.slice(0, rep.start - offset) + rep.value + pattern.substr(rep.end - offset);
            }
        }
        //console.log(`New JSX pattern ${pattern}`);
        return pattern;
    }
};

const processCmsPagePattern = (content, component, object, replacements, imports) => {
    if (object.type === "JSXElement" && object.openingElement && object.openingElement.name
        && imports.find(i => object.openingElement.name.name === i.name)) {
        processJsxElement(content, component, object, replacements, imports.find(i => object.openingElement.name.name === i.name));
    } else {
        const keys = Object.keys(object);
        for (let i in keys) {
            const key = keys[i];
            if (key === "loc") continue; // Shortcut to avoid things we don't need
            const value = object[key];
            if (typeof value === "object" && value !== null) {
                processCmsPagePattern(content, component, value, replacements, imports);
            }
        }
    }
};

const processJsxElement = (content, component, object, replacements, importDefinition) => {
    const componentName = object.openingElement.name.name;
    let prefix = "";
    let previouslyUsed = replacements.filter(r => r.component === componentName);
    if (previouslyUsed && previouslyUsed.length > 0) prefix = `${componentName}_${previouslyUsed.length + 1}:`;
    if (isDropZoneComponent(componentName, importDefinition)) return; // DropZones are processed by TemplateBuilder
    replacements.push({start: object.start, end: object.end, component: componentName, value: `{${prefix}${componentName}}`});
};

const isDropZoneComponent = (componentName, importDefinition) => {
    //console.log(`Checking ${componentName} (${JSON.stringify(importDefinition)}) for extending CmsDropZoneComponent`);
    const content = getSource(importDefinition.source);
    return content.indexOf(` class ${componentName} extends CmsDropZoneComponent`) > -1;
};

const getSource = (source) => {
    source = path.resolve(path.dirname(_fileName), source);
    if (fs.existsSync(source)) return fs.readFileSync(source);

    for (let i in extensions) {
        const ext = extensions[i];
        if (fs.existsSync(source + ext)) return fs.readFileSync(source + ext);
    }
    return "";
};

module.exports = {
    parse: parse
};