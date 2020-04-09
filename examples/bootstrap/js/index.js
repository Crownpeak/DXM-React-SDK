import Routing from "./routing";
import cmsCore from "../../../common/classes/cmsCore";
import { CMS_STATIC_CONTENT_LOCATION, CMS_DYNAMIC_CONTENT_LOCATION } from 'react-native-dotenv';

cmsCore.init(CMS_STATIC_CONTENT_LOCATION, CMS_DYNAMIC_CONTENT_LOCATION);
Routing.processRoutes();