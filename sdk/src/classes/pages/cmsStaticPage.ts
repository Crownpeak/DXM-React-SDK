import CmsPage from "./cmsPage";
import { CmsStaticDataProvider, CmsDataCache } from "crownpeak-dxm-sdk-core";

export default class CmsStaticPage extends CmsPage {
    constructor(props: any) {
        super(props);
        this.cmsDataProvider = new CmsStaticDataProvider();
    }

    private static async _load(assetId: number): Promise<void> {
        await new CmsStaticDataProvider().getSingleAsset(assetId);
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
        new CmsStaticDataProvider().getSingleAssetSync(assetId);
        CmsDataCache.cmsAssetId = assetId;
    }
}