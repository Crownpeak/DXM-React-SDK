import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
import { SimpleComponent } from './simple-component';

export default function SimplePage(props)
{
    /* CmsPage */
    var cmsSuppressFolder = true;
    var cmsSuppressModel = true;
    var cmsUseTmf = true;
    var cmsUseMetadata = true;
    var cmsWrapper = "SimpleWrapper";
    
    return (
        <div>
            <h1><SimpleComponent /></h1>
            <h2><SimpleComponent /></h2>
        </div>
    )
}