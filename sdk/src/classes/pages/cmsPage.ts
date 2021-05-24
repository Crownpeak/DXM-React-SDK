import CmsCore from "../common/cmsCore";
import { CmsDataCache, ICmsDataProvider } from "crownpeak-dxm-sdk-core";
import { ReactNode } from "React";

export default class CmsPage extends CmsCore {
    cmsWrapper?: string;
    cmsUseTmf: boolean = false;
    cmsUseMetadata: boolean = false;
    cmsSuppressFolder: boolean = false;
    cmsSuppressModel: boolean = false;
    cmsLoadDataTimeout?: number;
    state = { isLoaded: false };
    cmsDataLoaded?: (data: object, assetId: number) => object;
    cmsDataError?: (exception: any, assetId: number) => void;
    cmsBeforeLoadingData?: (options: XMLHttpRequest | RequestInit) => void;

    protected static loadForProvider(provider: ICmsDataProvider, assetId: number, useState: Function, useEffect: Function, timeout?: number, loadedCallback?: (data: object, assetId: number) => object | void, errorCallback?: (exception: any, assetId: number) => void, beforeLoadingCallback?: (options: XMLHttpRequest | RequestInit) => void): boolean {
        let [isLoaded, setIsLoaded] = useState(false);
        useEffect(() => {
            let isError = false;
            provider.setPreLoad(beforeLoadingCallback);
            provider.getSingleAsset(assetId, timeout).catch((ex) => {
                isError = true;
                if (errorCallback) errorCallback(ex, assetId);
                else console.error(ex);
            }).then(() => {
                if (!isError) {
                    if (loadedCallback) CmsDataCache.set(assetId, loadedCallback(CmsDataCache.get(assetId), assetId) || CmsDataCache.get(assetId));
                    setIsLoaded(true);
                }
            });
        }, [assetId, timeout, loadedCallback, errorCallback]);
        CmsDataCache.cmsAssetId = assetId;
        return isLoaded;
    }

    protected static loadForProviderSync(provider: ICmsDataProvider, assetId: number, beforeLoadingCallback?: (options: XMLHttpRequest | RequestInit) => void): void {
        provider.setPreLoad(beforeLoadingCallback);
        provider.getSingleAssetSync(assetId);
        CmsDataCache.cmsAssetId = assetId;
    }

    render(): ReactNode
    {
        if (this.state.isLoaded) return null;
        const that = this;
        let isError = false;
        this.cmsDataProvider.setPreLoad(this.cmsBeforeLoadingData);
        this.cmsDataProvider.getSingleAsset(this.cmsAssetId, this.cmsLoadDataTimeout).catch((ex) => {
            isError = true;
            if (that.cmsDataError) that.cmsDataError(ex, that.cmsAssetId);
            else console.error(ex);
        }).then(() => {
            if (!isError) {
                if (that.cmsDataLoaded) CmsDataCache.set(that.cmsAssetId, that.cmsDataLoaded(CmsDataCache.get(that.cmsAssetId), that.cmsAssetId) || CmsDataCache.get(that.cmsAssetId));
                that.setState({ isLoaded: true });
            }
        });
        CmsDataCache.cmsAssetId = this.cmsAssetId;
        return null;
    }
}