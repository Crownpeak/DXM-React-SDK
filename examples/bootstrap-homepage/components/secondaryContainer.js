import React from 'react';
import {CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';
import ReactHtmlParser from "react-html-parser";

export default class SecondaryContainer extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.heading = new CmsField("Heading", CmsFieldTypes.TEXT, props && props.data ? props.data.Heading : null);
        this.description = new CmsField("Description", CmsFieldTypes.WYSIWYG, props && props.data ? props.data.Description : null);
        this.button_text = new CmsField("Button_Text", CmsFieldTypes.TEXT, props && props.data ? props.data.Button_Text : null);
    }

    render () {
        return (
            <div className="col-md-4">
                <h2>{ this.heading }</h2>
                { ReactHtmlParser(this.description) }
                <p><a className="btn btn-secondary" href="#" role="button">{ this.button_text }</a></p>
            </div>
        )
    }
}