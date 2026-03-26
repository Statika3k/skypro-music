'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { getAllTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllTracks()
      .then((res) => {
        setTracks(res);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setError(error.response.data);
          } else if (error.request) {
            setError('Отсутствует интернет. Попробуйте позже');
          } else {
            setError('Неизвестная ошибка. Попробуйте позже');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <>
    <Centerblock playList={tracks} isLoading={isLoading} error={error}/>
    </>
  );
}
