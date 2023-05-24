import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RootState } from 'src/redux/store'
import { Role } from 'src/types/user'
import { User } from 'src/types/user'

interface Props {
    allowedRoles: Role[],
    children: React.ReactNode
}

const ProtectedRoute: React.FC<Props> = ({ allowedRoles, children }) => {

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
                        : <Navigate to="/login" state={{ from: location }} replace />
            }
        </>
       
    )
}

export default ProtectedRoute
