import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
import { SimpleComponent } from './simple-component';

export default class PageWithFragment extends CmsStaticPage
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
            <>
                {/* delete */}
                { /* delete */ }
                {/* 
                delete
                 */}
                {/* delete
                 */}
                {/* 
                delete */}
                <h1><SimpleComponent /></h1>
                <p>keep {/* delete */} keep</p>
            </>
        )
    }
}