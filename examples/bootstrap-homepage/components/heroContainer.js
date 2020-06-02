import React from 'react';
import { CmsComponent, CmsField, CmsFieldTypes } from 'crownpeak-dxm-react-sdk';
import ReactHtmlParser from 'react-html-parser';

export default class HeroContainer extends CmsComponent
{
    constructor(props)
    {
        super(props);
        this.heading = new CmsField("Heading", CmsFieldTypes.TEXT);
        this.description = new CmsField("Description", CmsFieldTypes.WYSIWYG);
        this.button_text = new CmsField("Button_Text", CmsFieldTypes.TEXT);

        if(props.data)
        {
            this.heading = props.data.Heading;
            this.description = props.data.Description;
            this.button_text = props.data.Button_Text;
        }
    }

    render () {
        return (
            <div className="container">
                <h1 className="display-3">{ this.heading }</h1>
                { ReactHtmlParser(this.description) }
                <p><a className="btn btn-primary btn-lg" href="#" role="button">{ this.button_text }</a></p>
            </div>
        )
    }
}