import React from "react";
import { Route, Redirect } from "react-router-dom";

function getLogInStatus() {
    if (localStorage.getItem("userid")) return true;
    else return false;
}

const GuardedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                getLogInStatus() === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
};

export default GuardedRoute;