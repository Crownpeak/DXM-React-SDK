import CmsCore from "../common/cmsCore";
import { CmsDataCache } from "crownpeak-dxm-sdk-core";
import { ReactNode } from "React";

export default class CmsPage extends CmsCore {
    cmsWrapper?: string;
    cmsUseTmf: boolean = false;

    render(): ReactNode
    {
        this.cmsDataProvider.getSingleAsset(this.cmsAssetId);
        CmsDataCache.cmsAssetId = this.cmsAssetId;
        return null;
    }
}