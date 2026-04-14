'use client'

import styles from '@centerblock/centerblock.module.css';
import Search from '@/components/Search/Search';
import Filter from '@components/Filter/Filter';
import { TrackType } from '@/sharedTypes/sharedTypes';
import Tracklist from '../Tracklist/Tracklist';

interface CenterblockProps {
  playList: TrackType[];
  namePlaylist?: string;
  isLoading: boolean;
  error: string;
}

export default function Centerblock({
  playList,
  namePlaylist,
  isLoading,
  error,
}: CenterblockProps) {
  return (
    <div className={styles.centerblock}>
      <Search />
      <h2 className={styles.centerblock__h2}>{namePlaylist || 'Треки'}</h2>
      <Filter />
      <Tracklist playList={playList} isLoading={isLoading} error={error} />
    </div>
  );
}
