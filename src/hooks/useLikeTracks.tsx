import { addLike, removeLike } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { addLikedTracks, removeLikedTracks } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { withReauth } from '@/utils/withReAuth';
import { AxiosError } from 'axios';
import { useState } from 'react';

type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};

export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = track
    ? favoriteTracks.some((t) => t._id === track._id)
    : false;
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggleLike = () => {
    if (!track) {
      return setErrorMsg('Трека не существует');
    }

    if (!access) {
      return setErrorMsg('Нет авторизации');
    }

    setIsLoading(true);
    setErrorMsg(null);

    const actionApi = isLike ? removeLike : addLike;

    withReauth(
      (newToken) => actionApi(newToken || access, track._id),
      refresh,
      dispatch,
      access,
    )
      .then(() => {
        if (isLike) {
          dispatch(removeLikedTracks(track._id));
        } else {
          dispatch(addLikedTracks(track));
        }
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMsg(error.response.data?.message || 'Ошибка');
          } else if (error.request) {
            setErrorMsg('Произошла ошибка. Попробуйте позже');
          } else {
            setErrorMsg('Неизвестная ошибка');
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};