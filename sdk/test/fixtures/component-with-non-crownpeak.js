import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';
import SimpleComponent from './simple-component';
import NonCrownpeakComponent from './non-crownpeak-component';

export default class SimpleComponentWithNonCrownpeak extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.field1 = new CmsField("Field1", CmsFieldTypes.TEXT, null);
    }

    render () {
        return (
            <div>
            { this.field1 }
            <SimpleComponent />
            <NonCrownpeakComponent />
        </div>
        )
    }
}