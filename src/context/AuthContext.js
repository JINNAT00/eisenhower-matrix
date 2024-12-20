import React, { createContext, useContext, useState } from 'react';
import { storeToken, getToken, removeToken } from '../utils/tokenUtils';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(getToken());

  const login = (token) => {
    storeToken(token);
    // setAuthToken(token);
  };

  const logout = () => {
    removeToken();
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
