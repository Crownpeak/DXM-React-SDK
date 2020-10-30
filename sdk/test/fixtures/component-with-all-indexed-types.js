import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes, CmsIndexedField } from 'crownpeak-dxm-react-sdk';

export default class ComponentWithAllIndexedTypes extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.field1 = new CmsField("Field1", CmsFieldTypes.TEXT, null);
        this.field2 = new CmsField("Field2", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING);
        this.field3 = new CmsField("Field3", CmsFieldTypes.TEXT, null, CmsIndexedField.TEXT);
        this.field4 = new CmsField("Field4", CmsFieldTypes.TEXT, null, CmsIndexedField.DATETIME);
        this.field5 = new CmsField("Field5", CmsFieldTypes.TEXT, null, CmsIndexedField.INTEGER);
        this.field6 = new CmsField("Field6", CmsFieldTypes.TEXT, null, CmsIndexedField.LONG);
        this.field7 = new CmsField("Field7", CmsFieldTypes.TEXT, null, CmsIndexedField.DOUBLE);
        this.field8 = new CmsField("Field8", CmsFieldTypes.TEXT, null, CmsIndexedField.FLOAT);
        this.field9 = new CmsField("Field9", CmsFieldTypes.TEXT, null, CmsIndexedField.BOOLEAN);
        this.field10 = new CmsField("Field10", CmsFieldTypes.TEXT, null, CmsIndexedField.LOCATION);
        this.field11 = new CmsField("Field11", CmsFieldTypes.TEXT, null, CmsIndexedField.CURRENCY);
        this.field12 = new CmsField("Field12", "SomethingElse", null, CmsIndexedField.STRING);
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
                <h9>{ this.field9 }</h9>
                <h1>{ this.field10 }</h1>
                <h2>{ this.field11 }</h2>
                <h3>{ this.field12 }</h3>
            </div>
        )
    }
}