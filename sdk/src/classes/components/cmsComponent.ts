import { CmsDataCache, CmsDataSource } from 'crownpeak-dxm-sdk-core';
import CmsCore from "../common/cmsCore";

export default class CmsComponent<T = any> extends CmsCore<T> {
    cmsFolder?: string = "";
    cmsZones?: string[] = [];
    cmsDisableDragDrop?: boolean = false;
    constructor(props: any) {
        super(props);
        CmsDataCache.cmsComponentName = this.constructor.name;
        const dataSource = ((props["data-source"] || CmsDataCache.get(CmsDataCache.cmsAssetId))[CmsDataCache.cmsComponentName]) as CmsDataSource;
        CmsDataCache.dataSource = dataSource;
        if (Array.isArray(dataSource)) {
            let index = dataSource.index;
            if (typeof index === "undefined" || isNaN(index)) index = 0;
            else index++;
            dataSource.index = index;
        }
    }
}