import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes, CmsIndexedField } from 'crownpeak-dxm-react-sdk';

export default class SimpleComponent extends CmsComponent
{
    field1: CmsField
    field2: CmsField
    field3: CmsField
    field4: CmsField
    field5: CmsField
    field6: CmsField
    field7: CmsField
    field8: CmsField
    field9: CmsField
    field10: CmsField
    field11: CmsField
    field12: CmsField
    field13: CmsField
    field14: CmsField
    field15: CmsField
    field19: CmsField
    field20: CmsField
    field21: CmsField

    constructor(props:any)
    {
        super(props);
        this.field1 = new CmsField("Field1", CmsFieldTypes.TEXT);
        this.field2 = new CmsField("Field2", CmsFieldTypes.TEXT, null);
        this.field3 = new CmsField("Field3", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING);
        this.field4 = new CmsField("Field4", "Text");
        this.field5 = new CmsField("Field5", "Text", null);
        this.field6 = new CmsField("Field6", "Text", null, CmsIndexedField.STRING);
        this.field7 = new CmsField("Field7", CmsFieldTypes.TEXT);
        this.field8 = new CmsField("Field8", CmsFieldTypes.TEXT, null);
        this.field9 = new CmsField("Field9", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING);
        this.field10 = new CmsField("Field10", "Text");
        this.field11 = new CmsField("Field11", "Text", null);
        this.field12 = new CmsField("Field12", "Text", null, CmsIndexedField.STRING);
        this.field13 = new CmsField("Field13", CmsFieldTypes.TEXT);
        this.field14 = new CmsField("Field14", CmsFieldTypes.TEXT, null);
        this.field15 = new CmsField("Field15", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING);
        this.field19 = new CmsField("Field19", "Text");
        this.field20 = new CmsField("Field20", "Text", null);
        this.field21 = new CmsField("Field21", "Text", null, CmsIndexedField.STRING);
        this.cmsFolder = "Simple Subfolder";
        this.cmsZones = ["simple-zone"];
    }

    render () {
        return (
            <div>
                <h1>{ this.field1 }</h1>
                <h1>{ this["field2"] }</h1>
                <h1>{ this.field3 }</h1>
                <h1>{ new CmsField("Field4", CmsFieldTypes.TEXT) }</h1>
                <h1>{ new CmsField("Field5", CmsFieldTypes.TEXT, null) }</h1>
                <h1>{ new CmsField("Field6", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING) }</h1>
                <h1>{ this.field7 }</h1>
                <h1>{ this["field8"] }</h1>
                <h1>{ this.field9 }</h1>
                <h1>{ new CmsField("Field10", "Text") }</h1>
                <h1>{ new CmsField("Field11", "Text", null) }</h1>
                <h1>{ new CmsField("Field12", "Text", null, CmsIndexedField.STRING) }</h1>
                <h1>{/* this.field13 */}</h1>
                <h1>{/* this["field14"] */}</h1>
                <h1>{/* this.field15 */}</h1>
                <h1>{/* new CmsField("Field16", CmsFieldTypes.TEXT) */}</h1>
                <h1>{/* new CmsField("Field17", CmsFieldTypes.TEXT, null) */}</h1>
                <h1>{/* new CmsField("Field18", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING) */}</h1>
                <h1>{/* this.field19 */}</h1>
                <h1>{/* this["field20"] */}</h1>
                <h1>{/* this.field21 */}</h1>
                <h1>{/* new CmsField("Field22", CmsFieldTypes.TEXT) */}</h1>
                <h1>{/* new CmsField("Field23", CmsFieldTypes.TEXT, null) */}</h1>
                <h1>{/* new CmsField("Field24", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING) */}</h1>
            </div>
        )
    }
}