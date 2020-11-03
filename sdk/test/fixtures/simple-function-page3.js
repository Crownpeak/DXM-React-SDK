import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
import { SimpleComponent } from './simple-component';

export function SimplePage(props)
{
    let isLoaded = CmsStaticPage.load(266812, useState, useEffect);
    var cmsSuppressFolder = true;
    var cmsSuppressModel = true;
    var cmsUseTmf = true;
    var cmsWrapper = "SimpleWrapper";
    
    return (
        isLoaded &&
        <div>
            <h1><SimpleComponent /></h1>
            <h2><SimpleComponent /></h2>
        </div>
    )
}