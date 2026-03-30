'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { getTracksSelection } from '@/services/tracks/tracksApi';
import { PlayListType, TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();

  const { allTracks, fetchIsLoading, fetchError } = useAppSelector((state) => state.tracks);

  const [error, setError] = useState('');
  const [namePlayList, setNamePlayList] = useState('');
  const [categoryTracks, setCategoryTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!fetchIsLoading && allTracks.length) {
      getTracksSelection(params.id)
        .then((res: PlayListType) => {
          setNamePlayList(res.name);

          const idItems = res.items;

          const filteredTracks = allTracks.filter((track) =>
            idItems.includes(track._id),
          );

          setCategoryTracks(filteredTracks);
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setError(error.response.data);
            } else if (error.request) {
              setError('Что-то с интернетом');
            } else {
              setError('Неизвестная ошибка');
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [params.id, allTracks, fetchIsLoading]);

  return (
    <>
      <Centerblock
        playList={categoryTracks}        
        namePlaylist={namePlayList}
        isLoading={isLoading}
        error={fetchError || error}
      />
    </>
  );
}
