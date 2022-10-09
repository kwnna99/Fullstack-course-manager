import React, { useContext,useEffect } from "react";
import { Navigate } from 'react-router-dom';
import CourseContext from "../context/Context";

export function UserSignOut () {
    const { signOut } = useContext(CourseContext);
    useEffect(() => {signOut();});
    return(
        <Navigate to='/'/>
    )
}