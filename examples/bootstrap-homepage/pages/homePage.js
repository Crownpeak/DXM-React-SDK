import React from 'react'
import { CmsStaticPage, CmsDynamicPage } from 'crownpeak-dxm-react-sdk';
import HeroContainer from "../components/heroContainer";
import SecondaryContainer from "../components/secondaryContainer";

export default class HomePage extends CmsDynamicPage
{
    constructor(props)
    {
        super(props);
        this.cmsAssetId = 263648;
    }

    render() {
        super.render();
        return (
            <div>
                <div class="jumbotron">
                    <HeroContainer />
                </div>
                <div class="container">
                    <div className="row">
                        <SecondaryContainer/>
                        <SecondaryContainer/>
                        <SecondaryContainer/>
                    </div>
                </div>
                <hr/>
            </div>
        )
    }
}