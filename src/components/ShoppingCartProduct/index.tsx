import type { Product } from '@/types/data';
import QuantityCounterComponent from '../ui/ProductQuantity';
import styles from './ShoppingCartProduct.module.css';
import CloseIcon from '../ui/icons/CloseIcon';
import { Link } from 'react-router-dom';

type ShoppingCartProductProps = {
  product: Product;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
  quantity: number;
  id: number;
};

export default function ShoppingCartProduct({
  product,
  onDecrement,
  onIncrement,
  onDelete,
  quantity,
  id,
}: ShoppingCartProductProps) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const imageUrl = `${baseUrl}${product.image}`;

  return (
    <div className={styles.product}>
      <div className={styles.imageWrapper}>
        <Link to={`/products/${id}`}>
          <img src={imageUrl} className={styles.image}></img>
        </Link>
      </div>

      <div className={styles.data}>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>{product.title}</p>
          <button onClick={onDelete} className={styles.deleteBtn}>
            <CloseIcon className={styles.icon} />
          </button>
        </div>
        <div className={styles.priceWrapper}>
          <QuantityCounterComponent
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <div className={styles.prices}>
            {product.discont_price > 0 && (
              <p className={styles.productPrice}>
                $
                {quantity > 1
                  ? (product.discont_price * quantity).toFixed(2)
                  : product.discont_price.toFixed(2)}
              </p>
            )}
            <p
              className={`${product.discont_price ? styles.discontPrice : styles.productPrice}`}
            >
              $
              {quantity > 1
                ? (product.price * quantity).toFixed(2)
                : product.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
