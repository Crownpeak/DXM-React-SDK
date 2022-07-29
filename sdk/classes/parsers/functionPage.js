const babelParser = require("@babel/parser");
const fs = require("fs");
const path = require('path');
const cssParser = require("./css");
const utils = require("crownpeak-dxm-sdk-core/lib/crownpeak/utils");
const extensions = [".js", ".ts", ".jsx", ".tsx"];
const cmsPageComment = "CmsPage";
const reactUtils = require("../utils/utils");

let _fileName = "";

const parse = (content, file) => {
    _fileName = file;

    content = initialProcessMarkup(content);

    let ast = babelParser.parse(content, {
        sourceType: "module",
        plugins: ["jsx", "typescript"]
    });
    //console.log(JSON.stringify(ast));
    if (ast.errors && ast.errors.length > 0) {
        console.warn(`PAGE: Skipping due to errors`);
        return;
    }

    let results = [];
    let uploads = [];
    let imports = [];
    let bodyParts = ast.program.body;
    for (let i = 0, len = bodyParts.length; i < len; i++) {
        const part = bodyParts[i];
        if (part.type === "ImportDeclaration" && part.specifiers && part.specifiers.length > 0) {
            for (let i in part.specifiers) {
                const specifier = part.specifiers[i];
                if ((specifier.type === "ImportDefaultSpecifier" || specifier.type === "ImportSpecifier")
                    && specifier.local && specifier.local.type === "Identifier") {
                    const imp = {name: specifier.local.name, source: part.source.value};
                    imp.isCmsComponent = isCmsComponent(imp.name, imp);
                    //console.log(`Found import ${imp.name}, ${imp.source}, ${imp.isCmsComponent}`);
                    imports.push(imp);
                }
            }
        }
    }

    // Parse out any cp-scaffolds
    content = replacePreScaffolds(content);

    // Re-parse the content after our changes
    ast = babelParser.parse(content, {
        sourceType: "module",
        plugins: ["jsx", "typescript"]
    });
    bodyParts = ast.program.body;
    for (let i = 0, len = bodyParts.length; i < len; i++) {
        const part = bodyParts[i];
        if (part.type === "ExportDefaultDeclaration" || part.type === "ExportNamedDeclaration") {
            if (part.declaration.type === "FunctionDeclaration"
                && (bodyHasCmsPageComment(part.declaration.body, ast.comments)
                || (part.declaration.body.body.some(p => p.type === "VariableDeclaration"
                    && p.declarations.some(d => d.init.type === "CallExpression"
                        && d.init.callee && d.init.callee.object
                        && ["CmsStaticPage","CmsDynamicPage"].indexOf(d.init.callee.object.name > -1)))))) {
                // export [default] name() { ... }
                //console.log(`Found exported function ${part.declaration.id.name} as a CmsPage`);
                const name = part.declaration.id.name;
                const result = processCmsPage(content, ast, part.declaration, imports);
                if (result && result.content) {
                    const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser);
                    uploads = uploads.concat(processedResult.uploads);
                    results.push({name: name, content: processedResult.content, wrapper: result.wrapper, useTmf: result.useTmf === true, useMetadata: result.useMetadata === true, suppressFolder: result.suppressFolder === true, suppressModel: result.suppressModel === true});
                }
            }
            else if (part.declaration.type === "AssignmentExpression"
                && (bodyHasCmsPageComment(part.declaration.right.body, ast.comments)
                || (part.declaration.right.body.body.some(p => p.type === "VariableDeclaration"
                    && p.declarations.some(d => d.init.type === "CallExpression"
                        && d.init.callee && d.init.callee.object
                        && ["CmsStaticPage","CmsDynamicPage"].indexOf(d.init.callee.object.name > -1)))))) {
                // export default name = () => { ... }
                //console.log(`Found exported arrow function 1 ${part.declaration.left.name} as a CmsPage`);
                const name = part.declaration.left.name;
                const result = processCmsPage(content, ast, part.declaration, imports);
                if (result && result.content) {
                    const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser);
                    uploads = uploads.concat(processedResult.uploads);
                    results.push({name: name, content: processedResult.content, wrapper: result.wrapper, useTmf: result.useTmf === true, useMetadata: result.useMetadata === true, suppressFolder: result.suppressFolder === true, suppressModel: result.suppressModel === true});
                }
            }
            else if (part.declaration.type === "VariableDeclaration"
                && part.declaration.declarations && part.declaration.declarations.length
                && part.declaration.declarations[0].type === "VariableDeclarator"
                && part.declaration.declarations[0].init && part.declaration.declarations[0].init.type === "ArrowFunctionExpression"
                && (bodyHasCmsPageComment(part.declaration.declarations[0].init.body, ast.comments)
                || (part.declaration.declarations[0].init.body.body.some(p => p.type === "VariableDeclaration"
                    && p.declarations.some(d => d.init.type === "CallExpression"
                        && d.init.callee && d.init.callee.object
                        && ["CmsStaticPage","CmsDynamicPage"].indexOf(d.init.callee.object.name > -1)))))) {
                // export const name = () => { ... }
                //console.log(`Found exported arrow function 2 ${part.declaration.declarations[0].id.name} as a CmsPage`);
                const name = part.declaration.declarations[0].id.name;
                const result = processCmsPage(content, ast, part.declaration.declarations[0], imports);
                if (result && result.content) {
                    const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser);
                    uploads = uploads.concat(processedResult.uploads);
                    results.push({name: name, content: processedResult.content, wrapper: result.wrapper, useTmf: result.useTmf === true, useMetadata: result.useMetadata === true, suppressFolder: result.suppressFolder === true, suppressModel: result.suppressModel === true});
                }
            }
        }
        else if (part.type === "FunctionDeclaration"
            && (bodyHasCmsPageComment(part.body, ast.comments)
            || (part.body.body.some(p => p.type === "VariableDeclaration"
                && p.declarations.some(d => d.init.type === "CallExpression"
                    && d.init.callee && d.init.callee.object
                    && ["CmsStaticPage","CmsDynamicPage"].indexOf(d.init.callee.object.name > -1)))))) {
            // function name() { ... }
            //console.log(`Found function ${part.id.name} as a CmsPage`);
            const name = part.id.name;
            const result = processCmsPage(content, ast, part, imports);
            if (result && result.content) {
                const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser);
                uploads = uploads.concat(processedResult.uploads);
                results.push({name: name, content: processedResult.content, wrapper: result.wrapper, useTmf: result.useTmf === true, useMetadata: result.useMetadata === true, suppressFolder: result.suppressFolder === true, suppressModel: result.suppressModel === true});
            }
        }
        else if (part.type === "VariableDeclaration"
            && part.declarations && part.declarations.length
            && part.declarations[0].type === "VariableDeclarator"
            && part.declarations[0].init && part.declarations[0].init.type === "ArrowFunctionExpression"
            && (bodyHasCmsPageComment(part.declarations[0].init.body, ast.comments)
            || (part.declarations[0].init.body.body.some(p => p.type === "VariableDeclaration"
                && p.declarations.some(d => d.init.type === "CallExpression"
                    && d.init.callee && d.init.callee.object
                    && ["CmsStaticPage","CmsDynamicPage"].indexOf(d.init.callee.object.name > -1)))))) {
            // const name = () => { ... }
            //console.log(`Found arrow function ${part.declarations[0].id.name} as a CmsPage`);
            const name = part.declarations[0].id.name;
            const result = processCmsPage(content, ast, part.declarations[0], imports);
            if (result && result.content) {
                const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser);
                uploads = uploads.concat(processedResult.uploads);
                results.push({name: name, content: processedResult.content, wrapper: result.wrapper, useTmf: result.useTmf === true, useMetadata: result.useMetadata === true, suppressFolder: result.suppressFolder === true, suppressModel: result.suppressModel === true});
            }
        }
    }
    return { pages: results, uploads: uploads };
};

const bodyHasCmsPageComment = (body, comments) => {
    // See if any CmsPage comment is contained within our function body
    return comments.some(comment =>
        comment.value.replace(/\s+/g, "") === cmsPageComment && comment.start >= body.start && comment.end <= body.end
    );
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
    if (!content || !content.replace) return content;
    // Parse out any cp-scaffolds
    content = replacePostScaffolds(content);
    // Parse out any styles
    content = reactUtils.replaceStyles(content);
    // Remove any React-style comments
    content = reactUtils.removeComments(content);
    content = content.replace(/className/ig, "class");
    // Remove any JSX Fragments
    content = reactUtils.replaceJsxFragments(content);
    // Replacements from .cpscaffold.json file
    content = utils.replaceMarkup(content);
    return reactUtils.trimSharedLeadingWhitespace(content);
};

const replacePreScaffolds = (content) => {
    const scaffoldRegexs = [
        { source: "\\{\\s*\\/\\*\\s*cp-scaffold\\s*((?:.|\\r|\\n)*?)\\s*else\\s*\\*\\/\\}\\s*((?:.|\\r|\\n)*?)\\s*\\{\\s*\\/\\*\\s*\\/cp-scaffold\\s*\\*\\/\\}", replacement: "{/* cp-pre-scaffold $1 /cp-pre-scaffold */}"},
        { source: "\\{\\s*\\/\\*\\s*cp-scaffold\\s*((?:.|\\r|\\n)*?)\\s*\\/cp-scaffold\\s*\\*\\/\\}", replacement: "{/* cp-pre-scaffold $1 /cp-pre-scaffold */}"}
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
        { source: "\\{\\s*\\/\\*\\s*cp-pre-scaffold\\s*((?:.|\\r|\\n)*?)\\s*\\/cp-pre-scaffold\\s*\\*\\/\\}", replacement: "$1"}
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

const processCmsPage = (content, ast, declaration, imports) => {
    //console.log(`Processing CmsPage ${declaration.id.name}`);
    if (declaration.init) declaration = declaration.init;
    else if (declaration.right) declaration = declaration.right;
    const bodyParts = declaration.body.body;
    let result = {};
    const temp = processCmsFunction(declaration, imports);
    if (temp.suppressFolder) result.suppressFolder = true;
    if (temp.suppressModel) result.suppressModel = true;
    if (temp.useTmf) result.useTmf = true;
    if (temp.useMetadata) result.useMetadata = true;
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
        useMetadata: getFunctionAssignedValue(page, "cmsUseMetadata", false),
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
    if (part.argument.type === "JSXElement" || part.argument.type === "JSXFragment") {
        jsx = part.argument;
    } else if (part.argument.type === "LogicalExpression" && (part.argument.right.type === "JSXElement" || part.argument.right.type === "JSXFragment")) {
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
        processJsxElement(content, component, object, replacements, imports.find(i => object.openingElement.name.name === i.name), imports);
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

const processJsxElement = (content, component, object, replacements, importDefinition, imports) => {
    const componentName = object.openingElement.name.name;
    let prefix = "";
    let previouslyUsed = replacements.filter(r => r.component === componentName);
    if (previouslyUsed && previouslyUsed.length > 0) prefix = `${componentName}_${previouslyUsed.length + 1}:`;
    if (isDropZoneComponent(componentName, importDefinition)) return; // DropZones are processed by TemplateBuilder
    if (importDefinition && importDefinition.isCmsComponent) {
        replacements.push({start: object.start, end: object.end, component: componentName, value: `{${prefix}${componentName}}`});
    }
    if (object.children && object.children.length) {
        for (let c of object.children) {
            if (c.type === "JSXElement") processJsxElement(content, component, c, replacements, imports.find(i => c.openingElement.name.name === i.name), imports);
        }
    }
};

const isCmsComponent = (componentName, importDefinition) => {
    //console.log(`Checking ${componentName} (${JSON.stringify(importDefinition)}) for being a CmsComponent`);
    if (!importDefinition || !importDefinition.source) return false;
    const content = getSource(importDefinition.source);
    return content.indexOf(`extends CmsComponent`) > -1 || content.indexOf(`CmsDataCache.setComponent`) > -1;
}

const isDropZoneComponent = (componentName, importDefinition) => {
    //console.log(`Checking ${componentName} (${JSON.stringify(importDefinition)}) for extending CmsDropZoneComponent`);
    if (!importDefinition || !importDefinition.source) return false;
    const content = getSource(importDefinition.source);
    return content.indexOf(` class ${componentName} extends CmsDropZoneComponent`) > -1;
};

const getSource = (source) => {
    source = path.resolve(path.dirname(_fileName), source);
    if (fs.existsSync(source)) {
        if (fs.lstatSync(source).isFile()) return fs.readFileSync(source);
        // This is a directory, so look for an index.js or index.ts file within
        const indexFile = fs.readdirSync(source).find(f => f.toLocaleLowerCase() === "index.js" || f.toLocaleLowerCase() === "index.ts");
        if (indexFile) return path.resolve(source, indexFile);
    }

    for (let i in extensions) {
        const ext = extensions[i];
        if (fs.existsSync(source + ext)) return fs.readFileSync(source + ext);
    }
    return "";
};

module.exports = {
    parse: parse
};