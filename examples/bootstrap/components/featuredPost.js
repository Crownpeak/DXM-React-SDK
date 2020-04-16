import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';
import ReactHtmlParser from 'react-html-parser';

export default class FeaturedPost extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.post_title = new CmsField("Post_Title", CmsFieldTypes.TEXT);
        this.post_leader = new CmsField("Post_Leader", CmsFieldTypes.WYSIWYG);
    }

    render() {
        return (
            <div className="col-md-6 px-0">
                <h1 className="display-4 font-italic">{ this.post_title }</h1>
                <p className="lead my-3">{ ReactHtmlParser(this.post_leader) }</p>
                <p className="lead mb-0"><a href="#" className="text-white font-weight-bold">Continue
                    reading...</a></p>
            </div>
        )
    }
}