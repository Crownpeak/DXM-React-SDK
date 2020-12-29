import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
import SimpleComponent from './simple-component';
import NonCrownpeakComponent from './non-crownpeak-component';

export default class PageWithNonCrownpeak extends CmsStaticPage
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
                <h2><NonCrownpeakComponent /></h2>
            </div>
        )
    }
}