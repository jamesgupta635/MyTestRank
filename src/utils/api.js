// API utility functions for authenticated requests

const API_BASE_URL = 'https://www.srv620732.hstgr.cloud';

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwtToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      if (response.status === 401) {
        // Token expired or invalid, clear it
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userEmail');
        window.location.href = '/Login';
        throw new Error('Authentication failed');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export const get = (endpoint, options = {}) => 
  apiCall(endpoint, { ...options, method: 'GET' });

export const post = (endpoint, data, options = {}) => 
  apiCall(endpoint, { 
    ...options, 
    method: 'POST', 
    body: JSON.stringify(data) 
  });

export const put = (endpoint, data, options = {}) => 
  apiCall(endpoint, { 
    ...options, 
    method: 'PUT', 
    body: JSON.stringify(data) 
  });

export const del = (endpoint, options = {}) => 
  apiCall(endpoint, { ...options, method: 'DELETE' });