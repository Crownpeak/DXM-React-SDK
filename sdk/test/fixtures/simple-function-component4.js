import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes, CmsIndexedField } from 'crownpeak-dxm-react-sdk';

export const SimpleComponent = (props) =>
{
    CmsDataCache.setComponent("SimpleComponent");
    let field1 = new CmsField("Field1", CmsFieldTypes.TEXT);
    let field2 = new CmsField("Field2", CmsFieldTypes.TEXT, null);
    let field3 = new CmsField("Field3", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING);
    let field4 = new CmsField("Field4", "Text");
    let field5 = new CmsField("Field5", "Text", null);
    let field6 = new CmsField("Field6", "Text", null, CmsIndexedField.STRING);
    let field7 = new CmsField("Field7", CmsFieldTypes.TEXT);
    let field8 = new CmsField("Field8", CmsFieldTypes.TEXT, null);
    let field9 = new CmsField("Field9", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING);
    let field10 = new CmsField("Field10", "Text");
    let field11 = new CmsField("Field11", "Text", null);
    let field12 = new CmsField("Field12", "Text", null, CmsIndexedField.STRING);
    let field13 = new CmsField("Field13", CmsFieldTypes.TEXT);
    let field14 = new CmsField("Field14", CmsFieldTypes.TEXT, null);
    let field15 = new CmsField("Field15", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING);
    let field19 = new CmsField("Field19", "Text");
    let field20 = new CmsField("Field20", "Text", null);
    let field21 = new CmsField("Field21", "Text", null, CmsIndexedField.STRING);
    let cmsFolder = "Simple Subfolder";
    let cmsZones = ["simple-zone"];

    return (
        <div>
            <h1>{ field1 }</h1>
            <h1>{ field2 }</h1>
            <h1>{ field3 }</h1>
            <h1>{ new CmsField("Field4", CmsFieldTypes.TEXT) }</h1>
            <h1>{ new CmsField("Field5", CmsFieldTypes.TEXT, null) }</h1>
            <h1>{ new CmsField("Field6", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING) }</h1>
            <h1>{ field7 }</h1>
            <h1>{ field8 }</h1>
            <h1>{ field9 }</h1>
            <h1>{ new CmsField("Field10", "Text") }</h1>
            <h1>{ new CmsField("Field11", "Text", null) }</h1>
            <h1>{ new CmsField("Field12", "Text", null, CmsIndexedField.STRING) }</h1>
            <h1>{/* field13 */}</h1>
            <h1>{/* field14 */}</h1>
            <h1>{/* field15 */}</h1>
            <h1>{/* new CmsField("Field16", CmsFieldTypes.TEXT) */}</h1>
            <h1>{/* new CmsField("Field17", CmsFieldTypes.TEXT, null) */}</h1>
            <h1>{/* new CmsField("Field18", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING) */}</h1>
            <h1>{/* field19 */}</h1>
            <h1>{/* field20 */}</h1>
            <h1>{/* field21 */}</h1>
            <h1>{/* new CmsField("Field22", CmsFieldTypes.TEXT) */}</h1>
            <h1>{/* new CmsField("Field23", CmsFieldTypes.TEXT, null) */}</h1>
            <h1>{/* new CmsField("Field24", CmsFieldTypes.TEXT, null, CmsIndexedField.STRING) */}</h1>
        </div>
    )
}