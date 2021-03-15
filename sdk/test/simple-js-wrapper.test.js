const assert = require('assert');
const parser = require('../classes/parsers/wrapper');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-js-wrapper.js');
const content = fs.readFileSync(file, 'utf8');
const { wrapper, uploads } = parser.parse(file, content);

describe('Simple JS Wrapper', () => {
    it('should not find any uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should find a wrapper', () => {
        assert.strictEqual(wrapper.name, "Simple JS Wrapper");
    });
    it('should have the expected header and footer', () => {
        assert.strictEqual(wrapper.head.length, 169);
        assert.strictEqual(wrapper.head.indexOf("<h1>Simple JS Wrapper</h1>"), 120);
        assert.strictEqual(wrapper.foot.length, 85);
        assert.strictEqual(wrapper.foot.indexOf("<h2>Simple JS Wrapper</h2>"), 26);
    });
});