import React from 'react';
import CmsComponent from '../../../common/classes/cmsComponent';
import CmsField from "../../../common/classes/cmsField";
import CmsFieldTypes from "../../../common/enum/cmsFieldTypes";

export default class BlogPost extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.post_title = new CmsField("Post_Title", CmsFieldTypes.TEXT);
        this.post_date = new CmsField("Post_Date", CmsFieldTypes.DATE);
    }

    render() {
        return (
            <div className="blog-post">
                <h2 className="blog-post-title">{ this.post_title.value() }</h2>
                <p className="blog-post-meta">{ this.post_date.value() }</p>
                { new CmsField("Post_Content", CmsFieldTypes.WYSIWYG).value() }
            </div>
        )
    }
}