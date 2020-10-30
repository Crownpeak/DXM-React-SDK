import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';

export default class ComponentWithScaffold extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.heading = new CmsField("Field", CmsFieldTypes.TEXT, null);
    }

    render () {
        return (
            <div>
                <p>Before</p>
                {/* cp-scaffold 
                <h2>{Heading:Text}</h2>
                else */}
                <h2>{ "not present" }</h2>
                {/* /cp-scaffold */}
                <p>Between</p>
                {/* cp-scaffold 
                {SupplementaryField:Text}
                /cp-scaffold */}
                <p>After</p>
            </div>
        )
    }
}