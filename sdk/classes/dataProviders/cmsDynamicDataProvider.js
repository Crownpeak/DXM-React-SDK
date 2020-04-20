export default class CmsDynamicDataProvider
{
    static _getData(query)
    {
        const request = new XMLHttpRequest();  //TODO: Replace with synchronous implementation of fetch, as XMLHttpRequest is deprecated.
        request.open('GET', window.cmsDataCache.cmsDynamicDataLocation + query, false);
        request.send(null);

        if (request.status === 200) {
            return JSON.parse(request.responseText);


        }
    }

    static getSingleAsset(assetId)
    {
        const data = this._getData("&fl=id,custom_t_json:%5Bjson%5D&q=" + assetId);

        if(!window.cmsDataCache) window.cmsDataCache = {};
        //TODO: Make robust if no data returned.
        window.cmsDataCache[assetId] = data.response.docs[0].custom_t_json;
    }

    static getDynamicQuery(query)
    {
        return this._getData("&" + query);
    }
}