import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type MovieStatus = 'unwatched' | 'watching' | 'watched';
export type ThemeMode = 'light' | 'dark' | 'system';

export interface Movie {
  id: string;
  title: string;
  year: number;
  status: MovieStatus;
  poster?: string;
  type: 'movie' | 'series';
  season?: number;
  episode?: number;
  createdAt: number;
  description?: string;
  ratingKP?: number;
  ratingIMDb?: number;
  country?: string;
  genres?: string[];
  duration?: number;
  watchUrl?: string;
  userRating?: number; 
  userNotes?: string;  
}

interface MovieState {
  movies: Movie[];
  apiLimits: {
    remaining: number;
    lastResetDate: string;
  };
  theme: ThemeMode; 
  addMovie: (movie: Movie) => void;
  removeMovie: (id: string) => void;
  updateStatus: (id: string, status: MovieStatus) => void;
  updateProgress: (id: string, s: number, e: number) => void;
  incrementEpisode: (id: string) => void;
  useToken: () => void;
  resetTokens: () => void;
  setTheme: (theme: ThemeMode) => void;
  updateWatchUrl: (id: string, url: string) => void;
  updateUserReview: (movieId: string, rating: number, notes: string) => void;
  statusColors: {
    watched: string;
    watching: string;
    unwatched: string;
  };
  setStatusColor: (status: MovieStatus, color: string) => void;
  resetStatusColors: () => void; 
  
  // 🎯 Добавлено для вибрации:
  isVibrationEnabled: boolean;
  toggleVibration: () => void;
}

const DEFAULT_STATUS_COLORS = {
  watched: '#2ecc71',
  watching: '#f39c12',
  unwatched: '#95a5a6',
};

export const useMovieStore = create<MovieState>()(
  persist(
    (set) => ({
      movies: [],
      apiLimits: {
        remaining: 200,
        lastResetDate: new Date().toISOString(),
      },
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      addMovie: (movie) => set((state) => ({
        movies: [movie, ...state.movies]
      })),
      removeMovie: (id) => set((state) => ({
        movies: state.movies.filter(m => m.id !== id)
      })),
      updateStatus: (id, status) => set((state) => ({
        movies: state.movies.map(m => m.id === id ? { ...m, status } : m)
      })),
      updateProgress: (id, s, e) => set((state) => ({
        movies: state.movies.map(m => m.id === id ? { ...m, season: s, episode: e } : m)
      })),
      incrementEpisode: (id) => set((state) => ({
        movies: state.movies.map(m => m.id === id ? { ...m, episode: (m.episode || 0) + 1 } : m)
      })),
      useToken: () => set((state) => ({
        apiLimits: { ...state.apiLimits, remaining: Math.max(0, state.apiLimits.remaining - 1) }
      })),
      resetTokens: () => set({
        apiLimits: { remaining: 200, lastResetDate: new Date().toISOString() }
      }),
      updateWatchUrl: (id, url) => set((state) => ({
        movies: state.movies.map(m => m.id === id ? { ...m, watchUrl: url } : m)
      })),
      updateUserReview: (movieId, rating, notes) => set((state) => ({
        movies: state.movies.map(m => 
          m.id === movieId ? { ...m, userRating: rating, userNotes: notes } : m
        )
      })),
      statusColors: DEFAULT_STATUS_COLORS,

      setStatusColor: (status, color) => set((state) => ({
        statusColors: { ...state.statusColors, [status]: color }
      })),
      resetStatusColors: () => set({
        statusColors: DEFAULT_STATUS_COLORS
      }),

      // 🎯 Реализация стейта вибрации (включена по умолчанию):
      isVibrationEnabled: true,
      toggleVibration: () => set((state) => ({ 
        isVibrationEnabled: !state.isVibrationEnabled 
      })),
    }),
    { name: 'movie-storage', storage: createJSONStorage(() => AsyncStorage) }
  )
);
