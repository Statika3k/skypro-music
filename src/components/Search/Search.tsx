'use client';
import styles from '@search/search.module.css';
import { useState } from 'react';

type searchProp = {
  title: string
}
export default function Search({title}: searchProp) {
  const [searchInput, setSearchInput] = useState('');

  const onSearchInput = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setSearchInput(e.target.value);
  };
  return (
    <div className={styles.centerblock__search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      {title}
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
