import CmsPage from "./cmsPage";
import { CmsDynamicDataProvider, CmsDataCache } from "crownpeak-dxm-sdk-core";

export default class CmsDynamicPage extends CmsPage {
    constructor(props: any) {
        super(props);
        this.cmsDataProvider = new CmsDynamicDataProvider();
    }

    private static async _load(assetId: number): Promise<void> {
        await new CmsDynamicDataProvider().getSingleAsset(assetId);
        CmsDataCache.cmsAssetId = assetId;
    }

    static load(assetId: number, useState: Function, useEffect: Function): boolean {
        let [isLoaded, setIsLoaded] = useState(false);
        useEffect(() => {
            this._load(assetId).then(() => setIsLoaded(true));
        });
        return isLoaded;
    }

    static loadSync(assetId: number): void {
        new CmsDynamicDataProvider().getSingleAssetSync(assetId);
        CmsDataCache.cmsAssetId = assetId;
    }
}