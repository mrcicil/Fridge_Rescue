import { Navigate } from "react-router-dom";

// const isAuthenticated = () => {
//   return !!localStorage.getItem("userToken"); // Example check
// };

const ProtectedRoute = ({ children }) => {
    console.log("protect", !!localStorage.getItem("userToken"))
  return (!!localStorage.getItem("userToken")) ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;