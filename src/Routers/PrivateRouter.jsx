import { Navigate, useLocation } from 'react-router';

import { useContext } from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const PrivateRouter = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    const location = useLocation();
    console.log(location)

    if (loading) {
        return <span className="loading loading-spinner text-success"></span>
    }

    if (user) {
        return children;
    }

    return <Navigate state={location?.pathname} to="/login"></Navigate>;
};

export default PrivateRouter;