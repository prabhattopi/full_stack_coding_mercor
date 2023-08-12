import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoutes = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (user) {
        // Get the stored attempted path
        const attemptedPath = sessionStorage.getItem("attemptedPath");

        if (attemptedPath) {
            // Clear the stored attempted path
            sessionStorage.removeItem("attemptedPath");
            return <Navigate to={attemptedPath} replace={true} />;
        }

        return <Navigate to="/" replace={true} />;
    }

    return children;
}

export default PublicRoutes;
