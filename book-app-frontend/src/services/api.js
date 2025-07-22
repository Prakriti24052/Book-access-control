// src/api/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',// Will work with proxy setup in frontend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attaches token to every request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handles error responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        toast.error('Unauthorized – Please login again.');
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (status === 403) {
        toast.error('Forbidden – You do not have permission.');
      } else if (status === 404) {
        toast.error('Resource not found.');
      } else if (status >= 500) {
        toast.error('Server error – Please try again later.');
      }
    } else {
      toast.error('Network error – Please check your connection.');
    }

    return Promise.reject(error);
  }
);

export default api;
