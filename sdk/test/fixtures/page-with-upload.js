import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
import { SimpleComponent } from './simple-component';

export default class PageWithUpload extends CmsStaticPage
{
    constructor(props)
    {
        super(props);
        this.cmsAssetId = 12345;
    }

    render() {
        super.render();
        return (
            this.state.isLoaded &&
            <div>
                <h1><SimpleComponent /></h1>
                <img src="./logo.png"/>
            </div>
        )
    }
}