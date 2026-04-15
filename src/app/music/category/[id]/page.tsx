'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getTracksSelection } from '@/services/tracks/tracksApi';
import { PlayListType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  resetFilters,
  setFetchError,  
  setPagePlaylist,
} from '@/store/features/trackSlice';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const { allTracks, fetchError, filterTracks } =
    useAppSelector((state) => state.tracks);

  const [error, setError] = useState('');
  const [namePlayList, setNamePlayList] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  useEffect(() => {
    if (allTracks.length > 0) {
      getTracksSelection(params.id)
        .then((res: PlayListType) => {
          setNamePlayList(res.name);

          const idItems = res.items;

          const filteredTracks = allTracks.filter((track) =>
            idItems.includes(track._id),
          );

          dispatch(setPagePlaylist(filteredTracks));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              dispatch(setFetchError(error.response.data));
              setError(error.response.data);
            } else if (error.request) {
              dispatch(setFetchError('Что-то с интернетом'));
              setError('Что-то с интернетом');
            } else {
              dispatch(setFetchError('Неизвестная ошибка'));
              setError('Неизвестная ошибка');
            }
          }
        })
        .finally(() => {          
          setIsLoading(false);
        });
    }
  }, [params.id, allTracks, dispatch]);

  return (
    <>
      <Centerblock
        key={`category-${params.id}`}
        playList={filterTracks}
        namePlaylist={namePlayList}
        isLoading={isLoading}
        error={fetchError || error}
      />
    </>
  );
}
