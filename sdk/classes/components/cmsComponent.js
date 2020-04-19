import React from 'react';
import CmsCore from "../common/cmsCore";

export default class CmsComponent extends CmsCore {
    constructor(props) {
        super(props);
        if(!window.cmsDataCache) window.cmsDataCache = {};
        window.cmsDataCache.cmsComponentName = this.constructor.name;
        if (Array.isArray(window.cmsDataCache.cmsComponentName && window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName])) {
            var index = window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName + "-index"];
            if (typeof index === "undefined") index = 0;
            else index++;
            window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName + "-index"] = index;
        }
    }
}