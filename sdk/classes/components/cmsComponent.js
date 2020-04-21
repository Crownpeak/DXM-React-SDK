import React from 'react';
import CmsCore from "../common/cmsCore";

export default class CmsComponent extends CmsCore {
    constructor(props) {
        super(props);
        if (!window.cmsDataCache) window.cmsDataCache = {};
        window.cmsDataCache.cmsComponentName = this.constructor.name;
        const dataSource = (props["data-source"] || window.cmsDataCache[window.cmsDataCache.cmsAssetId])[window.cmsDataCache.cmsComponentName];
        window.cmsDataCache.dataSource = dataSource;
        if (Array.isArray(dataSource)) {
            var index = dataSource.index;
            if (typeof index === "undefined") index = 0;
            else index++;
            dataSource.index = index;
        }
    }
}