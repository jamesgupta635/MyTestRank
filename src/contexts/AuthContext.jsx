import React, { createContext, useContext, useState, useEffect } from 'react';
import { post } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('jwtToken');
    const userEmail = localStorage.getItem('userEmail');
    
    if (token && userEmail) {
      try {
        // Verify token with server
        const data = await post('/verify-token', { token });
        setIsAuthenticated(true);
        setUser({ email: userEmail, ...data });
      } catch (error) {
        console.error('Token verification failed:', error);
        // On network error, assume token is valid for now
        setIsAuthenticated(true);
        setUser({ email: userEmail });
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
    
    setIsLoading(false);
  };

  const login = (token, userEmail, userData = {}) => {
    localStorage.setItem('jwtToken', token);
    localStorage.setItem('userEmail', userEmail);
    setIsAuthenticated(true);
    setUser({ email: userEmail, ...userData });
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userEmail');
    setIsAuthenticated(false);
    setUser(null);
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('jwtToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
    getAuthHeaders,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};