'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { resetFilters } from '@store/features/trackSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FavoritePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { favoriteTracks, fetchIsLoading, fetchError } = useAppSelector(
    (state) => state.tracks,
  );
  const { access } = useAppSelector((state) => state.auth);

  const isChecking = fetchIsLoading || !access;

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  useEffect(() => {
    if (!fetchIsLoading && !access) {
      router.push('/auth/signin');
    }
  }, [access, fetchIsLoading, router]);

  if (isChecking || fetchIsLoading) {
    return (
      <Centerblock
        playList={[]}
        namePlaylist="Избранное"
        isLoading={true}
        error=""
      />
    );
  }

  if (favoriteTracks.length === 0) {
    return (
      <Centerblock
        playList={[]}
        namePlaylist="Избранное"
        isLoading={false}
        error="У вас пока нет избранных треков"
      />
    );
  }

  return (
    <Centerblock
      playList={favoriteTracks}
      namePlaylist="Избранное"
      isLoading={false}
      error={fetchError || ''}
    />
  );
}
