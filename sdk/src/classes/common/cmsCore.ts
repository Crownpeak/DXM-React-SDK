import { CmsDataCache, ICmsDataProvider, CmsNullDataProvider } from 'crownpeak-dxm-sdk-core';
import * as React from 'react';

export default class CmsCore extends React.Component {
    cmsDataProvider: ICmsDataProvider = new CmsNullDataProvider();
    cmsAssetId: number = -1;

    static init(cmsStaticDataLocation: string, cmsDynamicDataLocation: string) {
        CmsDataCache.init(cmsStaticDataLocation, cmsDynamicDataLocation);
    }
}