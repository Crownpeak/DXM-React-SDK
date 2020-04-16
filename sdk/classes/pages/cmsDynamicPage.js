import CmsPage from "./cmsPage";
import CmsDynamicDataProvider from "../../classes/dataProviders/cmsDynamicDataProvider";

export default class CmsDynamicPage extends CmsPage {
    constructor(props) {
        super(props);
        this.cmsDataProvider = CmsDynamicDataProvider;
    }
}