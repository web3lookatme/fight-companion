import { create } from 'zustand';
import toast from 'react-hot-toast';
import { apiService } from './api-supabase';
import type { Fighter, Event, News, Comment, User } from './types';

// ... (AppState interface remains the same)

const reducer = (state: AppState, action: any): Partial<AppState> => {
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

const dispatch = (action: any) => useStore.setState(state => reducer(state, action));

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

export const useStore = create<AppState>((set, get) => ({
  // ... (initial state remains the same)

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
    // ... (toggleFavorite remains the same)
  },
  // ... (other actions remain the same)
}));