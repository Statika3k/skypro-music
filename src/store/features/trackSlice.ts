import { TrackType } from '@/sharedTypes/sharedTypes';
import { applyFilters } from '@/utils/applyFilters';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  allTracks: TrackType[];
  isShuffle: boolean;
  shuffledPlayList: TrackType[];
  currentPlaylist: TrackType[];
  favoriteTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
  pagePlaylist: TrackType[];
  filterTracks: TrackType[];
  searchQuery: string;
  filters: {
    authors: string[];
    genres: string[];
    years: string;
  };
};

const getInitialFavoriteTracks = (): TrackType[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  const saved = localStorage.getItem('favoriteTracks');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
  return [];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  allTracks: [],
  shuffledPlayList: [],
  currentPlaylist: [],
  favoriteTracks: getInitialFavoriteTracks(),
  fetchError: null,
  fetchIsLoading: true,
  pagePlaylist: [],
  filterTracks: [],
  searchQuery: '',
  filters: {
    authors: [],
    genres: [],
    years: 'По умолчанию',
  },
};

const getNextOrPrevTrack = (
  playlist: TrackType[],
  currentTrack: TrackType | null,
  direction: 'next' | 'prev',
): TrackType | null => {
  if (!currentTrack) return null;

  const currIdx = playlist.findIndex((el) => el._id === currentTrack._id);
  if (currIdx === -1) return null;

  const nexIdx = direction === 'next' ? currIdx + 1 : currIdx - 1;
  if (nexIdx < 0 || nexIdx >= playlist.length) return null;

  return playlist[nexIdx];
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.currentPlaylist = action.payload;
      state.shuffledPlayList = [...action.payload].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setIsShuffled: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlayList
        : state.currentPlaylist;
      const nextTrack = getNextOrPrevTrack(
        playlist,
        state.currentTrack,
        'next',
      );
      if (nextTrack) {
        state.currentTrack = nextTrack;
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlayList
        : state.currentPlaylist;
      const prevTrack = getNextOrPrevTrack(
        playlist,
        state.currentTrack,
        'prev',
      );
      if (prevTrack) {
        state.currentTrack = prevTrack;
      }
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
      state.pagePlaylist = action.payload;
      state.filterTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('favoriteTracks', JSON.stringify(action.payload));
      }
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      const exists = state.favoriteTracks.some(
        (t) => t._id === action.payload._id,
      );
      if (!exists) {
        state.favoriteTracks = [...state.favoriteTracks, action.payload];
        if (typeof window !== 'undefined') {
          localStorage.setItem(
            'favoriteTracks',
            JSON.stringify(state.favoriteTracks),
          );
        }
      }
    },
    removeLikedTracks: (state, action: PayloadAction<number>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (track) => track._id !== action.payload,
      );
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'favoriteTracks',
          JSON.stringify(state.favoriteTracks),
        );
      }
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
    setPagePlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.pagePlaylist = action.payload;
      state.filterTracks = action.payload;
    },
    setFilterAuthors: (state, action: PayloadAction<string>) => {
      const author = action.payload;
      if (state.filters.authors.includes(author)) {
        state.filters.authors = state.filters.authors.filter((el) => {
          return el !== author;
        });
      } else {
        state.filters.authors = [...state.filters.authors, author];
      }

      state.filterTracks = applyFilters(state);
    },
    setFilterGenres: (state, action: PayloadAction<string>) => {
      const genres = action.payload;
      if (state.filters.genres.includes(genres)) {
        state.filters.genres = state.filters.genres.filter((el) => {
          return el !== genres;
        });
      } else {
        state.filters.genres = [...state.filters.genres, genres];
      }

      state.filterTracks = applyFilters(state);
    },
    setFilterYears: (state, action: PayloadAction<string>) => {
      state.filters.years = action.payload;
      state.filterTracks = applyFilters(state);
    },
    resetFilters: (state) => {
      state.filters = {
        authors: [],
        genres: [],
        years: 'По умолчанию',
      };
      state.filterTracks = state.pagePlaylist;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filterTracks = applyFilters(state);
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setCurrentPlaylist,
  setNextTrack,
  setPrevTrack,
  setIsShuffled,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFilterAuthors,
  setPagePlaylist,
  setFilterGenres,
  setFilterYears,
  resetFilters,
  setSearchQuery,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
