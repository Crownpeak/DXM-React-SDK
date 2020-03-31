import React from 'react';

export default class CmsField
{
    constructor(cmsFieldName, cmsFieldType) {
        this.cmsFieldName = cmsFieldName;
        this.cmsFieldType = cmsFieldType;

        //TODO: Replace this with correct calling logic for field value
        this.cmsFieldValue = cmsFieldName;
    }

    value()
    {
        return this.cmsFieldValue;
    }
}