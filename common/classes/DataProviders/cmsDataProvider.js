import CmsDataSource from "../../enum/cmsDataSource";
import CmsStaticDataProvider from "./cmsStaticDataProvider";
import CmsDynamicDataProvider from "./cmsDynamicDataProvider";

export default class CmsDataProvider
{
    static getData(assetId) {}

    static getProvider(cmsDataSource)
    {
        switch(cmsDataSource)
        {
            case CmsDataSource.STATIC:
                return CmsStaticDataProvider;
            case CmsDataSource.DYNAMIC:
                return CmsDynamicDataProvider;
        }
    }
}