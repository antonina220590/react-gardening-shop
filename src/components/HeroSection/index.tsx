import styles from './HeroSection.module.css';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.hero_title}>
          Amazing Discounts
          <br /> on Garden Products!
        </h1>
        <Link to="/sales">
          <div className={styles.btn_container}>
            <Button type="button" variant="card">
              Check out
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
}
