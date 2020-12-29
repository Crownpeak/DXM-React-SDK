import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';
import SimpleComponent from './simple-function-component';
import NonCrownpeakFunctionComponent from './non-crownpeak-function-component';

const SimpleComponentWithNonCrownpeak = (props) =>
{
    CmsDataCache.setComponent("SimpleComponentWithNonCrownpeak");
    let field1 = new CmsField("Field1", CmsFieldTypes.TEXT);
    let cmsFolder = "Simple Subfolder";
    let cmsZones = ["simple-zone"];

    return (
        <div>
            { field1 }
            <SimpleComponent />
            <NonCrownpeakFunctionComponent />
        </div>
    )
}

export default SimpleComponentWithNonCrownpeak;