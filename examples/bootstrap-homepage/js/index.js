import React from 'react';
import { CmsCore } from 'crownpeak-dxm-react-sdk';
import { CMS_STATIC_CONTENT_LOCATION, CMS_DYNAMIC_CONTENT_LOCATION } from 'react-native-dotenv';
import HomePage from "../pages/homePage";

CmsCore.init(CMS_STATIC_CONTENT_LOCATION, CMS_DYNAMIC_CONTENT_LOCATION);
ReactDOM.render(<HomePage />, document.getElementById('app'));