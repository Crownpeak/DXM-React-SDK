import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';
import { ComponentWithUpload } from './component-with-upload';
import { ComponentWithList } from './component-with-list';

export default class ComponentWithSubcomponents extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.field1 = new CmsField("Field1", CmsFieldTypes.TEXT);
    }

    render () {
        return (
            <div>
                <h1>{ this.field1 }</h1>
                <h2><ComponentWithUpload/></h2>
                <h3><ComponentWithList/></h3>
            </div>
        )
    }
}