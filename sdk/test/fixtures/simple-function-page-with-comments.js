import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';
import { SimpleComponent } from './simple-component';

export default function SimplePageWithComments(props)
{
    let isLoaded = CmsStaticPage.load(266812, useState, useEffect);
    
    return (
        isLoaded &&
        <div>
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
        </div>
    )
}