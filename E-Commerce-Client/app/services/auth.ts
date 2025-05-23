import api from './api';

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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  passwordconfirm: string;
  address?: string;
}

export interface AuthResponse {
  status: string;
  accessToken: string;
  refreshToken?: string;
  message?: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  role: string;
  address?: string;
}

const AuthService = {
  // Login user and store tokens
  login: async (credentials: LoginCredentials): Promise<User> => {
    try {
      const response = await api.post<AuthResponse>('/user/login', credentials);
      
      if (response.data.accessToken) {
        safeLocalStorage.setItem('accessToken', response.data.accessToken);
        // Refresh token is stored in HTTP-only cookie by the server
      }
      
      // Fetch and return user data
      return AuthService.getCurrentUser();
    } catch (error) {
      throw error;
    }
  },
  
  // Register new user
  register: async (data: RegisterData): Promise<{ status: string; message: string }> => {
    try {
      const response = await api.post('/user/signup', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Logout user
  logout: async (): Promise<void> => {
    try {
      await api.post('/user/logout');
      safeLocalStorage.removeItem('accessToken');
      safeLocalStorage.removeItem('user');
    } catch (error) {
      console.error('Logout error:', error);
      // Clean local storage even if server request fails
      safeLocalStorage.removeItem('accessToken');
      safeLocalStorage.removeItem('user');
    }
  },
  
  // Get current user data
  getCurrentUser: async (): Promise<User> => {
    try {
      const response = await api.get('/user/me');
      const userData: User = response.data.data.user;
      
      // Cache user data
      safeLocalStorage.setItem('user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      throw error;
    }
  },
  
  // Get cached user or null
  getCachedUser: (): User | null => {
    const userStr = safeLocalStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (e) {
        return null;
      }
    }
    return null;
  },
  
  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return !!safeLocalStorage.getItem('accessToken');
  },
  
  // Forgot password
  forgotPassword: async (email: string): Promise<{ status: string; message: string }> => {
    try {
      const response = await api.post('/user/forgotpassword', { email });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Reset password
  resetPassword: async (
    token: string,
    newPassword: string,
    passwordConfirm: string
  ): Promise<{ status: string }> => {
    try {
      const response = await api.post(`/user/resetpassword/${token}`, {
        newPassword,
        passwordconfirm: passwordConfirm,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Change password (when logged in)
  changePassword: async (
    currentPassword: string,
    newPassword: string,
    passwordConfirm: string
  ): Promise<{ status: string }> => {
    try {
      const response = await api.post('/user/changepassword', {
        currentPassword,
        newPassword,
        passwordconfirm: passwordConfirm,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default AuthService; 