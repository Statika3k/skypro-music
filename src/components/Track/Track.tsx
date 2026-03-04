'use client';

import Link from 'next/link';
import styles from '@track/track.module.css';
import { formatTime } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setCurrentTrack, setIsPlay } from '@/store/features/trackSlice';
import classNames from 'classnames';

type TrackProps = {
  track: TrackType;
};
export default function Track({ track }: TrackProps) {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();

  const isActive = currentTrack?._id === track._id;
  const isCurrentPlaying = isActive && isPlaying;

  const onClickTrack = () => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlay(true));
  };

  return (
    <div className={styles.playlist__item}>
      <div className={styles.playlist__track}>
        <div className={styles.track__title}>       

          <div className={styles.track__titleImage}>
            {isActive ? (
              <span
                className={classNames(styles.playingDot, {
                  [styles.playing]: isCurrentPlaying,
                })}
                aria-label={isCurrentPlaying ? 'Воспроизведение' : 'Текущий трек'}
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
              onClick={onClickTrack}
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
          <svg className={styles.track__timeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.track__timeText}>
            {formatTime(track.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
