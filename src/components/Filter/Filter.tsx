'use client';
import { getUniqueValuesByKey } from '@/utils/helper';
import styles from '@/filter/filter.module.css';
import { useEffect, useState } from 'react';
import FilterItem from '@/components/FilterItem/FilterItem';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
} from '@/store/features/trackSlice';

export default function Filter() {
  const [activeFilter, setActiveFilter] = useState<null | string>(null);
  const dispatch = useAppDispatch();

  const { allTracks } = useAppSelector((state) => state.tracks);

  // ✅ Проверка в консоли
  useEffect(() => {
    console.log('allTracks в Filter:', allTracks);
    console.log('Количество треков:', allTracks.length);
  }, [allTracks]);

  const changeActiveFilter = (nameFilter: string) => {
    if (activeFilter === nameFilter) {
      return setActiveFilter(null);
    }

    setActiveFilter(nameFilter);
  };

  const uniqAuthors = getUniqueValuesByKey(allTracks, 'author');  
  const uniqGenres = getUniqueValuesByKey(allTracks, 'genre');
  const years = ['Сначала новые', 'Сначала старые', 'По умолчанию'];

  const onSelectAuthor = (author: string) => {
    dispatch(setFilterAuthors(author));
  };

  const onSelectGenres = (genres: string) => {
    dispatch(setFilterGenres(genres));
  };

  const onSelectYear = (year: string) => {
    dispatch(setFilterYears(year));
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filter__title}>Искать по:</div>
      <FilterItem
        activFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'author'}
        list={uniqAuthors}
        titleFilter={'исполнителю'}
        onSelect={onSelectAuthor}
      />
      <FilterItem
        activFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'years'}
        list={years}
        titleFilter={'году выпуска'}
        onSelect={onSelectYear}
      />
      <FilterItem
        activFilter={activeFilter}
        changeActiveFilter={changeActiveFilter}
        nameFilter={'genre'}
        list={uniqGenres}
        titleFilter={'жанру'}
        onSelect={onSelectGenres}
      />
    </div>
  );
}
