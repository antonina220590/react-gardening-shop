import { Link } from 'react-router-dom';
import styles from './ProductCard.module.css';
import AddToCartButton from '../ui/AddToCartBtn';
import type { Product } from '@/types/data';
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
  const baseUrl = 'http://localhost:3333';
  const imageUrl = `${baseUrl}${image}`;
  let discount_percent = 0;
  if (discount_price) {
    discount_percent = Math.round(((price - discount_price) / price) * 100);
  }

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

  return (
    <div key={id} className={styles.product_card}>
      <div className={styles.product_img}>
        {discount_percent > 0 && (
          <div className={styles.discount_badge}>-{discount_percent}%</div>
        )}

        <div className={styles.product_btn}>
          <AddToCartButton product={product} quantity={1} />
        </div>

        <img src={imageUrl} alt={title}></img>
      </div>
      <Link to={`/products/${id}`}>
        <div className={styles.product_info}>
          <p className={styles.product_title}>{title}</p>
          <div className={styles.price_container}>
            {discount_price && (
              <p className={styles.product_price}>${discount_price}</p>
            )}
            <p
              className={`${discount_price ? styles.product_discounted_price : styles.product_price}`}
            >
              ${price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
