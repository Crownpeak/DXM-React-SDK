import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';
import Util from 'util';

export default class BlogPost extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.post_title = new CmsField("Post_Title", CmsFieldTypes.TEXT);
        this.post_date = new CmsField("Post_Date", CmsFieldTypes.DATE);
        this.post_content = new CmsField("Post_Content", CmsFieldTypes.WYSIWYG);
    }

    render() {
        return (
            <div className="blog-post">
                <h2 className="blog-post-title">{ this.post_title }</h2>
                <p className="blog-post-meta">{ Util.format("Date: %s", this.post_date) }</p>
                { this.post_content.html() }
            </div>
        )
    }
}