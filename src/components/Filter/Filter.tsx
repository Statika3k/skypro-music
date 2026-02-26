'use client';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getUniqueValuesByKey, getUniqueYears } from '@/utils/helper';
import styles from '@filter/filter.module.css';
import classNames from 'classnames';
import { useMemo, useRef, useState } from 'react';
import FilterItem from '@components/FilterItem/FilterItem';

type FilterType = 'author' | 'year' | 'genre' | null;

interface FilterProps {
  tracks: TrackType[];
}

export default function Filter({ tracks }: FilterProps) {
  const [filterActiv, setFilterActiv] = useState<FilterType>(null);
  const [selectedValues, setSelectedValues] = useState<Record<string, boolean>>({});
  const [dropdownLeft, setDropdownLeft] = useState(0);

  const authorRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const genreRef = useRef<HTMLDivElement>(null);

  const authors = useMemo(
    () => getUniqueValuesByKey(tracks, 'author').sort(),
    [tracks],
  );
  const years = useMemo(() => getUniqueYears(tracks), [tracks]);
  const genres = useMemo(
    () => getUniqueValuesByKey(tracks, 'genre').sort(),
    [tracks],
  );

  const handleFilterClick = (filterName: FilterType) => {

    let left = 0;
    if (filterName === 'author' && authorRef.current) {
      left = authorRef.current.offsetLeft;
    } else if (filterName === 'year' && yearRef.current) {
      left = yearRef.current.offsetLeft;
    } else if (filterName === 'genre' && genreRef.current) {
      left = genreRef.current.offsetLeft;
    }

    setFilterActiv((prev) => {
      const newFilter = prev === filterName ? null : filterName;
      if (newFilter !== prev) {
        setSelectedValues({});
        setDropdownLeft(left);
      }
      return newFilter;
    });
  };

  const handleItemClick = (value: string) => {
    setSelectedValues((prev) => {
      const newValues = { ...prev };
      if (newValues[value]) {
        delete newValues[value];
      } else {
        Object.keys(newValues).forEach((key) => delete newValues[key]);
        newValues[value] = true;
      }
      return newValues;
    });
  };

  const getFilterItems = () => {
    switch (filterActiv) {
      case 'author':
        return authors.map((author) => (
          <FilterItem
            key={author}
            text={author}
            isActive={selectedValues[author]}
            onClick={() => handleItemClick(author)}
          />
        ));
      case 'year':
        return years.map((year) => (
          <FilterItem
            key={year}
            text={year}
            isActive={selectedValues[year]}
            onClick={() => handleItemClick(year)}
          />
        ));
      case 'genre':
        return genres.map((genre) => (
          <FilterItem
            key={genre}
            text={genre}
            isActive={selectedValues[genre]}
            onClick={() => handleItemClick(genre)}
          />
        ));
      default:
        return null;
    }
  }; 

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filter__title}>Искать по:</div>
      <div
        ref={authorRef}
        className={classNames(styles.filter__button, {
          [styles.active]: filterActiv === 'author',
        })}
        onClick={() => handleFilterClick('author')}
      >
        исполнителю
      </div>
      <div
        ref={yearRef}
        className={classNames(styles.filter__button, {
          [styles.active]: filterActiv === 'year',
        })}
        onClick={() => handleFilterClick('year')}
      >
        году выпуска
      </div>
      <div
        ref={genreRef}
        className={classNames(styles.filter__button, {
          [styles.active]: filterActiv === 'genre',
        })}
        onClick={() => handleFilterClick('genre')}
      >
        жанру
      </div>

      {filterActiv && (
        <div
        className={styles.filter__dropdown}
        style={{ left: `${dropdownLeft}px` }}
        >
          <div className={styles.filter__list}>{getFilterItems()}</div>
        </div>
      )}
    </div>
  );
}
