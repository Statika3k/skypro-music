'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect } from 'react';
import { getAllTracks } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  resetFilters,
  setAllTracks,
  setFetchError,
  setFetchIsLoading,
} from '@/store/features/trackSlice';

export default function Home() {
  const dispatch = useAppDispatch();
  const { filterTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFetchIsLoading(true));
    getAllTracks()
      .then((res) => {
        // ✅ Отправляем треки в Redux
        console.log('🎵 Треки из API:', res); // ← Для отладки
        console.log('🎵 Длина массива:', res.length); // ← Проверьте здесь
        
        dispatch(setAllTracks(res));
        dispatch(setFetchError(''));
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            dispatch(setFetchError(error.response.data));
          } else if (error.request) {
            dispatch(setFetchError('Отсутствует интернет. Попробуйте позже'));
          } else {
            dispatch(setFetchError('Неизвестная ошибка. Попробуйте позже'));
          }
        }
      })
      .finally(() => {
        dispatch(setFetchIsLoading(false));
      });
  }, [dispatch]);

  return (
    <>
      <Centerblock
        playList={filterTracks}
        namePlaylist="Треки"
        isLoading={fetchIsLoading}
        error={fetchError || ''}
      />
    </>
  );
}
