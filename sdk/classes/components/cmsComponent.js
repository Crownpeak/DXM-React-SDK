import React from 'react';
import CmsCore from "../common/cmsCore";

export default class CmsComponent extends CmsCore {
    constructor(props) {
        super(props);
        if(!window.cmsDataCache) window.cmsDataCache = {};
        window.cmsDataCache.cmsComponentName = this.constructor.name;
    }
}