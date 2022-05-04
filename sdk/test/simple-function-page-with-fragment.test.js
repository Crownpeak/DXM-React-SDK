const assert = require('assert');
const parser = require('../classes/parsers/functionPage');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-function-page-with-fragment.js');
const content = fs.readFileSync(file, 'utf8');
const { pages, uploads } = parser.parse(content, file);

describe('Simple Function Page With Fragment', () => {
    if (pages.length > 0 && pages[0].content && pages[0].content.replace) {
        pages[0].content = pages[0].content.replace(/(?<!\r)\n/g, "\r\n");
    }
    it('should not find any uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should find one page', () => {
        assert.strictEqual(pages.length, 1);
        assert.strictEqual(pages[0].name, "SimplePageWithFragment");
        assert.strictEqual(pages[0].wrapper, "SimpleWrapper");
        assert.strictEqual(pages[0].useTmf, true);
        assert.strictEqual(pages[0].suppressFolder, true);
        assert.strictEqual(pages[0].suppressModel, true);
    });
    it('should find two components', () => {
        assert.strictEqual(pages[0].content, "<h1>{SimpleComponent}</h1>\r\n<h2>{SimpleComponent_2:SimpleComponent}</h2>\r\n");
    });
});