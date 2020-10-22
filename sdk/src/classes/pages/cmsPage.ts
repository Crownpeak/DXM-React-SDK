import CmsCore from "../common/cmsCore";
import { CmsDataCache } from "crownpeak-dxm-sdk-core";
import { ReactNode } from "React";

export default class CmsPage extends CmsCore {
    cmsWrapper?: string;
    cmsUseTmf: boolean = false;
    cmsSuppressFolder: boolean = false;
    cmsSuppressModel: boolean = false;
    state = { isLoaded: false };

    render(): ReactNode
    {
        if (this.state.isLoaded) return null;
        const that = this;
        this.cmsDataProvider.getSingleAsset(this.cmsAssetId).then(() => that.setState({ isLoaded: true }));
        CmsDataCache.cmsAssetId = this.cmsAssetId;
        return null;
    }
}