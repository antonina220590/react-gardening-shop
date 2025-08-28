import styles from './ErrorMessage.module.css';

export default function ErrorMessage() {
  return (
    <div className="container">
      <div className={styles.wrapper}>
        <p className={styles.text}>
          Could not load data. Please try again later.
        </p>
      </div>
    </div>
  );
}
