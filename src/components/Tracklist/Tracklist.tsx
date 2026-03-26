import { TrackType } from '@/sharedTypes/sharedTypes';
import Listheader from '../Listheader/Listheader';
import Track from '../Track/Track';
import styles from '@tracklist/tracklist.module.css';
import Loading from '../Loading/Loading';

type TracklistProps = {
  playList: TrackType[];
  isLoading: boolean;
  error: string;
};

export default function Tracklist({
  playList,
  isLoading,
  error,
}: TracklistProps) {
  return (
    <div className={styles.centerblock__content}>
      <Listheader />
      {error ? <div className={styles.errorContainer}>{error}</div> : null}
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.content__playlist}>
          {playList.map((track) => {
            return <Track key={track._id} track={track} playlist={playList} />;
          })}
        </div>
      )}
    </div>
  );
}
