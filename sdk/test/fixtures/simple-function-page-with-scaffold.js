import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';

export default function SimplePageWithScaffold(props)
{
    let isLoaded = CmsStaticPage.load(266812, useState, useEffect);
    
    return (
        isLoaded &&
        <div>
            <p>Before</p>
            {/* cp-scaffold 
            <h2>{Heading:Text}</h2>
            else */}
            <h2>{ "not present" }</h2>
            {/* /cp-scaffold */}
            <p>Between</p>
            {/* cp-scaffold 
            {SupplementaryField:Text}
            /cp-scaffold */}
            <p>After</p>
        </div>
    )
}