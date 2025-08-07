import { Spinner } from '../ui/Spinner';
import styles from './SpinnerComponent.module.css';

export default function SpinnerComponent() {
  return (
    <div className="container">
      <div className={styles.spinner_container}>
        <Spinner />
      </div>
    </div>
  );
}
