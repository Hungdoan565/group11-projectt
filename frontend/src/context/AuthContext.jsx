import React, { createContext, useContext, useEffect, useState } from 'react';
import { loadTokenFromStorage, login as apiLogin, signup as apiSignup, logout as apiLogout, getProfile } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = loadTokenFromStorage();
    if (!t) { setLoading(false); return; }
    setToken(t);
    getProfile()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload) => {
    const { token: tk, user: u } = await apiLogin(payload);
    setToken(tk);
    setUser(u);
    return u;
  };

  const signup = async (payload) => {
    const { token: tk, user: u } = await apiSignup(payload);
    setToken(tk);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await apiLogout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
