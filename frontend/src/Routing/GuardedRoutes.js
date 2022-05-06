import React from "react";
import { Navigate } from "react-router-dom";

function getLogInStatus() {
    if (localStorage.getItem("userid")) return true;
    else return false;
}

const GuardedRoute = ({ component: Component }) => {
    return (
        getLogInStatus() === true ? (
            <Component />
        ) : (
            <Navigate replace to="/" />
        )
    );
};

export default GuardedRoute;