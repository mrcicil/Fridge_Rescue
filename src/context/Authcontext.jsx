import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeContext } from "./RecipeContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const { clearSearchData } = useRecipeContext();

  const login = (userData) => {
    localStorage.setItem("userToken", userData.username);
  };

  const logout = () => {
    localStorage.removeItem("userToken");
      clearSearchData();
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;