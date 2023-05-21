import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { Role, User } from 'src/types/user'

interface Props {
    children: React.ReactNode
    allowedRoles: Role[]
}

const ProtectedRouteProvider: React.FC<Props> = ({ children, allowedRoles }) => {

    const { user } = useSelector((state: any) => state.user)
    const location = useLocation()

    return (
        <>
            {
                (user as User)?.roles?.find(role => allowedRoles.find(allow => allow.id === role.id))
                    ? children
                    : (user as User).id !== ""
                        ? <Navigate to="/unauthorize" state={{ from: location }} replace />
                        : <Navigate to="/provider/login" state={{ from: location }} replace />
            }
        </>
      
    )
}

export default ProtectedRouteProvider
