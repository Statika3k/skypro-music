'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@sidebar/sidebar.module.css';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/store';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/store/features/authSlice';

export default function Sidebar() {
  const userName = useAppSelector((state) => state.auth.username);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleExit = () => {
    dispatch(clearUser());
    localStorage.removeItem('userId');
    router.push('/auth/signin');
  };
  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{userName || 'Гость'}</p>
        <div
          className={styles.sidebar__icon}
          onClick={handleExit}
          data-testid="sidebar-exit"
        >
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/2">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/3">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link className={styles.sidebar__link} href="/music/category/4">
              <Image
                className={styles.sidebar__img}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
