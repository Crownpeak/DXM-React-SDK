const assert = require('assert');
const parser = require('../classes/parsers/functionComponent');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-function-component-with-non-crownpeak.js');
const content = fs.readFileSync(file, 'utf8');
const { components, uploads } = parser.parse(content, file);

describe('Simple Function Component With Non-Crownpeak', () => {
    if (components.length > 0 && components[0].content && components[0].content.replace) {
        components[0].content = components[0].content.replace(/(?<!\r)\n/g, "\r\n");
    }
    it('should find no uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should find one component', () => {
        assert.strictEqual(components.length, 1);
        assert.strictEqual(components[0].name, "SimpleComponentWithNonCrownpeak");
    });
    it('should replace the components correctly', () => {
        assert.strictEqual(components[0].content, "<div>\r\n    {Field1:Text}\r\n    {SimpleComponent:SimpleComponent}\r\n    <NonCrownpeakFunctionComponent />\r\n</div>");
    });
});