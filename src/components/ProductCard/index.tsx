import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import AddToCartButton from '../ui/AddToCartButton';
import type { Product } from '@/types/data';
import { useProductDiscount } from '@/hooks/useProductDiscount';
type ProductCardProps = {
  product: Product;
  variant?: 'default' | 'compact';
};

export default function ProductCard({ product }: ProductCardProps) {
  const { id, image, title, price, discont_price } = product;
  const discount_percent = useProductDiscount(
    product?.price ?? 0,
    product?.discont_price
  );

  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const imageUrl = `${baseUrl}${image}`;

  return (
    <div key={id} className={styles.card}>
      <div className={styles.imageContainer}>
        {discount_percent > 0 && (
          <div className={styles.badge}>-{discount_percent}%</div>
        )}

        <div className={styles.btnWrapper}>
          <AddToCartButton product={product} quantity={1} />
        </div>
        <div className={styles.imageWrapper}>
          <img className={styles.image} src={imageUrl} alt={title}></img>
        </div>
      </div>
      <Link to={`/products/${id}`}>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <div className={styles.priceWrapper}>
            {discont_price && (
              <p className={styles.productPrice}>${discont_price}</p>
            )}
            <p
              className={`${discont_price ? styles.discountedPrice : styles.productPrice}`}
            >
              ${price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
