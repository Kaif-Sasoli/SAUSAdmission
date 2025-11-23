import React, { createContext, useState, useContext, useEffect } from "react";
// import { signInUser, logoutUser } from "../api/auth";
  import { toast } from 'react-toastify';
import { apiClient } from '../api/index'

const USER_STORAGE_KEY = import.meta.env.VITE_USER_STORAGE_KEY;
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState('dfsdfd');
  const [isLoading, setIsLoading] = useState(true);

  // Load user & token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    const storedToken = localStorage.getItem(ACCESS_KEY);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setAccessToken(storedToken);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
    setIsLoading(false);
  }, []);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  // Sync token to localStorage and set axios header
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(ACCESS_KEY, accessToken);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    } else {
      localStorage.removeItem(ACCESS_KEY);
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }, [accessToken]);

  const login = async (email, password) => {
    try {
      const response = await signInUser({ email, password });
      setUser(response.user);
      setAccessToken(response.accessToken);
      toast.success("Login successful");
      return response;
    } catch (err) {
      toast.error(err.message || "Login failed");
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setAccessToken(null);
      toast.success("Logged out");
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  const verifyAndLogin = (data) => {
    const { user, accessToken } = data;
    setUser(user);
    setAccessToken(accessToken);
  };

  const register = async (name, email, password) => {
    // You can implement API call here
    return { message: "Registered (simulation)", id: "123", email };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        isAuthenticated: !!accessToken,
        isLoading,
        // login,
        register,
        verifyAndLogin,
        // logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
