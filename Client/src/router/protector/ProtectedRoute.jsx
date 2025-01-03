import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from './auth';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuth = isAuthenticated();

    if (!isAuth) {
        // Redirect to login with the attempted location
        return (
            <Navigate
                to="/login"
                state={{
                    message: "Please login to access this page",
                    from: location.pathname
                }}
                replace
            />
        );
    }

    return children;
};

export default ProtectedRoute;