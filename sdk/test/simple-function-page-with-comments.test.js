const assert = require('assert');
const parser = require('../classes/parsers/functionPage');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-function-page-with-comments.js');
const content = fs.readFileSync(file, 'utf8');
const { pages, uploads } = parser.parse(content, file);

describe('Simple Function Page With Comments', () => {
    it('should not find any uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should find one page', () => {
        assert.strictEqual(pages.length, 1);
        assert.strictEqual(pages[0].name, "SimplePageWithComments");
    });
    it('should remove all React-style comments', () => {
        assert.strictEqual(pages[0].content.indexOf("delete"), -1);
    });
    it('should find one component', () => {
        assert.strictEqual(pages[0].content, "<div>\r\n    <h1>{SimpleComponent}</h1>\r\n    <p>keep  keep</p>\r\n</div>");
    });
});