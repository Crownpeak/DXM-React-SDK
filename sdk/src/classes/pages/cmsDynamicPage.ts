import CmsPage from "./cmsPage";
import { CmsDynamicDataProvider } from "crownpeak-dxm-sdk-core";

export default class CmsDynamicPage extends CmsPage {
    constructor(props: any) {
        super(props);
        this.cmsDataProvider = new CmsDynamicDataProvider();
    }

    static load(assetId: number, useState: Function, useEffect: Function, timeout?: number, loadedCallback?: (data: object, assetId: number) => object | void, errorCallback?: (exception: any, assetId: number) => void, beforeLoadingCallback?: (options: XMLHttpRequest | RequestInit) => void): boolean {
        return CmsPage.loadForProvider(new CmsDynamicDataProvider(), assetId, useState, useEffect, timeout, loadedCallback, errorCallback, beforeLoadingCallback);
    }

    static loadSync(assetId: number, beforeLoadingCallback?: (options: XMLHttpRequest | RequestInit) => void): void {
        CmsPage.loadForProviderSync(new CmsDynamicDataProvider(), assetId, beforeLoadingCallback);
    }
}