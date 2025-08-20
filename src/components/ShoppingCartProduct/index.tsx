import type { Product } from '@/types/data';
import QuantityCounterComponent from '../CounterComponent';
import styles from './ShoppingCartProduct.module.css';
import CloseIcon from '../ui/CloseIcon';
import { Link } from 'react-router-dom';

type ShoppingCartComponentProps = {
  product: Product;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
  quantity: number;
  id: number;
};

export default function ShoppingCartComponent({
  product,
  onDecrement,
  onIncrement,
  onDelete,
  quantity,
  id,
}: ShoppingCartComponentProps) {
  const baseUrl = 'http://localhost:3333';
  const imageUrl = `${baseUrl}${product.image}`;

  return (
    <div className={styles.product_container}>
      <div className={styles.product_img_container}>
        <Link to={`/products/${id}`}>
          <img src={imageUrl} className={styles.product_img}></img>
        </Link>
      </div>

      <div className={styles.product_data}>
        <div className={styles.product_title_container}>
          <p className={styles.product_title}>{product.title}</p>
          <button onClick={onDelete} className={styles.delete_button}>
            <CloseIcon className={styles.icon} />
          </button>
        </div>
        <div className={styles.product_price_container}>
          <QuantityCounterComponent
            quantity={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
          <div className={styles.prices_container}>
            {product.discont_price > 0 && (
              <p className={styles.product_price}>
                $
                {quantity > 1
                  ? (product.discont_price * quantity).toFixed(2)
                  : product.discont_price.toFixed(2)}
              </p>
            )}
            <p
              className={`${product.discont_price ? styles.product_discont_price : styles.product_price}`}
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
