import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import AddToCartButton from '../ui/AddToCartButton';
import type { Product } from '@/types/data';
import { useProductDiscount } from '@/hooks/useProductDiscount';
type ProductCardProps = {
  id: number;
  image: string;
  title: string;
  price: number;
  discount_price?: number | null;
  variant?: 'default' | 'compact';
};

export default function ProductCard({
  id,
  image,
  title,
  price,
  discount_price,
}: ProductCardProps) {
  const product: Product = {
    id: id,
    image,
    title,
    price,
    discont_price: discount_price ?? 0,
    description: '',
    createdAt: '',
    updatedAt: '',
    categoryId: '0',
  };

  const discount_percent = useProductDiscount(
    product?.price ?? 0,
    product?.discont_price
  );

  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const imageUrl = `${baseUrl}${product.image}`;

  return (
    <div key={id} className={styles.card}>
      <div className={styles.imageContainer}>
        {discount_percent > 0 && (
          <div className={styles.badge}>-{discount_percent}%</div>
        )}

        <div className={styles.btnWrapper}>
          <AddToCartButton product={product} quantity={1} />
        </div>

        <img className={styles.image} src={imageUrl} alt={title}></img>
      </div>
      <Link to={`/products/${id}`}>
        <div className={styles.info}>
          <p className={styles.title}>{title}</p>
          <div className={styles.priceWrapper}>
            {discount_price && (
              <p className={styles.productPrice}>${discount_price}</p>
            )}
            <p
              className={`${discount_price ? styles.discountedPrice : styles.productPrice}`}
            >
              ${price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
