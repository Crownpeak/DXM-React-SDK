import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';

export default class PageWithDropZone extends CmsStaticPage
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
                <DropZone name="dropzone"/>
            </div>
        )
    }
}