import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';

export default class ComponentWithAllFieldTypes extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.field1 = new CmsField("Field1", CmsFieldTypes.TEXT, null);
        this.field2 = new CmsField("Field2", CmsFieldTypes.WYSIWYG, null);
        this.field3 = new CmsField("Field3", CmsFieldTypes.DATE, null);
        this.field4 = new CmsField("Field4", CmsFieldTypes.DOCUMENT, null);
        this.field5 = new CmsField("Field5", CmsFieldTypes.IMAGE, null);
        this.field6 = new CmsField("Field6", CmsFieldTypes.HREF, null);
        this.field7 = new CmsField("Field7", CmsFieldTypes.WIDGET, null);
        this.field8 = new CmsField("Field8", "SomethingElse", null);
    }

    render () {
        return (
            <div>
                <h1>{ this.field1 }</h1>
                <h2>{ this.field2 }</h2>
                <h3>{ this.field3 }</h3>
                <h4>{ this.field4 }</h4>
                <h5>{ this.field5 }</h5>
                <h6>{ this.field6 }</h6>
                <h7>{ this.field7 }</h7>
                <h8>{ this.field8 }</h8>
            </div>
        )
    }
}