import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:12345/api/v1';

// Helper to safely access localStorage (for SSR compatibility)
const safeLocalStorage = {
  getItem: (key: string): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key: string, value: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for cookies
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = safeLocalStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh the token
        await refreshToken();
        
        // Retry the original request
        const token = safeLocalStorage.getItem('accessToken');
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Refresh token function
export const refreshToken = async () => {
  try {
    const response = await api.post('/user/refreshtoken');
    const { accessToken } = response.data;
    
    safeLocalStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    safeLocalStorage.removeItem('accessToken');
    throw error;
  }
};

export default api; 