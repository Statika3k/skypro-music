'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getAllTracks, getTracksSelection } from '@/services/tracks/tracksApi';
import { PlayListType, TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();

  const [allTracks, setAllTracks] = useState<TrackType[]>([]);
  const [categoryTracks, setCategoryTracks] = useState<TrackType[]>([]);
  const [selectionName, setSelectionName] = useState('Подборка');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isTracksLoaded, setIsTracksLoaded] = useState(false);

  useEffect(() => {
    getAllTracks()
      .then((res) => {
        setAllTracks(res);
        setIsTracksLoaded(true);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(
              error.response.data?.message || 'Ошибка загрузки подборки',
            );
          } else if (error.request) {
            setError('Отсутствует интернет. Попробуйте позже');
          } else {
            setError('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isTracksLoaded) {
      getTracksSelection(params.id)
        .then((res: PlayListType) => {
          setSelectionName(res.name);

          const filtered = allTracks.filter((track) =>
            res.items.includes(track._id),
          );
          setCategoryTracks(filtered);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setError(
                error.response.data?.message || 'Ошибка загрузки подборки',
              );
            } else if (error.request) {
              setError('Отсутствует интернет. Попробуйте позже');
            } else {
              setError('Неизвестная ошибка');
            }
          }
        });
    }
  }, [params.id, isTracksLoaded, allTracks]);

  return (
    <Centerblock
      playList={categoryTracks}
      namePlaylist={selectionName}
      isLoading={isLoading}
      error={error}
    />
  );
}
