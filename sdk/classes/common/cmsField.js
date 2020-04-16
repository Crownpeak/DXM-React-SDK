export default class CmsField extends String
{
    constructor(cmsFieldName, cmsFieldType) {
        super();
        this.cmsFieldName = cmsFieldName;
        this.cmsFieldType = cmsFieldType;
    }

    [Symbol.toPrimitive](hint)
    {
        if(window.cmsDataCache.cmsComponentName && window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName])
            return window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName][this.cmsFieldName];
        return this.cmsFieldName;
    }
}