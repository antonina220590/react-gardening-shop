import styles from './HeroSection.module.css';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import LazyImage from '../ui/LazyImage';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <LazyImage
          src="/hero_placeholder.png"
          dataSrc="/hero.webp"
          alt="Amazing garden products"
          className={styles.heroImage}
        />
        <h1 className={styles.title}>
          Amazing Discounts
          <br /> on Garden Products!
        </h1>
        <Link to="/sales">
          <div className={styles.btnWrapper}>
            <Button type="button" variant="card">
              Check out
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
}
