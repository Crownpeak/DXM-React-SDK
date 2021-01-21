import CmsPage from "./cmsPage";
import { CmsStaticDataProvider } from "crownpeak-dxm-sdk-core";

export default class CmsStaticPage extends CmsPage {
    constructor(props: any) {
        super(props);
        this.cmsDataProvider = new CmsStaticDataProvider();
    }

    static load(assetId: number, useState: Function, useEffect: Function, timeout?: number, loadedCallback?: (data: object, assetId: number) => object | void, errorCallback?: (exception: any, assetId: number) => void): boolean {
        return CmsPage.loadForProvider(new CmsStaticDataProvider(), assetId, useState, useEffect, timeout, loadedCallback, errorCallback);
    }

    static loadSync(assetId: number): void {
        CmsPage.loadForProviderSync(new CmsStaticDataProvider(), assetId);
    }
}