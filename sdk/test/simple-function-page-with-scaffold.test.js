const assert = require('assert');
const parser = require('../classes/parsers/functionPage');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-function-page-with-scaffold.js');
const content = fs.readFileSync(file, 'utf8');
const { pages, uploads } = parser.parse(content, file);

describe('Simple Function Page With Scaffold', () => {
    it('should not find any uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should find one page', () => {
        assert.strictEqual(pages.length, 1);
        assert.strictEqual(pages[0].name, "SimplePageWithScaffold");
    });
    it('should replace all scaffolds', () => {
        assert.strictEqual(pages[0].content, "<div>\r\n    <p>Before</p>\r\n    <h2>{Heading:Text}</h2>\r\n    <p>Between</p>\r\n    {SupplementaryField:Text}\r\n    <p>After</p>\r\n</div>");
    });
});