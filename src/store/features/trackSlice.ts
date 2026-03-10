import { TrackType } from '@/sharedTypes/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentTrack: null | TrackType;
  isPlay: boolean;
  playlist: TrackType[];
  isShuffle: boolean;
  shuffledPlayList: TrackType[];
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  isShuffle: false,
  playlist: [],
  shuffledPlayList: [],
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlayList = [...state.playlist].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlayList
        : state.playlist;
      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curIndex === -1) {
        state.currentTrack = playlist[0] || null;
        return;
      }
      const nextIndexTrack = curIndex + 1;
      if (nextIndexTrack < playlist.length) {
        state.currentTrack = playlist[nextIndexTrack];
      } else if (playlist.length > 0) {
        state.currentTrack = playlist[0];
      } else {
        state.currentTrack = null;
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlayList
        : state.playlist;
      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );
      if (curIndex === -1) {
        state.currentTrack = playlist[0] || null;
        return;
      }
      const prevIndexTrack = curIndex - 1;
      if (prevIndexTrack >= 0) {
        state.currentTrack = playlist[prevIndexTrack];
      } else if (playlist.length > 0) {
        state.currentTrack = playlist[playlist.length - 1];
      } else {
        state.currentTrack = null;
      }
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setCurrentPlaylist,
  setNextTrack,
  setPrevTrack,
  toggleShuffle,
} = trackSlice.actions;
export const trackSliceReducer = trackSlice.reducer;
