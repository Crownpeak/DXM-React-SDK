const assert = require('assert');
const parser = require('../classes/parsers/component');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/simple-component-tsx.tsx');
const content = fs.readFileSync(file, 'utf8');
const { components, uploads } = parser.parse(content, file);

describe('Simple TSX Component', () => {
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
        assert.strictEqual(components[0].content.indexOf("<h1>{Field1:Text}</h1>"), 11);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field2:Text}</h1>"), 39);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field3:Text:IndexedString}</h1>"), 67);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field4:Text}</h1>"), 109);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field5:Text}</h1>"), 137);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field6:Text:IndexedString}</h1>"), 165);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field7:Text}</h1>"), 207);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field8:Text}</h1>"), 235);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field9:Text:IndexedString}</h1>"), 263);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field10:Text}</h1>"), 305);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field11:Text}</h1>"), 334);
        assert.strictEqual(components[0].content.indexOf("<h1>{Field12:Text:IndexedString}</h1>"), 363);
    });
    it('should find twelve commented fields', () => {
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field13:Text} --></h1>"), 406);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field14:Text} --></h1>"), 444);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field15:Text:IndexedString} --></h1>"), 482);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field16:Text} --></h1>"), 534);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field17:Text} --></h1>"), 572);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field18:Text:IndexedString} --></h1>"), 610);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field19:Text} --></h1>"), 662);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field20:Text} --></h1>"), 700);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field21:Text:IndexedString} --></h1>"), 738);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field22:Text} --></h1>"), 790);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field23:Text} --></h1>"), 828);
        assert.strictEqual(components[0].content.indexOf("<h1><!-- {Field24:Text:IndexedString} --></h1>"), 866);
    });
});