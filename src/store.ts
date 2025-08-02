import { create } from 'zustand';
import toast from 'react-hot-toast';
import { apiService } from './api-supabase';
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
  clearFavorites: () => void;
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

const reducer = (state: AppState, action: { type: string; payload?: any }): Partial<AppState> => {
  switch (action.type) {
    case 'SET_LOADING':
      return { loading: action.payload };
    case 'SET_ERROR':
      return { error: action.payload, loading: false };
    case 'SET_FIGHTERS':
      return { fighters: action.payload, loading: false };
    case 'SET_EVENTS':
      return { events: action.payload, loading: false };
    case 'SET_NEWS':
      return { news: action.payload, loading: false };
    case 'SET_COMMENTS':
      return { comments: action.payload, loading: false };
    case 'ADD_COMMENT':
      return { comments: [...state.comments, action.payload] };
    case 'SET_USER':
      return { user: action.payload, isAuthenticated: !!action.payload, loading: false };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    case 'SET_FAVORITES':
      return { favoriteFighterIds: action.payload };
    default:
      return state;
  }
};

const dispatch = (action: { type: string; payload?: any }) => useStore.setState(state => reducer(state, action));

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
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const users = await apiService.login(credentials);
      if (users.length > 0) {
        const user = users[0];
        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'SET_USER', payload: user });
        toast.success(`Welcome back, ${user.name}!`);
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      toast.error((error as Error).message);
    }
  },

  logout: () => {
    sessionStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  },

  clearFavorites: () => {
    localStorage.removeItem('favoriteFighterIds');
    dispatch({ type: 'SET_FAVORITES', payload: [] });
    toast.success('Favorites cleared');
  },

  toggleFavorite: (id: number, name: string) => {
    const { favoriteFighterIds } = get();
    const isFavorite = favoriteFighterIds.includes(id);
    const newFavorites = isFavorite
      ? favoriteFighterIds.filter((favId) => favId !== id)
      : [...favoriteFighterIds, id];
    
    localStorage.setItem('favoriteFighterIds', JSON.stringify(newFavorites));
    dispatch({ type: 'SET_FAVORITES', payload: newFavorites });

    if (isFavorite) {
      toast.error(`${name} removed from favorites`);
    } else {
      toast.success(`${name} added to favorites!`);
    }
  },

  fetchFighters: async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await apiService.getFighters();
      dispatch({ type: 'SET_FIGHTERS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  },

  fetchEvents: async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await apiService.getEvents();
      dispatch({ type: 'SET_EVENTS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  },

  fetchNews: async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await apiService.getNews();
      dispatch({ type: 'SET_NEWS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  },

  fetchFighterById: async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await apiService.getFighterById(id);
      dispatch({ type: 'SET_LOADING', payload: false });
      return data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      return undefined;
    }
  },

  fetchEventById: async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await apiService.getEventById(id);
      dispatch({ type: 'SET_LOADING', payload: false });
      return data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      return undefined;
    }
  },

  fetchNewsById: async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await apiService.getNewsById(id);
      dispatch({ type: 'SET_LOADING', payload: false });
      return data;
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
      return undefined;
    }
  },

  fetchComments: async (postId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = await apiService.getComments(postId);
      dispatch({ type: 'SET_COMMENTS', payload: data });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  },

  addComment: async (comment: { postId: string; author: string; content: string }) => {
    try {
      const newComment = await apiService.postComment(comment);
      dispatch({ type: 'ADD_COMMENT', payload: newComment });
      toast.success('Comment posted successfully!');
    } catch (error) {
      toast.error('Failed to post comment.');
    }
  },
}));
