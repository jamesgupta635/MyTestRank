// API utility functions for authenticated and public requests
import axios from 'axios';

const API_BASE_URL = 'https://www.srv620732.hstgr.cloud';

const PUBLIC_ENDPOINTS = [
  '/',
  '/home',
  '/banner/getBanners',
  '/user/signup',
  '/authenticate',
  '/fetch/allCourseMainPage',
  '/plans/allPlans',
  '/stream/range'
];

const isPublicEndpoint = (endpoint) => {
  return PUBLIC_ENDPOINTS.some(publicEndpoint => {
    if (publicEndpoint.includes('**')) {
      const pattern = publicEndpoint.replace('**', '');
      return endpoint.startsWith(pattern);
    }
    return endpoint === publicEndpoint;
  });
};

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('jwtToken');
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Only add Authorization header if endpoint is not public
  if (token && !isPublicEndpoint(endpoint)) {
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

// Public API call (no authentication)
export const publicApiCall = async (endpoint, options = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Public API call failed:', error);
    throw error;
  }
};

// Authenticated API methods
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

// Public API methods (no authentication)
export const publicGet = (endpoint, options = {}) => 
  publicApiCall(endpoint, { ...options, method: 'GET' });

export const publicPost = (endpoint, data, options = {}) => 
  publicApiCall(endpoint, { 
    ...options, 
    method: 'POST', 
    body: JSON.stringify(data) 
  });

export const publicPut = (endpoint, data, options = {}) => 
  publicApiCall(endpoint, { 
    ...options, 
    method: 'PUT', 
    body: JSON.stringify(data) 
  });

export const publicDel = (endpoint, options = {}) => 
  publicApiCall(endpoint, { ...options, method: 'DELETE' });

// Axios instance with JWT interceptor for authenticated requests
export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add JWT token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token && !isPublicEndpoint(config.url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid, clear it
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userEmail');
      window.location.href = '/Login';
    }
    return Promise.reject(error);
  }
);