'use client';
import Link from 'next/link';
import styles from '@bar/bar.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  setIsPlaying,
  setNextTrack,
  setPrevTrack,
  setIsShuffled,
} from '@/store/features/trackSlice';
import ProgressBar from '@components/ProgressBar/ProgressBar';
import { formatTime } from '@/utils/helper';
import { useLikeTrack } from '@/hooks/useLikeTracks';

export default function Bar() {
  const currentTrack = useAppSelector((state) => state.tracks.currentTrack);
  const { toggleLike: toggleLikeBar, isLike: isLikeBar } =
    useLikeTrack(currentTrack);
  const isPlaying = useAppSelector((state) => state.tracks.isPlay);
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isShuffle = useAppSelector((state) => state.tracks.isShuffle);

  const [volume, setVolume] = useState(0.5);
  const [isLoop, setIsLoop] = useState(false);
  const [isLoadedTrack, setIsLoadedTrack] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const isPlayingRef = useRef(isPlaying);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;

    const cleanSrc = currentTrack.track_file.trim();

    const resetLoadedState = () => {
      setIsLoadedTrack(false);
    };

    resetLoadedState();

    if (audio.src !== cleanSrc) {
      audio.src = cleanSrc;
      audio.load();
    }

    const handleCanPlay = () => {
      setIsLoadedTrack(true);
      if (isPlayingRef.current) {
        audio.play().catch((error) => {
          console.warn('Playback failed:', error);
          dispatch(setIsPlaying(false));
        });
      }
    };

    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentTrack, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack || !isLoadedTrack) return;

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn('Playback blocked:', error);
          dispatch(setIsPlaying(false));
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack, isLoadedTrack, dispatch]);

  const togglePlay = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const toggleLoop = () => {
    setIsLoop(!isLoop);
  };

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const onEnded = () => {
    if (isLoop) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      dispatch(setNextTrack());
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const inputTime = Number(e.target.value);

      audioRef.current.currentTime = inputTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
  };

  const onNextTrack = () => {
    dispatch(setNextTrack());
  };

  const onPrevTrack = () => {
    dispatch(setPrevTrack());
  };

  if (!currentTrack) return null;
  return (
    <div className={styles.bar}>
      <audio
        ref={audioRef}
        src={currentTrack?.track_file.trim()}
        preload="metadata"
        loop={false}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={onEnded}
      ></audio>

      <div className={styles.bar__content}>
        <ProgressBar
          max={duration}
          readOnly={!isLoadedTrack}
          value={currentTime}
          step={1}
          onChange={onChangeProgress}
        />
        <div className={styles.bar__playerProgress}>
          <span className={styles.playerProgress__time}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div className={styles.bar__playerBlock}>
          <div className={styles.bar__player}>
            <div className={styles.player__controls}>
              <div
                className={styles.player__btnPrev}
                onClick={onPrevTrack}
                role="button"
                tabIndex={0}
              >
                <svg className={styles.player__btnPrevSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>

              <div
                className={classNames(styles.player__btnPlay, styles.btn)}
                onClick={togglePlay}
                role="button"
                tabIndex={0}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                <svg className={styles.player__btnPlaySvg}>
                  <use
                    xlinkHref={
                      isPlaying
                        ? '/img/icon/sprite.svg#icon-pause'
                        : '/img/icon/sprite.svg#icon-play'
                    }
                  ></use>
                </svg>
              </div>

              <div className={styles.player__btnNext} onClick={onNextTrack}>
                <svg className={styles.player__btnNextSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-next"></use>
                </svg>
              </div>

              <div
                onClick={toggleLoop}
                className={classNames(
                  styles.player__btnRepeat,
                  styles.btnIcon,
                  { [styles.active]: isLoop },
                )}
              >
                <svg className={styles.player__btnRepeatSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-repeat"></use>
                </svg>
              </div>

              <div
                className={classNames(
                  styles.player__btnShuffle,
                  styles.btnIcon,
                  { [styles.active]: isShuffle },
                )}
                onClick={() => dispatch(setIsShuffled(!isShuffle))}
              >
                <svg className={styles.player__btnShuffleSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div className={styles.player__trackPlay}>
              <div className={styles.trackPlay__contain}>
                <div className={styles.trackPlay__image}>
                  <svg className={styles.trackPlay__svg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlay__author}>
                  <Link className={styles.trackPlay__authorLink} href="">
                    {currentTrack.author}
                  </Link>
                </div>
                <div className={styles.trackPlay__album}>
                  <Link className={styles.trackPlay__albumLink} href="">
                    {currentTrack.album}
                  </Link>
                </div>
              </div>

              <div className={styles.trackPlay__dislike}>
                <div
                  className={classNames(
                    styles.player__btnShuffle,
                    styles.btnIcon,
                  )}
                >
                  <svg
                    className={classNames(styles.trackPlay__likeSvg, {
                      [styles.liked]: isLikeBar,
                    })}
                    onClick={toggleLikeBar}
                    role="button"
                    tabIndex={0}
                    aria-label={
                      isLikeBar
                        ? 'Убрать из избранного'
                        : 'Добавить в избранное'
                    }
                  >
                    <use
                      xlinkHref={`/img/icon/sprite.svg#${isLikeBar ? 'icon-like' : 'icon-dislike'}`}
                    ></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.bar__volumeBlock}>
            <div className={styles.volume__content}>
              <div className={styles.volume__image}>
                <svg className={styles.volume__svg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-volume"></use>
                </svg>
              </div>
              <div className={classNames(styles.volume__progress, styles.btn)}>
                <input
                  className={classNames(
                    styles.volume__progressLine,
                    styles.btn,
                  )}
                  type="range"
                  name="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  aria-label="Громкость"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
