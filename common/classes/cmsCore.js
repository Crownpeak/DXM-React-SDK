import React from 'react';

export default class CmsCore extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    static init(cmsStaticDataLocation, cmsDynamicDataLocation)
    {
        window.cmsDataCache = {
            cmsStaticDataLocation:cmsStaticDataLocation,
            cmsDynamicDataLocation:cmsDynamicDataLocation
        };
    }
}