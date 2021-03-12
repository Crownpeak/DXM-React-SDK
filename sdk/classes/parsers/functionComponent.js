const babelParser = require("@babel/parser");
const fs = require("fs");
const path = require('path');
const cssParser = require("./css");
const utils = require("crownpeak-dxm-sdk-core/lib/crownpeak/utils");
const extensions = [".js", ".ts", ".jsx", ".tsx"];
const reactUtils = require("../utils/utils");

let _componentName = "";
let _fileName = "";

const reComponentType1 = /^\s*([a-z0-9_]+)\s*$/i;
const reComponentType2 = /^\s*new\s+CmsField\s*[(]\s*(["'])([a-z0-9_]+)\1\s*,\s*CmsFieldTypes.([a-z0-9]+)(\s*,.*,\s*CmsIndexedField\.([a-z]+))?/i;
const reComponentType3 = /^\s*new\s+CmsField\s*[(]\s*(["'])([a-z0-9_]+)\1\s*,\s*(["'])([a-z0-9_]+)\3(\s*,.*,\s*CmsIndexedField\.([a-z]+))?/i;
const reList = /^([ \t]*){\s*\/\*\s*<List(.*?)\s*type=(["'])([^"']+?)\3(.*?)>\s*\*\/\s*}((.|\s)*?){\s*\/\*\s*\<\/List>\s*\*\/\s*}/im;
const reListName = /\s+?name\s*=\s*(["'])([^"']+?)\1/i;
const reListItemName = /\s+?itemName\s*=\s*(["'])([^"']+?)\1/i;

const parse = (content, file) => {
    _fileName = file;

    let ast = babelParser.parse(content, {
        sourceType: "module",
        plugins: ["jsx", "classProperties", "typescript"]
    });
    //console.log(JSON.stringify(ast));
    if (ast.errors && ast.errors.length > 0) {
        console.warn(`COMPONENT: Skipping due to errors`);
        return;
    }

    let results = [];
    let uploads = [];
    let imports = [];
    let dependencies = [];
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
    // Parse out any special lists
    content = replaceLists(content, dependencies);

    // Parse out any cp-scaffolds
    content = replacePreScaffolds(content);

    // Re-parse the content after our changes
    ast = babelParser.parse(content, {
        sourceType: "module",
        plugins: ["jsx", "classProperties", "typescript"]
    });
    bodyParts = ast.program.body;
    for (let i = 0, len = bodyParts.length; i < len; i++) {
        const part = bodyParts[i];
        if (part.type === "ExportDefaultDeclaration" || part.type === "ExportNamedDeclaration") {
            if (part.declaration.type === "FunctionDeclaration"
                && part.declaration.body.body.some(p => p.type === "ExpressionStatement"
                && p.expression.type === "CallExpression" && p.expression.callee
                && p.expression.callee.type === "MemberExpression"
                && p.expression.callee.object && p.expression.callee.property
                && p.expression.callee.object.name === "CmsDataCache"
                && p.expression.callee.property.name === "setComponent")) {
                // export [default] function Component(props) 
                //console.log(`Found exported function ${part.declaration.id.name} calling CmsDataCache.setComponent`);
                const name = part.declaration.id.name;
                const result = processCmsComponent(content, ast, part.declaration, imports, dependencies);
                if (result) {
                    const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser, true);
                    uploads = uploads.concat(processedResult.uploads);
                    results.push({name: name, content: processedResult.content, folder: result.folder, zones: result.zones, disableDragDrop: result.disableDragDrop, dependencies: dependencies});
                }
            }
            else if (part.declaration.type === "VariableDeclaration") {
                let declarator = part.declaration.declarations.find(d => d.type === "VariableDeclarator"
                    && d.init && d.init.type === "ArrowFunctionExpression"
                    && d.init.body.body.some(p => p.type === "ExpressionStatement"
                    && p.expression.type === "CallExpression" && p.expression.callee
                    && p.expression.callee.type === "MemberExpression"
                    && p.expression.callee.object && p.expression.callee.property
                    && p.expression.callee.object.name === "CmsDataCache"
                    && p.expression.callee.property.name === "setComponent"));
                if (declarator) {
                    // export const Component = (props) => 
                    //console.log(`Found exported arrow function ${declarator.id.name} calling CmsDataCache.setComponent`);
                    const name = declarator.id.name;
                    const result = processCmsComponent(content, ast, declarator, imports, dependencies);
                    if (result) {
                        const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser, true);
                        uploads = uploads.concat(processedResult.uploads);
                        results.push({name: name, content: processedResult.content, folder: result.folder, zones: result.zones, disableDragDrop: result.disableDragDrop, dependencies: dependencies});
                    }
                }
            }
        }
        else if (part.type === "FunctionDeclaration"
            && part.body.body.some(p => p.type === "ExpressionStatement"
            && p.expression.type === "CallExpression" && p.expression.callee
            && p.expression.callee.type === "MemberExpression"
            && p.expression.callee.object && p.expression.callee.property
            && p.expression.callee.object.name === "CmsDataCache"
            && p.expression.callee.property.name === "setComponent")) {
            // function Component(props)
            //console.log(`Found function ${part.id.name} calling CmsDataCache.setComponent`);
            const name = part.id.name;
            const result = processCmsComponent(content, ast, part, imports, dependencies);
            if (result) {
                const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser, true);
                uploads = uploads.concat(processedResult.uploads);
                results.push({name: name, content: processedResult.content, folder: result.folder, zones: result.zones, disableDragDrop: result.disableDragDrop, dependencies: dependencies});
            }
        }
        else if (part.type === "VariableDeclaration") {
            let declarator = part.declarations.find(d => d.type === "VariableDeclarator"
                && d.init && d.init.type === "ArrowFunctionExpression"
                && d.init.body.body.some(p => p.type === "ExpressionStatement"
                && p.expression.type === "CallExpression" && p.expression.callee
                && p.expression.callee.type === "MemberExpression"
                && p.expression.callee.object && p.expression.callee.property
                && p.expression.callee.object.name === "CmsDataCache"
                && p.expression.callee.property.name === "setComponent"));
            if (declarator) {
                // const Component = (props) => 
                //console.log(`Found arrow function ${declarator.id.name} calling CmsDataCache.setComponent`);
                const name = declarator.id.name;
                const result = processCmsComponent(content, ast, declarator, imports, dependencies);
                if (result) {
                    const processedResult = utils.replaceAssets(file, finalProcessMarkup(result.content), cssParser, true);
                    uploads = uploads.concat(processedResult.uploads);
                    results.push({name: name, content: processedResult.content, folder: result.folder, zones: result.zones, disableDragDrop: result.disableDragDrop, dependencies: dependencies});
                }
            }
        }
    }
    return { components: results, uploads: uploads };
};

const finalProcessMarkup = (content) => {
    if (!content || !content.replace) return content;
    // Parse out any cp-scaffolds
    content = replacePostScaffolds(content);
    // Parse out any styles
    content = reactUtils.replaceStyles(content);
    // Remove any React-style comments
    content = reactUtils.removeComments(content);
    // Remove anything that has { and } but doesn't look like a component
    const replacer = /[{]([^}]*?[\s,/$()][^}]*?)[}]/g;
    while (replacer.test(content)) {
        content = content.replace(replacer, "$1");
    }
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

const replaceLists = (content, dependencies) => {
    let match;
    while (match = reList.exec(content)) {
        let attributes = " " + match[2] + " " + match[5];
        let name = "";
        let itemName = "";
        const ws = match[1];
        const type = match[4];
        if (reListName.test(attributes)) {
            const nameMatch = reListName.exec(attributes);
            name = nameMatch[2];
        }
        if (reListItemName.test(attributes)) {
            const nameMatch = reListItemName.exec(attributes);
            itemName = nameMatch[2];
        }
        if (!name) {
            name = type + "s"; // TODO: better way to make plural
        }
        if (!itemName) {
            itemName = type;
        }
        //console.log(`Found list with name ${name}`);
        const repl = `${ws}<cp-list name="${name}">\r\n${ws}  {new CmsField("${itemName}", "${type}")}\r\n${ws}</cp-list>`;
        addDependency(type, dependencies);
        content = content.replace(match[0], repl);
    }
    return content;
};

const processCmsComponent = (content, ast, declaration, imports, dependencies) => {
    _componentName = declaration.id.name;
    if (declaration.init) declaration = declaration.init;
    //console.log(`Processing CmsComponent ${declaration.id.name}`);
    let result = {};
    const temp = processCmsFunction(declaration, imports);
    if (temp.folder) result.folder = temp.folder;
    if (temp.zones) result.zones = typeof(temp.zones) === "string" ? temp.zones.split(",") : temp.zones;
    if (typeof temp.disableDragDrop !== "undefined") result.disableDragDrop = temp.disableDragDrop;
    const bodyParts = declaration.body.body;
    for (let i = 0, len = bodyParts.length; i < len; i++) {
        const part = bodyParts[i];
        if (part.type === "ReturnStatement") {
            result.content = processCmsComponentReturn(content, declaration, part, imports, dependencies);
        }
    }
    return result;
};

const processCmsFunction = (component, imports) => {
    return { 
        folder: getFunctionAssignedValue(component, "cmsFolder", ""),
        zones: getFunctionAssignedValue(component, "cmsZones", ""),
        disableDragDrop: getFunctionAssignedValue(component, "cmsDisableDragDrop", undefined)
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
                    if (declarator.init.type === "ArrayExpression") {
                        // Items of the form
                        // var name = value;
                        return declarator.init.elements.map(e => e.value);
                    } else {
                        // Items of the form
                        // var name = [value];
                        return declarator.init.value;
                    }
                }
            }
        }
    }
    return defaultValue;
};

const processCmsComponentReturn = (content, component, part, imports, dependencies) => {
    if (part.type === "ReturnStatement" && (part.argument.type === "JSXElement" || part.argument.type === "JSXFragment")) {
        //console.log(`Found JSX pattern ${content.slice(part.argument.start, part.argument.end)}`);
        let replacements = [];
        processCmsComponentPattern(content, component, part, replacements, imports, dependencies);
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
};

const processCmsComponentPattern = (content, component, object, replacements, imports, dependencies, isAttribute = false) => {
    if (!object) return;
    if (object.type === "JSXExpressionContainer") {
        processJsxExpression(content, component, object, replacements, imports, dependencies, isAttribute);
    } else if (object.type === "JSXElement" && object.openingElement && object.openingElement.name
        && imports.find(i => object.openingElement.name.name === i.name)) {
        processJsxElement(content, component, object, replacements, imports, dependencies);
        if (object.children && object.children.length) {
            for (let c of object.children) {
                processCmsComponentPattern(content, component, c, replacements, imports, dependencies, isAttribute);
            }
        }
    } else if (typeof object !== "string" && Array.isArray(object)) {
        for (let i = 0, len = object.length; i < len; i++) {
            processCmsComponentPattern(content, component, object[i], replacements, imports, dependencies);
        }
    } else if (typeof object !== "string") {
        const keys = Object.keys(object);
        for (let key in keys) {
            processCmsComponentPattern(content, component, object[keys[key]], replacements, imports, dependencies, object.type === "JSXAttribute");
        }
    }
};

const processJsxExpression = (content, component, object, replacements, imports, dependencies, isAttribute = false) => {
    let result = processJsxExpressionSub(content, component, object, imports);
    if (result) {
        // JSX doesn't allow the attribute expression to be quoted, but HTML relies on it
        const quotes = isAttribute ? "\"" : "";
        if (result.thisproperty) {
            // Find the definition of this field
            result = findCmsFieldFromVariable(content, component, result.thisproperty, result.comment);
        }
        if (result.cmsfield) {
            let indexedField = cmsIndexedFieldToString(result.indexedField);
            if (indexedField) indexedField = ":" + indexedField;
            //console.log(`Replacing ${content.slice(object.start, object.end)} with {${result.cmsfield}:${cmsFieldTypeToString(result.type)}${indexedField}}`);
            addDependency(cmsFieldTypeToString(result.type), dependencies);
            replacements.push({start: object.start, end: object.end, value: `${result.comment ? "<!-- " : ""}${quotes}{${result.cmsfield}:${cmsFieldTypeToString(result.type)}${indexedField}}${quotes}${result.comment ? " -->" : ""}`});
        } else {
            // Trim first and last character to remove { and }
            replacements.push({start: object.start, end: object.end, value: quotes + content.slice(object.start + 1, object.end - 1) + quotes});
        }
    }
};

const processJsxExpressionSub = (content, component, object, imports) => {
    // TODO: better way to avoid finding functions wrapping fields
    if (object.type === "Identifier" && object.name !== "ReactHtmlParser") {
        // Items of the form
        // { field_name }
        //console.log(`Found ${object.name}`);
        if (new RegExp(`(?:const|let|var)\\s+${object.name}\\b`).exec(content))
            return { thisproperty: object.name };
        return null;
    }
    else if (object.type === "NewExpression"
        && object.callee && object.callee.type == "Identifier" && object.callee.name === "CmsField"
        && object.arguments && object.arguments.length > 1
        && object.arguments[0].type === "StringLiteral"
        && object.arguments[1].type === "MemberExpression"
        && object.arguments[1].object && object.arguments[1].object.type === "Identifier" && object.arguments[1].object.name === "CmsFieldTypes"
        && object.arguments[1].property) {
        if (object.arguments.length > 3 && object.arguments[3].object && object.arguments[3].object.type === "Identifier" && object.arguments[3].object.name === "CmsIndexedField") {
            // Items of the form
            // { new CmsField("field_name", CmsFieldTypes.FieldType, something, CmsIndexedField.TYPE) }
            //console.log(`Found field ${object.arguments[0].value} type ${object.arguments[1].property.name} indexedField ${object.arguments[3].property.name}`);
            return { cmsfield: object.arguments[0].value, type: object.arguments[1].property.name, indexedField: object.arguments[3].property.name };
        } else {
            // Items of the form
            // { new CmsField("field_name", CmsFieldTypes.FieldType) }
            //console.log(`Found field ${object.arguments[0].value} type ${object.arguments[1].property.name}`);
            return { cmsfield: object.arguments[0].value, type: object.arguments[1].property.name };
        }
    }
    else if (object.type === "NewExpression"
        && object.callee && object.callee.type == "Identifier" && object.callee.name === "CmsField"
        && object.arguments && object.arguments.length > 1
        && object.arguments[0].type === "StringLiteral"
        && object.arguments[1].type === "StringLiteral") {
        if (object.arguments.length > 3 && object.arguments[3].object && object.arguments[3].object.type === "Identifier" && object.arguments[3].object.name === "CmsIndexedField") {
            // Items of the form
            // { new CmsField("field_name", "FieldType", something, CmsIndexedField.TYPE) }
            //console.log(`Found field ${object.arguments[0].value} type ${object.arguments[1].value} indexedField ${object.arguments[3].property.name}`);
            return { cmsfield: object.arguments[0].value, type: object.arguments[1].value, indexedField: object.arguments[3].property.name };
        } else {
            // Items of the form
            // { new CmsField("field_name", "FieldType") }
            //console.log(`Found field ${object.arguments[0].value} type ${object.arguments[1].value}`);
            return { cmsfield: object.arguments[0].value, type: object.arguments[1].value };
        }
    }
    else if (object.type === "JSXEmptyExpression"
        && object.innerComments && object.innerComments.length > 0
        && object.innerComments[0].type === "CommentBlock"
        && (reComponentType1.test(object.innerComments[0].value)
            || reComponentType2.test(object.innerComments[0].value)
            || reComponentType3.test(object.innerComments[0].value))
        ) {
        let match = reComponentType1.exec(object.innerComments[0].value);
        if (match) {
            // Items of the form
            // { /*field_name*/ }
            //console.log(`Found /* ${match[1]} */`);
            if (new RegExp(`(?:const|let|var)\\s+${match[1]}\\b`).exec(content))
                return { thisproperty: match[1], comment: true };
            return null;
        }
        match = reComponentType2.exec(object.innerComments[0].value);
        if (match) {
            if (match.length > 5) {
                // Items of the form
                // { /*new CmsField("field_name", CmsFieldTypes.FieldType, something, CmsIndexedField.TYPE)*/ }
                //console.log(`Found commented field ${match[2]} type ${match[3]} indexedField ${match[5]}`);
                return { cmsfield: match[2], type: match[3], indexedField: match[5], comment: true };
            } else {
                // Items of the form
                // { /*new CmsField("field_name", CmsFieldTypes.FieldType)*/ }
                //console.log(`Found commented field ${match[2]} type ${match[3]}`);
                return { cmsfield: match[2], type: match[3], comment: true };
            }
        }
        match = reComponentType3.exec(object.innerComments[0].value);
        if (match) {
            if (match.length > 6) {
                // Items of the form
                // { /*new CmsField("field_name", "FieldType", something, CmsIndexedField.TYPE)*/ }
                //console.log(`Found commented field ${match[2]} type ${match[4]} indexedField ${match[6]}`);
                return { cmsfield: match[2], type: match[4], indexedField: match[6], comment: true };
            } else {
                // Items of the form
                // { /*new CmsField("field_name", "FieldType")*/ }
                //console.log(`Found commented field ${match[2]} type ${match[4]}`);
                return { cmsfield: match[2], type: match[4], comment: true };
            }
        }
    }
    // TODO: more complex expressions
    
    const validFields = ["expression","callee","object","arguments"];
    for (let i in validFields) {
        const sub = object[validFields[i]];
        if (sub) {
            if (sub.length && sub.length > 0) {
                for (let j in sub) {
                    let result = processJsxExpressionSub(content, component, sub[j]);
                    if (result) return result;
                }
            } else {
                let result = processJsxExpressionSub(content, component, sub);
                if (result) return result;
            }
        }
    }
    return null;
};

const processJsxElement = (content, component, object, replacements, imports, dependencies) => {
    if (!object || !object.openingElement || !object.openingElement.name
        || !imports.find(i => object.openingElement.name.name === i.name)) return;
    const componentName = object.openingElement.name.name;
    let suffix = "";
    let previouslyUsed = replacements.filter(r => r.component === componentName);
    if (previouslyUsed && previouslyUsed.length > 0) suffix = `_${previouslyUsed.length + 1}`;
    const imp = imports.find(i => object.openingElement.name.name === i.name);
    if (imp.isCmsComponent) {
        addDependency(componentName, dependencies);
        replacements.push({start: object.start, end: object.end, component: componentName, value: `{${componentName}${suffix}:${componentName}}`});
    }
    if (object.children && object.children.length) {
        for (let c of object.children) {
            if (c.type === "JSXElement") processJsxElement(content, component, c, replacements, imports, dependencies);
        }
    }
};

const findCmsFieldFromVariable = (content, component, variable, comment) => {
    let result = findCmsFieldFromVariableSub(content, component, variable);
    if (!result || !result.cmsfield) {
        // Fall back to text
        //console.warn(`No definition found for ${variable}, defaulting to text`);
        //result = { cmsfield: variable, type: "TEXT" };
        // Fall back to remove surrounding { and }
        //console.warn(`COMPONENT: ${_componentName} - No definition found for ${variable}, removing { and }`);
        result = {};
    }
    if (comment) result.comment = true;
    return result;
};

const findCmsFieldFromVariableSub = (content, object, variable) => {
    if (object.type === "VariableDeclaration") {
        let declarator = object.declarations.find(d => d.type === "VariableDeclarator"
            && d.id && d.id.name === variable
            && d.init && d.init.type === "NewExpression"
            && d.init.callee && d.init.callee.type === "Identifier" && d.init.callee.name === "CmsField"
            && d.init.arguments && d.init.arguments.length > 1
            && d.init.arguments[0].type === "StringLiteral"
            && d.init.arguments[1].type === "MemberExpression"
            && d.init.arguments[1].object && d.init.arguments[1].object.type === "Identifier" && d.init.arguments[1].object.name === "CmsFieldTypes"
            && d.init.arguments[1].property);
        if (declarator && declarator.init.arguments.length > 3
            && declarator.init.arguments[3].object && declarator.init.arguments[3].object.type === "Identifier" && declarator.init.arguments[3].object.name === "CmsIndexedField") {
            // Items of the form
            // var variable_name = new CmsField("field_name", CmsFieldTypes.FieldType, something, CmsIndexedField.Type);
            //console.log(`Found ${variable} with field name ${declarator.init.arguments[0].value}, type ${declarator.init.arguments[1].property.name} and indexedField ${declarator.init.arguments[3].property.name}`);
            return {cmsfield: declarator.init.arguments[0].value, type: declarator.init.arguments[1].property.name, indexedField: declarator.init.arguments[3].property.name};
        } else if (declarator) {
            // Items of the form
            // this.variable_name = new CmsField("field_name", CmsFieldTypes.FieldType);
            //console.log(`Found ${variable} with field name ${declarator.init.arguments[0].value} and type ${declarator.init.arguments[1].property.name}`);
            return {cmsfield: declarator.init.arguments[0].value, type: declarator.init.arguments[1].property.name};
        } else {
            declarator = object.declarations.find(d => d.type === "VariableDeclarator"
            && d.id && d.id.name === variable
            && d.init && d.init.type === "NewExpression"
            && d.init.callee && d.init.callee.type === "Identifier" && d.init.callee.name === "CmsField"
            && d.init.arguments && d.init.arguments.length > 1
            && d.init.arguments[0].type === "StringLiteral"
            && d.init.arguments[1].type === "StringLiteral");
            if (declarator && declarator.init.arguments.length > 3
                && declarator.init.arguments[3].object && declarator.init.arguments[3].object.type === "Identifier" && declarator.init.arguments[3].object.name === "CmsIndexedField") {
                // Items of the form
                // var variable_name = new CmsField("field_name", "FieldType", something, CmsIndexedField.Type);
                //console.log(`Found ${variable} with field name ${declarator.init.arguments[0].value}, type ${declarator.init.arguments[1].value} and indexedField ${declarator.init.arguments[3].property.name}`);
                return {cmsfield: declarator.init.arguments[0].value, type: declarator.init.arguments[1].value, indexedField: declarator.init.arguments[3].property.name};
            } else if (declarator) {
                // Items of the form
                // var variable_name = new CmsField("field_name", "FieldType");
                //console.log(`Found ${variable} with field name ${declarator.init.arguments[0].value} and type ${declarator.init.arguments[1].value}`);
                return {cmsfield: declarator.init.arguments[0].value, type: declarator.init.arguments[1].value};
            }
        }
    }

    // Recurse
    const validFields = ["body","expression","callee","object"];
    for (let i in validFields) {
        let sub = object[validFields[i]];
        if (sub) {
            if (!sub.length) sub = [sub];
            for (var j = 0; j < sub.length; j++) {
                let result = findCmsFieldFromVariableSub(content, sub[j], variable);
                if (result) return result;
            }
        }
    }
};

const addDependency = (type, dependencies) => {
    if (utils.isCoreComponent(type)) return;
    if (dependencies.indexOf(type) < 0) dependencies.push(type);
};

const isCmsComponent = (componentName, importDefinition) => {
    //console.log(`Checking ${componentName} (${JSON.stringify(importDefinition)}) for being a CmsComponent`);
    if (!importDefinition || !importDefinition.source) return false;
    const content = getSource(importDefinition.source);
    return content.indexOf(`extends CmsComponent`) > -1 || content.indexOf(`CmsDataCache.setComponent`) > -1;
}

const getSource = (source) => {
    source = path.resolve(path.dirname(_fileName), source);
    if (fs.existsSync(source)) return fs.readFileSync(source);

    for (let i in extensions) {
        const ext = extensions[i];
        if (fs.existsSync(source + ext)) return fs.readFileSync(source + ext);
    }
    return "";
};

const cmsFieldTypeToString = (cmsFieldType) => {
    if (cmsFieldType === "IMAGE") return "Src";
    if (cmsFieldType === cmsFieldType.toUpperCase()) {
        // TODO: robusify this!
        return cmsFieldType[0] + cmsFieldType.substr(1).toLowerCase();
    }
    return cmsFieldType;
};

const cmsIndexedFieldToString = (cmsIndexedField) => {
    if (!cmsIndexedField || cmsIndexedField === "NONE") return "";
    if (cmsIndexedField === "DATETIME") return "IndexedDateTime";
    if (cmsIndexedField === cmsIndexedField.toUpperCase()) {
        // TODO: robusify this!
        return "Indexed" + cmsIndexedField[0] + cmsIndexedField.substr(1).toLowerCase();
    }
    return "Indexed" + cmsIndexedField;
};

module.exports = {
    parse: parse
};