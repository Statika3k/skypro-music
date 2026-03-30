'use client';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@navigation/navigation.module.css';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { useRouter } from 'next/navigation';
import { clearUser } from '@/store/features/authSlice';
import { useState } from 'react';

export default function Navigation() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { access } = useAppSelector((state) => state.auth);
  const isAuth = !!access;

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const logout = () => {
    dispatch(clearUser());
    router.push('/music/main');
    setIsMenuOpen(false);
  };
  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt={'logo'}
        />
      </div>

      <div
        className={classNames(styles.nav__burger, {
          [styles.nav__burger_activ]: isMenuOpen,
        })}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>

      <div
        className={classNames(styles.nav__menu, {
          [styles.nav__menu_active]: isMenuOpen,
        })}
      >
        <ul className={styles.menu__list}>
          <li className={styles.menu__item}>
            <Link href="/music/main" className={styles.menu__link}>
              Главное
            </Link>
          </li>

          {isAuth && (
            <li className={styles.menu__item}>
              <Link href="/music/favorite" className={styles.menu__link}>
                Мой плейлист
              </Link>
            </li>
          )}

          <li className={styles.menu__item}>
            {isAuth ? (
              <p onClick={logout} className={styles.menu__link}>
                Выйти
              </p>
            ) : (
              <Link
                href="/auth/signin"
                className={styles.menu__link}
                onClick={() => setIsMenuOpen(false)}
              >
                Войти
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
