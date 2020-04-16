import CmsPage from "./cmsPage";
import CmsStaticDataProvider from "../../classes/dataProviders/cmsStaticDataProvider";

export default class CmsStaticPage extends CmsPage {
    constructor(props) {
        super(props);
        this.cmsDataProvider = CmsStaticDataProvider;
    }
}