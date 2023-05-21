import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Role } from 'src/types/user'
import { User } from 'src/types/user'

interface Props {
    allowedRoles: Role[],
    children: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ allowedRoles, children }) => {

    const { user } = useSelector((state: any) => state.user)
    const location = useLocation()

    return (
        <>
            {
                 (user as User)?.roles?.find(role => allowedRoles?.includes(role)) 
                    ? children
                    : user
                        ? <Navigate to="/unauthorize" state={{ from: location }} replace />
                        : <Navigate to="/login" state={{ from: location }} replace />
            }
        </>
       
    )
}

export default ProtectedRoute
