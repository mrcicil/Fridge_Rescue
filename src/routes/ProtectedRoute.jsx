import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  return (!!localStorage.getItem("userToken")) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;