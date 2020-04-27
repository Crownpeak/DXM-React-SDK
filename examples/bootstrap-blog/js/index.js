import Routing from "./routing";
import { CmsCore } from 'crownpeak-dxm-react-sdk';
import { CMS_STATIC_CONTENT_LOCATION, CMS_DYNAMIC_CONTENT_LOCATION } from 'react-native-dotenv';

CmsCore.init(CMS_STATIC_CONTENT_LOCATION, CMS_DYNAMIC_CONTENT_LOCATION);
Routing.processRoutes();