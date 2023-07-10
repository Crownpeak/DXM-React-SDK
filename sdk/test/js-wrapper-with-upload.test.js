const assert = require('assert');
const parser = require('../classes/parsers/wrapper');
const fs = require('fs');
const path = require('path');

const file = path.resolve('./test/fixtures/js-wrapper-with-upload.js');
const content = fs.readFileSync(file, 'utf8');
const { wrapper, uploads } = parser.parse(file, content);

describe('JS Wrapper With Upload', () => {
    wrapper.head = wrapper.head.replace(/(?<!\r)\n/g, "\r\n");
    wrapper.foot = wrapper.foot.replace(/(?<!\r)\n/g, "\r\n");
    it('should find one upload', () => {
        assert.strictEqual(uploads.length, 1);
        assert.strictEqual(uploads[0].name, "logo.png");
        assert.strictEqual(uploads[0].destination, "test/fixtures/");
        assert.strictEqual(fs.existsSync(uploads[0].source), true);
    });
    it('should find a wrapper', () => {
        assert.strictEqual(wrapper.name, "JS Wrapper With Upload");
    });
    it('should have the expected header and footer', () => {
        assert.strictEqual(wrapper.head.length, 307);
        assert.strictEqual(wrapper.head.indexOf("<h1>JS Wrapper With Upload</h1>"), 125);
        assert.strictEqual(wrapper.foot.length, 90);
        assert.strictEqual(wrapper.foot.indexOf("<h2>JS Wrapper With Upload</h2>"), 26);
    });
    it('should remap the image path', () => {
        assert.strictEqual(wrapper.head.indexOf("<img src=\"<%= Asset.Load(Asset.GetSiteRoot(asset).AssetPath + \"/test/fixtures/logo.png\").GetLink(LinkType.Include) %>\"/>"), 179);
    });
});