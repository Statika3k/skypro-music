'use client';
import styles from '@filterItem/filterItem.module.css';
import classNames from 'classnames';

interface filterItemProps {
  activFilter: null | string;
  changeActiveFilter: (n: string) => void;
  nameFilter: string;
  list: string[];
  titleFilter: string;
  onSelect: (value: string) => void;
}

export default function FilterItem({
  activFilter,
  changeActiveFilter,
  nameFilter,
  list,
  titleFilter,
  onSelect,
}: filterItemProps) {
  return (
    <div className={styles.filter__wrapper}>
      <div
        className={classNames(styles.filter__button, {
          [styles.active]: activFilter === nameFilter,
        })}
        onClick={() => changeActiveFilter(nameFilter)}
      >
        {titleFilter}
      </div>
      {activFilter === nameFilter && (
        <div className={styles.filter__dropdown}>
          <ul className={styles.filter__list}>
            {list.map((el, index) => (
              <li
                key={index}
                onClick={() => onSelect(el)}
                className={styles.filter__item}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
