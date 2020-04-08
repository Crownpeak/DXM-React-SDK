export default class CmsDynamicDataProvider
{
    static getData(assetId)
    {
        const data = {
            "responseHeader":{
                "zkConnected":true,
                "status":0,
                "QTime":12,
                "params":{
                    "q":"261377",
                    "indent":"true",
                    "fl":"id,custom_t_json:[json]",
                    "wt":"json"}},
            "response":{"numFound":1,"start":0,"docs":[
                    {
                        "id":"261377",
                        "custom_t_json":{"Header":null,"TopicList":null,"FeaturedPost":{"Post_Title":"Featured Post Title - Dynamic","Post_Leader":"Featured Post Leader"},"SecondaryPost":[{"Post_Title":"Secondary Post 1 Title","Post_Date":"2020-03-31","Post_Content":"<p>Secondary Post 1 Content<\/p>"},{"Post_Title":"Secondary Post 2 Title","Post_Date":"2020-04-01","Post_Content":"<p>Secondary Post 2 Content.<\/p>"}],"BlogPost":{"Post_Title":"Post Title","Post_Date":"2020-04-01","Post_Content":"<p>Post Content.<\/p>"},"PostArchives":null,"Footer":null}}]
            }}.response.docs[0].custom_t_json;

        if(!window.cmsDataCache) window.cmsDataCache = {};
        window.cmsDataCache[assetId] = data;
        return data;
    }
}