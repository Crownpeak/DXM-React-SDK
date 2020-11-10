import React from 'react';

import {CmsDataCache, CmsField, CmsFieldTypes} from 'crownpeak-dxm-react-sdk';

const MainNavigation = (props) => {
    CmsDataCache.setComponent("MainNavigation");
    const heading: CmsField = new CmsField('heading', CmsFieldTypes.TEXT, props?.heading);
    return (
        <div>{heading}</div>
    )
}

export default MainNavigation;