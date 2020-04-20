const dotenv = require("dotenv");
const fs = require("fs");

const main = () => {
    const cwd = process.env.INIT_CWD;
    let config = process.env;
    // Merge in any environment changes they provided
    if (fs.existsSync(cwd + "/.env")) {
        Object.assign(config, dotenv.parse(fs.readFileSync(cwd + "/.env")))
    }

    // Check we have everything we need to work
    if (!validateInput(config)) return;

    const cms = require("./classes/cms");
    cms.init(config);

    const parser = require("./classes/parsers/parser");
    const files = require("./classes/files");

    let components = [], pages = [], wrappers = [], uploads = [];
    const htmlfiles = files.getRecursive(process.env.INIT_CWD, "html");
    for (let f in htmlfiles) {
        //console.log(`Processing ${htmlfiles[f]}`);
        let result = parser.process(htmlfiles[f]);
        if (result.uploads) {
            //console.log(`Found uploads ${JSON.stringify(result.uploads)}`);
            uploads = uploads.concat(result.uploads);
        }
        if (result.wrapper) {
            //console.log(`Found wrapper ${JSON.stringify(result.wrapper)}`);
            wrappers.push(result.wrapper);
        }
    }
    const jsfiles = files.getRecursive(process.env.INIT_CWD, "js");
    for (let f in jsfiles) {
        //console.log(`Processing ${jsfiles[f]}`);
        let result = parser.process(jsfiles[f]);
        if (result.components) {
            //console.log(`Found component definitions ${JSON.stringify(result.components)}`);
            components = components.concat(result.components);
        }
        if (result.pages) {
            //console.log(`Found page definitions ${JSON.stringify(result.pages)}`);
            pages = pages.concat(result.pages);
        }
    }

    // console.log(`Components: ${components.map(c => c.name)}`);
    // console.log(`Pages: ${pages.map(p => p.name)}`);
    // console.log(`Wrappers: ${wrappers.map(w => w.name)}`);
    // console.log(`Uploads: ${uploads.map(u => u.name)}`);

    cms.login()
    .then(() => cms.saveUploads(uploads)) //.then((result) => console.log(JSON.stringify(result))))
    .then(() => cms.saveWrappers(wrappers)) //.then((result) => console.log(JSON.stringify(result))))
    .then(() => cms.saveComponents(components)) //.then((result) => console.log(JSON.stringify(result))))
    .then(() => cms.saveTemplates(pages, wrappers.length > 0 ? wrappers[0].name : "")) //.then((result) => console.log(JSON.stringify(result))))
    ;
};

const validateInput = (config) => {
    let ok = true;
    if (!config.CMS_INSTANCE) {
        console.error("Fatal error: CMS_INSTANCE not set");
        ok = false;
    }
    if (!config.CMS_USERNAME) {
        console.error("Fatal error: CMS_USERNAME not set");
        ok = false;
    }
    if (!config.CMS_PASSWORD) {
        console.error("Fatal error: CMS_PASSWORD not set");
        ok = false;
    }
    if (!config.CMS_API_KEY) {
        console.error("Fatal error: CMS_API_KEY not set");
        ok = false;
    }
    if (!config.CMS_SITE_ROOT) {
        console.error("Fatal error: CMS_SITE_ROOT not set");
        ok = false;
    }
    if (!config.CMS_PROJECT) {
        console.error("Fatal error: CMS_PROJECT not set");
        ok = false;
    }
    if (!config.CMS_WORKFLOW) {
        console.warn("Warning: CMS_WORKFLOW not set; defaulting to no workflow");
    }
    return ok;
};

main();