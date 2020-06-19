import CmsPage from "./cmsPage";
import { CmsStaticDataProvider } from "crownpeak-dxm-sdk-core";

export default class CmsStaticPage extends CmsPage {
    constructor(props: any) {
        super(props);
        this.cmsDataProvider = new CmsStaticDataProvider();
    }
}