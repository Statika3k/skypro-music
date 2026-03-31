'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation/Navigation';
import Search from '@/components/Search/Search';
import styles from '@/app/not-found.module.css';
import layoutStyles from '@/app/music/layout.module.css';

export default function NotFoundPage() {
  return (
    <div className={layoutStyles.wrapper}>
      <div className={layoutStyles.container}>
        <main className={layoutStyles.main}>
          <Navigation />
          
          <div className={styles['not-found__centerblock']}>
            <Search />
            
            <div className={styles['not-found']}>
              <h1 className={styles['not-found__code']}>404</h1>
              
              <div className={styles['not-found__container']}>
                <h2 className={styles['not-found__title']}>Страница не найдена</h2>
                <Image
                  className={styles['not-found__icon']}
                  width={52}
                  height={52}
                  src="/img/icon/smile_crying.svg"
                  alt="crying smile"
                />
              </div>
              
              <p className={styles['not-found__text']}>
                Возможно, она была удалена
              </p>
              <p className={styles['not-found__text']}>
                или перенесена на другой адрес
              </p>
              
              <Link
                className={styles['not-found__btn']}
                href="/music/main"
              >
                Вернуться на главную
              </Link>
            </div>
          </div>
          
          
          <footer className="footer"></footer>
        </main>
      </div>
    </div>
  );
}