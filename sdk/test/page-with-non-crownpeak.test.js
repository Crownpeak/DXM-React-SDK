const assert = require('assert');
const parser = require('../classes/parsers/page');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/page-with-non-crownpeak.js');
const content = fs.readFileSync(file, 'utf8');
const { pages, uploads } = parser.parse(content, file);

describe('Page With Non-Crownpeak', () => {
    it('should not find any uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should find one page', () => {
        assert.strictEqual(pages.length, 1);
        assert.strictEqual(pages[0].name, "PageWithNonCrownpeak");
    });
    it('should find one component', () => {
        assert.strictEqual(pages[0].content, "<div>\r\n    <h1>{SimpleComponent}</h1>\r\n    <h2><NonCrownpeakComponent /></h2>\r\n</div>");
    });
});