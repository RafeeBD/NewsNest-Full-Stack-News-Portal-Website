import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to request authorization header if logged in
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('newsnest_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
  updateProfile: async (userData) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  },
};

// News Services
export const newsService = {
  getAllNews: async (params = {}) => {
    const response = await api.get('/news', { params });
    return response.data;
  },
  getTopNews: async () => {
    const response = await api.get('/news/top');
    return response.data;
  },
  getNewsById: async (id) => {
    const response = await api.get(`/news/${id}`);
    return response.data;
  },
  createNews: async (newsData) => {
    const response = await api.post('/news', newsData);
    return response.data;
  },
  updateNews: async (id, newsData) => {
    const response = await api.put(`/news/${id}`, newsData);
    return response.data;
  },
  deleteNews: async (id) => {
    const response = await api.delete(`/news/${id}`);
    return response.data;
  },
  getComments: async (newsId) => {
    const response = await api.get(`/news/${newsId}/comments`);
    return response.data;
  },
  addComment: async (newsId, content) => {
    const response = await api.post(`/news/${newsId}/comments`, { content });
    return response.data;
  },
};

// User Dashboard Services
export const userService = {
  getMyNews: async () => {
    const response = await api.get('/user/my-news');
    return response.data;
  },
};

// Contact Service
export const contactService = {
  sendMessage: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },
};

export default api;
