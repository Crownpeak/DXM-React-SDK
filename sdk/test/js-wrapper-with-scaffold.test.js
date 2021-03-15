const assert = require('assert');
const parser = require('../classes/parsers/wrapper');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/js-wrapper-with-scaffold.js');
const content = fs.readFileSync(file, 'utf8');
const { wrapper, uploads } = parser.parse(file, content);

describe('JS Wrapper With Scaffold', () => {
    it('should find no uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should find a wrapper', () => {
        assert.strictEqual(wrapper.name, "JS Wrapper With Scaffold");
    });
    it('should have the expected header and footer', () => {
        assert.strictEqual(wrapper.head.length, 212);
        assert.strictEqual(wrapper.head.indexOf("<h1>JS Wrapper With Scaffold</h1>"), 156);
        assert.strictEqual(wrapper.foot.length, 92);
        assert.strictEqual(wrapper.foot.indexOf("<h2>JS Wrapper With Scaffold</h2>"), 26);
    });
    it('should have processed cp-scaffolds', () => {
        assert.strictEqual(wrapper.head.indexOf("cp-scaffold"), -1);
        assert.strictEqual(wrapper.head.indexOf("else"), -1);
        assert.strictEqual(wrapper.head.indexOf("{metadata}"), 105);
        assert.strictEqual(wrapper.head.indexOf("present"), 92);
        assert.strictEqual(wrapper.head.indexOf("absent"), -1);
    });
});