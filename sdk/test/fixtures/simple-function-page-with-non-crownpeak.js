import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
import SimpleComponent from './simple-function-component';
import NonCrownpeakFunctionComponent from './non-crownpeak-function-component';

export default function SimplePageWithNonCrownpeak(props)
{
    let isLoaded = CmsStaticPage.load(266812, useState, useEffect);
    
    return (
        isLoaded &&
        <div>
            <h1><SimpleComponent /></h1>
            <h2><NonCrownpeakFunctionComponent /></h2>
        </div>
    )
}