import React from 'react';
import CmsCore from "./cmsCore";
import Routing from "../../examples/bootstrap/js/routing";
import CmsDataProvider from "./DataProviders/cmsDataProvider";

export default class CmsPage extends CmsCore {
    constructor(props) {
        super(props);
        if(this.props && this.props.location) this.cmsAssetId = Routing.getCmsAssetId(this.props.location.pathname);
    }

    render()
    {
        const cmsDataProvider = CmsDataProvider.getProvider(this.cmsDataSource);
        cmsDataProvider.getData(this.cmsAssetId);
        window.cmsDataCache.cmsAssetId = this.cmsAssetId;
    }
}