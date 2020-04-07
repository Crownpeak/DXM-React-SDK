import React from 'react'
import CmsPage from '../../../common/classes/cmsPage';
import Header from "../components/header";
import TopicList from "../components/topicList";
import FeaturedPost from "../components/featuredPost";
import SecondaryPost from "../components/secondaryPost";
import BlogPost from "../components/blogPost";
import PostArchives from "../components/postArchives";
import Footer from "../components/footer";

export default class BlogPage extends CmsPage
{
    render() {
        return (
            <div>
                <div className="container">
                    <Header month={this.props.match.params.month}/>
                    <TopicList/>
                    <div className="jumbotron p-3 p-md-5 text-white rounded bg-dark">
                        <FeaturedPost/>
                    </div>
                    <div className="row mb-2">
                        <div className="col-md-6">
                            <SecondaryPost/>
                        </div>
                        <div className="col-md-6">
                            <SecondaryPost/>
                        </div>
                    </div>
                </div>
                <main role="main" className="container">
                    <div className="row">
                        <div className="col-md-8 blog-main">
                            <h3 className="pb-3 mb-4 font-italic border-bottom">
                                From the Firehose
                            </h3>
                            <BlogPost/>
                        </div>
                        <aside className="col-md-4 blog-sidebar">
                            <PostArchives/>
                        </aside>
                    </div>
                </main>
                <Footer/>
            </div>
        )
    }
}