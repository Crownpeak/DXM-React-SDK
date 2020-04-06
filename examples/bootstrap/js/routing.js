import React from 'react';
import {Route, Router} from "react-router";
import BlogPage from "../pages/blogpage";
import {createBrowserHistory} from "history";

//TODO: React Router v4 Nested routimg configuration

const routes = (
    <Router history={ createBrowserHistory() }>
        <Route exact path="/" component={BlogPage}/>
    </Router>
)

export default routes;