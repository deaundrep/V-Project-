import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./component/Home";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import Profile from "./component/Profile/Profile";
import Navbar from "./component/Navbar/Navbar";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import AuthVHome from "./component/AuthVHome/AuthVHome"
import NotFound from "./component/lib/NotFound"
import VDetail from "./component/AuthVHome/VDetail"




const MainRouter = (props) => {
    return (
        <Router>
            <Navbar user={props.user} handleUserLogout={props.handleUserLogout} />
            <Switch>
                <PrivateRoute exact path="/v-home" component={AuthVHome} />
                <PrivateRoute exact path="/v-detail/:recipe" component={VDetail} />

                <PrivateRoute
                    exact
                    path="/profile"
                    component={Profile}
                    handleUserLogout={props.handleUserLogout}
                />


                <Route exact path="/sign-up" component={SignUp} />

                <Route
                    exact
                    path="/login"
                    render={(routerProps) => (
                        <Login {...routerProps} handleUserLogin={props.handleUserLogin} />
                    )}
                />

                <Route exact path="/" component={Home} />

                <Route path="*" component={NotFound} />
            </Switch>
        </Router>
    )
}


export default MainRouter;