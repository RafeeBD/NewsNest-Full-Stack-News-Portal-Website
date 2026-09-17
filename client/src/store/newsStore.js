import { create } from 'zustand';
import { newsService } from '../services/api';

export const useNewsStore = create((set, get) => ({
  topNews: [],
  newsList: [],
  currentNews: null,
  comments: [],
  categories: ['All', 'World', 'Technology', 'Business', 'Sports', 'Politics', 'Entertainment', 'Science'],
  selectedCategory: 'All',
  searchQuery: '',
  sortBy: 'latest',
  page: 1,
  totalPages: 1,
  totalItems: 0,
  loadingTop: false,
  loadingList: false,
  loadingSingle: false,
  error: null,

  setCategory: (category) => {
    set({ selectedCategory: category, page: 1 });
    get().fetchNewsList();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query, page: 1 });
    get().fetchNewsList();
  },

  setSortBy: (sort) => {
    set({ sortBy: sort, page: 1 });
    get().fetchNewsList();
  },

  setPage: (pageNumber) => {
    set({ page: pageNumber });
    get().fetchNewsList();
  },

  fetchTopNews: async () => {
    set({ loadingTop: true });
    try {
      const data = await newsService.getTopNews();
      set({ topNews: data, loadingTop: false });
    } catch (err) {
      console.error('Error fetching top news:', err);
      set({ loadingTop: false });
    }
  },

  fetchNewsList: async () => {
    set({ loadingList: true, error: null });
    try {
      const { selectedCategory, searchQuery, sortBy, page } = get();
      const params = {
        category: selectedCategory,
        search: searchQuery,
        sort: sortBy,
        page,
        limit: 9,
      };
      const data = await newsService.getAllNews(params);
      set({
        newsList: data.news || [],
        page: data.page || 1,
        totalPages: data.pages || 1,
        totalItems: data.total || 0,
        loadingList: false,
      });
    } catch (err) {
      console.error('Error fetching news list:', err);
      set({ error: 'Failed to load news articles', loadingList: false });
    }
  },

  fetchNewsById: async (id) => {
    set({ loadingSingle: true, currentNews: null, error: null });
    try {
      const data = await newsService.getNewsById(id);
      set({ currentNews: data, loadingSingle: false });
      // Fetch comments for this news
      get().fetchComments(id);
    } catch (err) {
      console.error('Error fetching news details:', err);
      set({ error: 'Article not found', loadingSingle: false });
    }
  },

  fetchComments: async (newsId) => {
    try {
      const data = await newsService.getComments(newsId);
      set({ comments: data });
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  },

  addComment: async (newsId, content) => {
    try {
      const newComment = await newsService.addComment(newsId, content);
      set((state) => ({ comments: [newComment, ...state.comments] }));
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || 'Failed to post comment' };
    }
  },
}));
