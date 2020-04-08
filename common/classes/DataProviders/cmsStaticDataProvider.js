export default class CmsStaticDataProvider
{
    static getData(assetId)
    {
        const data = {"Header":null,"TopicList":null,"FeaturedPost":{"Post_Title":"Featured Post Title - Static","Post_Leader":"Featured Post Leader"},"SecondaryPost":[{"Post_Title":"Secondary Post 1 Title","Post_Date":"2020-03-31","Post_Content":"<p>Secondary Post 1 Content<\/p>"},{"Post_Title":"Secondary Post 2 Title","Post_Date":"2020-04-01","Post_Content":"<p>Secondary Post 2 Content.<\/p>"}],"BlogPost":{"Post_Title":"Post Title","Post_Date":"2020-04-01","Post_Content":"<p>Post Content.<\/p>"},"PostArchives":null,"Footer":null};
        if(!window.cmsDataCache) window.cmsDataCache = {};
        window.cmsDataCache[assetId] = data;
        return data;
    }
}