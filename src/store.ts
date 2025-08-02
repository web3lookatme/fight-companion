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
  fetchEventById: (id: string) => Promise<Event | undefined>;
  fetchNewsById: (id: string) => Promise<News | undefined>;
  fetchComments: (postId: string) => Promise<void>;
  addComment: (comment: { postId: string; author: string; content: string }) => Promise<void>;
}

// ... (store implementation)

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

  fetchEventById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await apiService.getEventById(id);
      set({ loading: false });
      return data;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return undefined;
    }
  },

  fetchNewsById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const data = await apiService.getNewsById(id);
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
