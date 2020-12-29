import React from 'react';
import { CmsStaticPage } from 'crownpeak-dxm-react-sdk';

export default class PageWithScaffold extends CmsStaticPage
{
    constructor(props)
    {
        super(props);
        this.cmsAssetId = 12345;
    }

    render() {
        super.render();
        return (
            this.state.isLoaded &&
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