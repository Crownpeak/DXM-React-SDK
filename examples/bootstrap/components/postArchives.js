import React from 'react';
import { Link } from 'react-router-dom';
import { CmsComponent, CmsDynamicDataProvider } from 'crownpeak-dxm-react-sdk';

export default class PostArchives extends CmsComponent
{
    constructor(props)
    {
        super (props);
        const data = CmsDynamicDataProvider.getDynamicQuery("q=*:*&rows=50&fq=custom_s_type:'Blog%20Page'&fl=custom_i_asset_id,title,custom_dt_created");
        this.months = data.response.docs.map((d,i) => new Date(d.custom_dt_created).toLocaleDateString());
    }

    render() {
        return (
            <div className="p-3">
                <h4 className="font-italic">Archives</h4>
                <ol className="list-unstyled mb-0">
                    {this.months.map((month) => {
                        return <li key={month.toString()}><Link to={`/posts/months/${month.toString()}`}>{ month }</Link></li>
                    })}
                </ol>
            </div>
        )
    }
}