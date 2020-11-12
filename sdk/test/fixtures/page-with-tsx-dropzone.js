import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
import DropZone from './tsx-dropzone-component';

export default class PageWithTSXDropZone extends CmsStaticPage
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