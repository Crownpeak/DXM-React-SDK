import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';

export default class ComponentWithDisableDragDropUndefined extends CmsComponent
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
            </div>
        )
    }
}