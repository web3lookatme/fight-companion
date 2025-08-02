import { create } from 'zustand';
import toast from 'react-hot-toast';
import { apiService } from './api';
import type { Fighter, Event, News, Comment, User } from './types';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  fighters: Fighter[];
  events: Event[];
  news: News[];
  comments: Comment[];
  loading: boolean;
  error: string | null;
  favoriteFighterIds: number[];
  login: (credentials: { email: string; pass: string }) => Promise<void>;
  logout: () => void;
  toggleFavorite: (id: number, name: string) => void;
  fetchFighters: () => Promise<void>;
  fetchEvents: () => Promise<void>;
  fetchNews: () => Promise<void>;
  fetchFighterById: (id: string) => Promise<Fighter | undefined>;
  fetchComments: (postId: string) => Promise<void>;
  addComment: (comment: { postId: string; author: string; content: string }) => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  user: JSON.parse(sessionStorage.getItem('user') || 'null'),
  isAuthenticated: !!sessionStorage.getItem('user'),
  fighters: [],
  events: [],
  news: [],
  comments: [],
  loading: false,
  error: null,
  favoriteFighterIds: JSON.parse(localStorage.getItem('favoriteFighterIds') || '[]'),

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const users = await apiService.login(credentials);
      if (users.length > 0) {
        const user = users[0];
        sessionStorage.setItem('user', JSON.stringify(user));
        set({ user, isAuthenticated: true, loading: false });
        toast.success(`Welcome back, ${user.name}!`);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      toast.error((error as Error).message);
    }
  },

  logout: () => {
    sessionStorage.removeItem('user');
    set({ user: null, isAuthenticated: false });
    toast.success('Logged out successfully');
  },

  toggleFavorite: (id: number, name: string) => {
    const { favoriteFighterIds } = get();
    const isFavorite = favoriteFighterIds.includes(id);
    const newFavorites = isFavorite
      ? favoriteFighterIds.filter((favId) => favId !== id)
      : [...favoriteFighterIds, id];
    
    localStorage.setItem('favoriteFighterIds', JSON.stringify(newFavorites));
    set({ favoriteFighterIds: newFavorites });

    if (isFavorite) {
      toast.error(`${name} removed from favorites`);
    } else {
      toast.success(`${name} added to favorites!`);
    }
  },

  fetchFighters: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiService.getFighters();
      set({ fighters: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiService.getEvents();
      set({ events: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchNews: async () => {
    set({ loading: true, error: null });
    try {
      const data = await apiService.getNews();
      set({ news: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchFighterById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await apiService.getFighterById(id);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return undefined;
    }
  },

  fetchComments: async (postId: string) => {
    set({ loading: true, error: null });
    try {
      const data = await apiService.getComments(postId);
      set({ comments: data, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  addComment: async (comment: { postId: string; author: string; content: string }) => {
    try {
      const newComment = await apiService.postComment(comment);
      set((state) => ({ comments: [...state.comments, newComment] }));
      toast.success('Comment posted successfully!');
    } catch (error) {
      toast.error('Failed to post comment.');
    }
  },
}));
