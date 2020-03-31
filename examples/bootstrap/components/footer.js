import React from 'react';
import CmsComponent from '../../../common/classes/cmsComponent';

export default class Footer extends CmsComponent
{
    render() {
        return (
            <footer className="blog-footer">
                <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a
                    href="https://twitter.com/mdo">@mdo</a>.</p>
                <p>
                    <a href="#">Back to top</a>
                </p>
            </footer>
        )
    }
}