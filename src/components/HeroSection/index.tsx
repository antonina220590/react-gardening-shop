import styles from './HeroSection.module.css';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { useEffect, useRef, useState } from 'react';

export default function HeroSection() {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isPlaceholderLoaded, setIsPlaceholderLoaded] = useState(false);

  useEffect(() => {
    const node = imageRef.current;
    if (!isPlaceholderLoaded) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const img = entries[0].target as HTMLImageElement;
        const finalSrc = img.dataset.src;

        if (finalSrc) {
          img.src = finalSrc;
          img.onload = () => {
            img.classList.add(styles.loaded);
          };
          img.removeAttribute('data-src');
        }

        if (node) {
          observer.unobserve(node);
        }
      }
    });

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, [isPlaceholderLoaded]);
  return (
    <section className={styles.hero}>
      <div className="container">
        <img
          ref={imageRef}
          src="/hero_placeholder.png"
          data-src="/hero.webp"
          alt="Amazing garden products"
          className={styles.heroImage}
          onLoad={() => setIsPlaceholderLoaded(true)}
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
