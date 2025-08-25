import { SpinnerIcon } from '../icons/SpinnerIcon';
import styles from './Spinner.module.css';

export default function Spinner() {
  return (
    <div className="container">
      <div className={styles.spinner_container}>
        <SpinnerIcon />
      </div>
    </div>
  );
}
