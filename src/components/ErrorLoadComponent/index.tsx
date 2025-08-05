import styles from './ErrorLoadComponent.module.css';

export default function ErrorLoadComponent() {
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
