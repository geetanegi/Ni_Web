import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
const PrivateRoute = ({ children ,hasPermission}) => {
  const isAuthenticated = Cookies.get("accessToken") || null;
  if (!hasPermission) return <Navigate to="/noPermission" replace />;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
