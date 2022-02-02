import { CmsDataCache, ICmsDataProvider, CmsNullDataProvider } from 'crownpeak-dxm-sdk-core';
import * as React from 'react';
import IDropZoneProps from '../components/IDropZoneProps';

export default class CmsCore<T = any> extends React.Component<T> {
    cmsDataProvider: ICmsDataProvider = new CmsNullDataProvider();
    cmsAssetId: number = -1;

    static init(cmsStaticDataLocation: string, cmsDynamicDataLocation: string) {
        CmsDataCache.init(cmsStaticDataLocation, cmsDynamicDataLocation);
    }
}