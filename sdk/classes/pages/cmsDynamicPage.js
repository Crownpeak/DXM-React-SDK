import CmsPage from "./cmsPage";
import { CmsDynamicDataProvider } from "crownpeak-dxm-sdk-core";

export default class CmsDynamicPage extends CmsPage {
    constructor(props) {
        super(props);
        this.cmsDataProvider = CmsDynamicDataProvider;
    }
}