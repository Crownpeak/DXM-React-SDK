import React from 'react';
import { CmsComponent, CmsStaticDataProvider } from 'crownpeak-dxm-react-sdk';

export default class TopicList extends CmsComponent
{
    constructor(props)
    {
        super (props);
        this.topics = CmsStaticDataProvider.getCustomData("topics.json");
    }

    render() {
        return (
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    {this.topics.map((topic) => {
                        return <a key={topic.toString()} className="p-2 text-muted" href="#">{ topic }</a>
                    })}
                </nav>
            </div>
        )
    }
}