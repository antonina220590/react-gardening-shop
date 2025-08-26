import styles from './ErrorMessage.module.css';

export default function ErrorMessaget() {
  return (
    <div className="container">
      <div className={styles.error_container}>
        <p className={styles.error_text}>
          Could not load data. Please try again later.
        </p>
      </div>
    </div>
  );
}
