import React from 'react';
import CmsComponent from '../../../common/classes/cmsComponent';

export default class TopicList extends CmsComponent
{
    constructor(props)
    {
        super (props);
        this.topics = [
            "World",
            "U.S.",
            "Technology",
            "Design",
            "Culture",
            "Business",
            "Politics",
            "Opinion",
            "Science",
            "Health",
            "Style",
            "Travel"
        ];
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