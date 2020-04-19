export default class CmsField extends String
{
    constructor(cmsFieldName, cmsFieldType) {
        super();
        this.cmsFieldName = cmsFieldName;
        this.cmsFieldType = cmsFieldType;
    }

    [Symbol.toPrimitive](hint)
    {
        if(window.cmsDataCache.cmsComponentName && window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName]) {
            if (Array.isArray(window.cmsDataCache.cmsComponentName && window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName])) {
                var index = window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName + "-index"];
                return window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName][index][this.cmsFieldName];
            }
            return window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName][this.cmsFieldName];
        }
        return this.cmsFieldName;
    }
}