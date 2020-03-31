import React from 'react';
import CmsDataSource from '../enum/cmsDataSource';

export default class CmsCore extends React.Component
{
    constructor(props)
    {
        super(props);
        this.cmsDataSource = CmsDataSource.STATIC;
    }
}