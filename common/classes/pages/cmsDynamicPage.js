import CmsPage from "./cmsPage";
import CmsDynamicDataProvider from "../../../common/classes/dataProviders/cmsDynamicDataProvider";

export default class CmsDynamicPage extends CmsPage {
    constructor(props) {
        super(props);
        this.cmsDataProvider = CmsDynamicDataProvider;
    }
}