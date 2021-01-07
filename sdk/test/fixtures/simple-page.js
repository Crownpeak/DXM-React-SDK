import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
import { SimpleComponent } from './simple-component';

export default class SimplePage extends CmsStaticPage
{
    constructor(props)
    {
        super(props);
        this.cmsAssetId = 12345;
        this.cmsSuppressFolder = true;
        this.cmsSuppressModel = true;
        this.cmsUseTmf = true;
        this.cmsUseMetadata = true;
        this.cmsWrapper = "SimpleWrapper";
    }

    render() {
        super.render();
        return (
            this.state.isLoaded &&
            <div>
                <h1><SimpleComponent /></h1>
                <h2><SimpleComponent /></h2>
            </div>
        )
    }
}