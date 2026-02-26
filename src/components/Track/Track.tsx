import Link from "next/link";
import styles from '@track/track.module.css';
import { formatTime } from "@/utils/helper";
import { TrackType } from '@/sharedTypes/sharedTypes';

type TrackProps = {
    track: TrackType;
}
export default function Track({track}: TrackProps) {
    return (
        <div  className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div>
                  <Link className={styles.track__titleLink} href="">
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
                <span className={styles.track__timeText}>{formatTime(track.duration_in_seconds)}</span>
              </div>
            </div>
          </div>
    )
}