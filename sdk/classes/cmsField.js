import React from 'react';
import CmsFieldTypes from "../enum/cmsFieldTypes";
import ReactHtmlParser from 'react-html-parser';

export default class CmsField
{
    constructor(cmsFieldName, cmsFieldType) {
        this.cmsFieldName = cmsFieldName;
        this.cmsFieldType = cmsFieldType;
    }

    value()
    {
        if(window.cmsDataCache.cmsComponentName && window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName])
        {
            const fieldValue = window.cmsDataCache[window.cmsDataCache.cmsAssetId][window.cmsDataCache.cmsComponentName][this.cmsFieldName];
            if (this.cmsFieldType === CmsFieldTypes.WYSIWYG) return ReactHtmlParser(fieldValue);
            return fieldValue;
        }
        return this.cmsFieldName;
    }
}