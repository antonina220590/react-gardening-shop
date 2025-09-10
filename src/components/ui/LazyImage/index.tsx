import { useEffect, useRef, useState } from 'react';
import styles from './LazyImage.module.css';

type LazyImageProps = {
  src: string;
  dataSrc: string;
  alt: string;
  className: string;
};

export default function LazyImage({
  src,
  dataSrc,
  alt,
  className,
}: LazyImageProps) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [isPlaceholderLoaded, setIsPlaceholderLoaded] = useState(false);

  useEffect(() => {
    const node = imageRef.current;
    if (!node || !isPlaceholderLoaded) return;

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
        observer.unobserve(node);
      }
    });

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [isPlaceholderLoaded]);

  return (
    <img
      ref={imageRef}
      src={src}
      data-src={dataSrc}
      alt={alt}
      className={`${className} ${styles.image}`}
      onLoad={() => {
        if (imageRef.current?.src.includes('placeholder')) {
          setIsPlaceholderLoaded(true);
        }
      }}
    />
  );
}
