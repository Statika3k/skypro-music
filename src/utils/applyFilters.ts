import { TrackType } from '@/sharedTypes/sharedTypes';
import { initialStateType } from '@/store/features/trackSlice';

export const sortByYear = (
  tracks: TrackType[],
  sortType: string,
): TrackType[] => {
  if (sortType === 'Сначала новые') {
    return [...tracks].sort((a, b) => {
      const yearA = parseInt(a.release_date.split('-')[0]);
      const yearB = parseInt(b.release_date.split('-')[0]);
      return yearB - yearA;
    });
  } else if (sortType === 'Сначала старые') {
    return [...tracks].sort((a, b) => {
      const yearA = parseInt(a.release_date.split('-')[0]);
      const yearB = parseInt(b.release_date.split('-')[0]);
      return yearA - yearB;
    });
  }
  return tracks;
};

export const applyFilters = (state: initialStateType): TrackType[] => {
  let filteredPlaylist = [...state.pagePlaylist];

  if (state.searchQuery) {
    filteredPlaylist = filteredPlaylist.filter((track) =>
      track.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
    );
  }

  if (state.filters.authors.length > 0) {
    filteredPlaylist = filteredPlaylist.filter((track) =>
      state.filters.authors.includes(track.author),
    );
  }

  if (state.filters.genres.length > 0) {
    filteredPlaylist = filteredPlaylist.filter((track) =>
      state.filters.genres.some((genre) => track.genre.includes(genre)),
    );
  }

  filteredPlaylist = sortByYear(filteredPlaylist, state.filters.years);

  return filteredPlaylist;
};
