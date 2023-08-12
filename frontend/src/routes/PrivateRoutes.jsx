import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Store the attempted path in session storage
        sessionStorage.setItem('attemptedPath', window.location.pathname);
        return <Navigate to="/login" replace={true} />;
    }

    return children;
}

export default PrivateRoutes;
