import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const API_ENDPOINTS = {
  // Users (admin)
  users: `${API_URL}/users`,
  user: (id) => `${API_URL}/users/${id}`,
  
  // Auth
  signup: `${API_URL}/auth/signup`,
  login: `${API_URL}/auth/login`,
  logout: `${API_URL}/auth/logout`,
  forgotPassword: `${API_URL}/auth/forgot-password`,
  resetPassword: `${API_URL}/auth/reset-password`,

  // Profile
  profile: `${API_URL}/profile`,

  // Upload
  uploadAvatar: `${API_URL}/upload/avatar`,
  uploadCover: `${API_URL}/upload/cover`,
};

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to include token in all requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/login') && 
          !window.location.pathname.includes('/signup')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);
