import React from 'react';
import CmsCore from "../common/cmsCore";

export default class CmsPage extends CmsCore {
    async render ()
    {
        this.cmsDataProvider.getSingleAsset(this.cmsAssetId);
        window.cmsDataCache.cmsAssetId = this.cmsAssetId;
    }
}