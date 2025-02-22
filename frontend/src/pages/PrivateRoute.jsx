import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
    const isAuthenticated = localStorage.getItem("auth");
    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
