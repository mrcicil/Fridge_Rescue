import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (userData) => {
    localStorage.setItem("userToken", userData.username);
    console.log("local",localStorage.getItem("userToken"));
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken")
    console.log("auth", !!localStorage.getItem("userToken"))
    //Rahmat - after logout, want to land on which page
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;