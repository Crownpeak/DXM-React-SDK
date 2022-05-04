const assert = require('assert');
const parser = require('../classes/parsers/functionPage');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-function-page-with-non-crownpeak.js');
const content = fs.readFileSync(file, 'utf8');
const { pages, uploads } = parser.parse(content, file);

describe('Simple Function Page With Non-Crownpeak', () => {
    if (pages.length > 0 && pages[0].content && pages[0].content.replace) {
        pages[0].content = pages[0].content.replace(/(?<!\r)\n/g, "\r\n");
    }
    it('should not find any uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should find one page', () => {
        assert.strictEqual(pages.length, 1);
        assert.strictEqual(pages[0].name, "SimplePageWithNonCrownpeak");
    });
    it('should find one component', () => {
        assert.strictEqual(pages[0].content, "<div>\r\n    <h1>{SimpleComponent}</h1>\r\n    <h2><NonCrownpeakFunctionComponent /></h2>\r\n</div>");
    });
});