import styles from '@loading/loading.module.css'

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loader}></div>
      <span>Загрузка треков...</span>
    </div>
  );
}
