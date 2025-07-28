import styles from './HeroSection.module.css';
import ButtonCard from '../ButtonCard';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className="container">
        <h1 className={styles.hero_title}>
          Amazing Discounts
          <br /> on Garden Products!
        </h1>
        <ButtonCard text="Check out" />
      </div>
    </section>
  );
}
