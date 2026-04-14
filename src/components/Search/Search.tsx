'use client';

import { setSearchQuery } from '@/store/features/trackSlice';
import { useAppDispatch } from '@/store/store';
import styles from '@search/search.module.css';
import { useEffect, useState } from 'react';

export default function Search() {
  const [searchInput, setSearchInput] = useState('');
  const dispatch = useAppDispatch();

  const onSearchInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(searchInput));
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput, dispatch]);

  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.search__text}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}
