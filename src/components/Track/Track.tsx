'use client';

import Link from 'next/link';
import styles from '@track/track.module.css';
import { formatTime } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setCurrentPlaylist,
  setCurrentTrack,
  setIsPlaying,
} from '@/store/features/trackSlice';
import classNames from 'classnames';
import { useLikeTrack } from '@/hooks/useLikeTracks';

type TrackProps = {
  track: TrackType;
  playlist: TrackType[];
};
export default function Track({ track, playlist }: TrackProps) {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();
  const { toggleLike, isLike, isLoading } = useLikeTrack(track);

  const isActive = currentTrack?._id === track._id;
  const isCurrentPlaying = isActive && isPlaying;

  const onClickCurrentTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
    dispatch(setCurrentPlaylist(playlist));
  };

  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>
          <div
            className={styles.track__titleImage}
            onClick={onClickCurrentTrack}
            role="button"
            tabIndex={0}
            aria-label={`Воспроизвести трек ${track.name}`}
          >
            {isActive ? (
              <span
                className={classNames(styles.playingDot, {
                  [styles.playing]: isCurrentPlaying,
                })}
                aria-label={
                  isCurrentPlaying ? 'Воспроизведение' : 'Текущий трек'
                }
              ></span>
            ) : (
              <svg className={styles.track__titleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
              </svg>
            )}
          </div>
          <div>
            <Link
              className={styles.track__titleLink}
              href=""
              onClick={onClickCurrentTrack}
            >
              {track.name}
            </Link>
          </div>
        </div>
        <div className={styles.track__author}>
          <Link className={styles.track__authorLink} href="">
            {track.author}
          </Link>
        </div>
        <div className={styles.track__album}>
          <Link className={styles.track__albumLink} href="">
            {track.album}
          </Link>
        </div>
        <div>
          <svg
            className={classNames(styles.track__timeSvg, {
              [styles.liked]: isLike,
              [styles.loading]: isLoading,
            })}
            onClick={toggleLike}
            role="button"
            tabIndex={0}
            aria-label={isLike ? 'Убрать из избранного' : 'Добавить в избранное'}
          >
            <use
              xlinkHref={`/img/icon/sprite.svg#${isLike ? 'icon-like' : 'icon-dislike'}`}
            ></use>
            </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
