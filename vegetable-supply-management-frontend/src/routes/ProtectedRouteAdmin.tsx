import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RootState } from 'src/redux/store'
import { Role, User } from 'src/types/user'

interface Props {
    children: React.ReactNode
    allowedRoles: Role[]
}

const ProtectedRouteAdmin: React.FC<Props> = ({ children, allowedRoles }) => {

    const user = useSelector((state: RootState) => state.user.user)
    const location = useLocation()
    const allows = allowedRoles.map(allowRole => allowRole.id)

    return (
        <>
            {
                user?.roles.find(role => allows.includes(role.id)) 
                    ? children
                    : user?.id !== ''
                        ? <Navigate to="/unauthorize" state={{ from: location }} replace />
                        : <Navigate to="/admin/login" state={{ from: location }} replace />
            }
        </>
      
    )
}

export default ProtectedRouteAdmin
