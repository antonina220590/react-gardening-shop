import styles from './NotFoundPage.module.css';
import image from '../../assets/404.png';
import { Link } from 'react-router-dom';
import ButtonCard from '@/components/ui/ButtonCard';
export default function NotFoundPage() {
  return (
    <section>
      <div className="container">
        <div className={styles.notfound_container}>
          <img className={styles.notfound_image} src={image}></img>
          <div className={styles.notfound_info_container}>
            <h1 className={styles.notfound_title}>Page Not Found</h1>
            <p className={styles.notfound_info}>
              We're sorry, the page you requested could not be found. Please go
              back to the homepage.
            </p>
          </div>
          <Link to="/">
            <div className={styles.notfound_btn}>
              <ButtonCard text="Go Home" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
