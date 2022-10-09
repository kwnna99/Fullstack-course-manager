import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CourseContext from "../context/Context";


export const PrivateRoute = ({ children }) => {
    //import from router dom
    const location = useLocation();

    //import from context api
    const { authenticatedUser } = useContext(CourseContext);

    //if user is logged in, they are allowed in the protected route and if not then redirect to login page
    return authenticatedUser ? children : <Navigate to="/signin" replace state={{ from: location }}/>

}