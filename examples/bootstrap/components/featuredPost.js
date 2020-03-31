import React from 'react';
import CmsComponent from '../../../common/classes/cmsComponent';
import CmsField from "../../../common/classes/cmsField";
import CmsFieldTypes from "../../../common/enum/cmsFieldTypes";

export default class FeaturedPost extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.post_title = new CmsField("Post_Title", CmsFieldTypes.TEXT);
        this.post_leader = new CmsField("Post_Date", CmsFieldTypes.DATE);
    }

    render() {
        return (
            <div className="col-md-6 px-0">
                <h1 className="display-4 font-italic">{ this.post_title.value() }</h1>
                <p className="lead my-3">{ this.post_leader.value() }</p>
                <p className="lead mb-0"><a href="#" className="text-white font-weight-bold">Continue
                    reading...</a></p>
            </div>
        )
    }
}