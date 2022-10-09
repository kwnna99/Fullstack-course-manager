import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CourseContext from "../context/Context";


export const PrivateRoute = ({ children }) => {
    const location = useLocation();

    const { authenticatedUser } = useContext(CourseContext);

//make unauthenticated user log in or redirect to the previous route if authenticated and eligible
    return authenticatedUser ? children : <Navigate to="/signin" replace state={{ from: location }}/>

}