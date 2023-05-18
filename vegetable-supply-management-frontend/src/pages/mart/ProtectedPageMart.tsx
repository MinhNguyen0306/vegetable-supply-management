import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedPageMart {
    allowedRoles: string[],
    children?: any
}

const protectedPageMart: React.FC<ProtectedPageMart> = ({ allowedRoles, children }) => {

    const { user } = useSelector((state: any) => state.user);
    const location = useLocation();

    return (
        user ? 
            user.roles?.find((role: string) => allowedRoles.includes(role))
            ? children
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default protectedPageMart
