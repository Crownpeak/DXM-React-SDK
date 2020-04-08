import React from 'react';
import { Link } from 'react-router-dom';
import CmsComponent from '../../../common/classes/cmsComponent';

export default class PostArchives extends CmsComponent
{
    constructor(props)
    {
        super (props);
        this.months = [
            "Jan",
            "Feb",
            "Mar",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
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