import BlogPage from "../pages/blogpage";
import ReactDOM from "react-dom";
import {HashRouter as Router} from "react-router-dom";
import {Switch} from "react-router";
import {renderRoutes} from "react-router-config";
import React from "react";

export default class Routing {
    static processRoutes()
    {
        const componentRegistry = {
            "BlogPage": BlogPage
        };

        const routes = [];
        fetch('/routes.json')
            .then(res => res.json())
            .then((routeData) => {
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
            })
            .catch(console.log);
    }
}