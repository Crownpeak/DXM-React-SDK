const fs = require("fs");
const componentParser = require("./component");
const functionComponentParser = require("./functionComponent");
const pageParser = require("./page");
const functionPageParser = require("./functionPage");
const wrapperParser = require("./wrapper");

const reComponent = new RegExp("class .*? extends CmsComponent");
const reFunctionComponent = new RegExp("CmsDataCache.setComponent\\s*\\(");
const rePage = new RegExp("class .*? extends Cms(Dynamic|Static)Page");
const reFunctionPage = new RegExp("Cms(Dynam|Stat)icPage.load(?:Sync)?\\s*\\(");
const reWrapper = new RegExp("data-cms-wrapper-name=");

const process = (file) => {
    let content = fs.readFileSync(file, "utf8");
    if (!content) {
        console.log(`Skipping empty file ${file}`);
        return {};
    }

    let components = [], pages = [], wrapper = null, uploads = [];

    if (reComponent.test(content)) {
        //console.log(`Found component in ${file}`);
        const temp = componentParser.parse(content, file);
        components = temp.components;
        uploads = temp.uploads;
    }
    else if (reFunctionComponent.test(content)) {
        //console.log(`Found component in ${file}`);
        const temp = functionComponentParser.parse(content, file);
        components = temp.components;
        uploads = temp.uploads;
    }
    if (rePage.test(content)) {
        //console.log(`Found page in ${file}`)
        const temp = pageParser.parse(content, file);
        pages = temp.pages;
        uploads = temp.uploads;
    }
    else if (reFunctionPage.test(content)) {
        //console.log(`Found page in ${file}`)
        const temp = functionPageParser.parse(content, file);
        pages = temp.pages;
        uploads = temp.uploads;
    }
    if (reWrapper.test(content)) {
        //console.log(`Found wrapper in ${file}`)
        const temp = wrapperParser.parse(file, content);
        wrapper = temp.wrapper;
        uploads = temp.uploads;
    }

    let result = {};
    if (components && components.length > 0) result.components = components;
    if (pages && pages.length > 0) result.pages = pages;
    if (wrapper) result.wrapper = wrapper;
    if (uploads && uploads.length > 0) result.uploads = uploads;
    return result;
};

module.exports = {
    process: process
};