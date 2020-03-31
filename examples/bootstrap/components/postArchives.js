import React from 'react';
import CmsComponent from '../../../common/classes/cmsComponent';

export default class PostArchives extends CmsComponent
{
    constructor(props)
    {
        super (props);
        this.months = [
            "Jan 2019",
            "Feb 2019",
            "Mar 2019",
            "April 2019",
            "May 2019",
            "June 2019",
            "July 2019",
            "August 2019",
            "September 2019",
            "October 2019",
            "November 2019",
            "December 2019"
        ];
    }

    render() {
        return (
            <div className="p-3">
                <h4 className="font-italic">Archives</h4>
                <ol className="list-unstyled mb-0">
                    {this.months.map((month) => {
                        return <li key={month.toString()}><a href="#">{ month }</a></li>
                    })}
                </ol>
            </div>
        )
    }
}