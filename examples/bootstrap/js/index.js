import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routeData from '../routes.json';
import componentRegistry from "./routing";

//TODO: import { DXM_USERNAME } from 'react-native-dotenv';

const routes = [];
Object.keys(routeData).forEach(function(key) {
    const route = {
        "path": routeData[key].path,
        "exact": (routeData[key].exact === true),
        "component": componentRegistry[routeData[key].component]
    };
    routes.push(route);
});

ReactDOM.render(
    <Router>
        <Switch>
            {renderRoutes(routes)}
        </Switch>
    </Router>,
    document.getElementById('app')
);