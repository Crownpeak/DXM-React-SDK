const assert = require('assert');
const parser = require('../classes/parsers/functionComponent');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-function-component-with-fragment.js');
const content = fs.readFileSync(file, 'utf8');
const { components, uploads } = parser.parse(content, file);

describe('Simple Function Component With Fragment', () => {
    if (components.length > 0 && components[0].content && components[0].content.replace) {
        components[0].content = components[0].content.replace(/(?<!\r)\n/g, "\r\n");
    }
    it('should not find any uploads', () => {
        assert.strictEqual(uploads.length, 0);
    });
    it('should not find any dependencies', () => {
        assert.strictEqual(components[0].dependencies.length, 0);
    });
    it('should find one component', () => {
        assert.strictEqual(components.length, 1);
        assert.strictEqual(components[0].name, "SimpleComponent");
        assert.strictEqual(components[0].folder, "Simple Subfolder");
        assert.strictEqual(components[0].zones.length, 1);
        assert.strictEqual(components[0].zones[0], "simple-zone");
    });
    it('should find twelve normal fields', () => {
        assert.strictEqual(components[0].content.indexOf("<h1>{Field1:Text}</h1>"), 0);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field2:Text}</h1>"), 24);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field3:Text:IndexedString}</h1>"), 48);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field4:Text}</h1>"), 86);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field5:Text}</h1>"), 110);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field6:Text:IndexedString}</h1>"), 134);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field7:Text}</h1>"), 172);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field8:Text}</h1>"), 196);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field9:Text:IndexedString}</h1>"), 220);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field10:Text}</h1>"), 258);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field11:Text}</h1>"), 283);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field12:Text:IndexedString}</h1>"), 308);
    });
    it('should find twelve commented fields', () => {
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field13:Text} --></h1>"), 347);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field14:Text} --></h1>"), 381);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field15:Text:IndexedString} --></h1>"), 415);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field16:Text} --></h1>"), 463);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field17:Text} --></h1>"), 497);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field18:Text:IndexedString} --></h1>"), 531);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field19:Text} --></h1>"), 579);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field20:Text} --></h1>"), 613);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field21:Text:IndexedString} --></h1>"), 647);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field22:Text} --></h1>"), 695);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field23:Text} --></h1>"), 729);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field24:Text:IndexedString} --></h1>"), 763);
    });
});