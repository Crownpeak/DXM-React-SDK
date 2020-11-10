const assert = require('assert');
const parser = require('../classes/parsers/functionComponent');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-function-component-tsx.tsx');
const content = fs.readFileSync(file, 'utf8');
const { components, uploads } = parser.parse(content, file);

describe('Simple Function Component in TSX', () => {
    it('should not find any uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should not find any dependencies', () => {
        assert.strictEqual(components[0].dependencies.length, 0);
    });
    it('should find one component', () => {
        assert.strictEqual(components.length, 1);
        assert.strictEqual(components[0].name, "MainNavigation");
        assert.strictEqual(components[0].content, "<div>{heading:Text}</div>");
    });
});