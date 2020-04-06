import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routing';

//TODO: import { DXM_USERNAME } from 'react-native-dotenv';

ReactDOM.render(
    routes,
    document.getElementById('app')
);