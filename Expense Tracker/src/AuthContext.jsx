import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};
