import { create } from 'zustand';
import { authService } from '../services/api';

const savedToken = localStorage.getItem('newsnest_token');
const savedUser = localStorage.getItem('newsnest_user');

export const useAuthStore = create((set, get) => ({
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  isAuthenticated: Boolean(savedToken),
  loading: false,
  error: null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.login(credentials);
      localStorage.setItem('newsnest_token', data.token);
      localStorage.setItem('newsnest_user', JSON.stringify(data.user));

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.register(userData);
      localStorage.setItem('newsnest_token', data.token);
      localStorage.setItem('newsnest_user', JSON.stringify(data.user));

      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },

  updateProfile: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.updateProfile(userData);
      if (data.token) {
        localStorage.setItem('newsnest_token', data.token);
      }
      localStorage.setItem('newsnest_user', JSON.stringify(data.user));

      set({
        user: data.user,
        token: data.token || get().token,
        loading: false,
        error: null,
      });
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.message || 'Profile update failed.';
      set({ error: msg, loading: false });
      return { success: false, message: msg };
    }
  },

  logout: () => {
    localStorage.removeItem('newsnest_token');
    localStorage.removeItem('newsnest_user');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
