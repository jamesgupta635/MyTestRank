import React, { createContext, useContext, useState, useEffect } from 'react';

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
        const response = await fetch('https://www.srv620732.hstgr.cloud85/verify-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ token })
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(true);
          setUser({ email: userEmail, ...data });
        } else {
          // Token is invalid, clear it
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('userEmail');
          setIsAuthenticated(false);
          setUser(null);
        }
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