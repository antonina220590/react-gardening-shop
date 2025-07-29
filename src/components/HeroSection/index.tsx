import styles from './HeroSection.module.css';
import ButtonCard from '../ui/ButtonCard';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.hero_title}>
          Amazing Discounts
          <br /> on Garden Products!
        </h1>
        <Link to="/sales">
          ≈
          <ButtonCard text="Check out" />
        </Link>
      </div>
    </section>
  );
}
