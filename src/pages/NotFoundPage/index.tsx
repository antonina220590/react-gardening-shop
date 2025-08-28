import styles from './NotFoundPage.module.css';
import image from '../../assets/404.png';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button';
export default function NotFoundPage() {
  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.notfound}>
          <img className={styles.image} src={image}></img>
          <div className={styles.infoWrapper}>
            <h1 className={styles.title}>Page Not Found</h1>
            <p className={styles.info}>
              We're sorry, the page you requested could not be found. Please go
              back to the homepage.
            </p>
          </div>
          <Link to="/">
            <div className={styles.btn}>
              <Button type="button" variant="card">
                Go Home
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
