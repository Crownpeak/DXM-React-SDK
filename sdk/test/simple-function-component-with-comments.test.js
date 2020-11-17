const assert = require('assert');
const parser = require('../classes/parsers/functionComponent');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-function-component-with-comments.js');
const content = fs.readFileSync(file, 'utf8');
const { components, uploads } = parser.parse(content, file);

describe('Simple Function Component With Comments', () => {
    it('should find no uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should find one component', () => {
        assert.strictEqual(components.length, 1);
        assert.strictEqual(components[0].name, "SimpleComponentWithComments");
    });
    it('should add a dependency on ListItem', () => {
        assert.strictEqual(components[0].dependencies.length, 1);
        assert.strictEqual(components[0].dependencies[0], "ListItem");
    });
    it('should remove all React-style comments', () => {
        assert.strictEqual(components[0].content.indexOf("delete"), -1);
    });
    it('should replace the list code with cp-list', () => {
        assert.strictEqual(components[0].content.indexOf("<cp-list name=\"List\">\r\n      {Field:ListItem}\r\n    </cp-list>\r\n    <p>keep  keep</p>"), 11);
    });
});