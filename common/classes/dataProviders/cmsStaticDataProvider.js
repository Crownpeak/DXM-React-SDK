export default class CmsStaticDataProvider
{
    static getData(assetId)
    {
        const request = new XMLHttpRequest(); //TODO: Replace with synchronous implementation of fetch, as XMLHttpRequest is deprecated.
        request.open('GET', window.cmsDataCache.cmsStaticDataLocation + '/'+ assetId + '.json', false);
        request.send(null);

        if (request.status === 200) {
            const data = JSON.parse(request.responseText);

            if(!window.cmsDataCache) window.cmsDataCache = {};
            //TODO: Make robust if no data returned.
            window.cmsDataCache[assetId] = data;
        }
    }
}