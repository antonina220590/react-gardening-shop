import type { Product } from '@/types/data';
import QuantityCounterComponent from '../CounterComponent';
import styles from './ShoppingCartProduct.module.css';
import CloseIcon from '../ui/CloseIcon';

type ShoppingCartComponentProps = {
  product: Product;
  onIncrement: () => void;
  onDecrement: () => void;
  onDelete: () => void;
  quantity: number;
};

export default function ShoppingCartComponent({
  product,
  onDecrement,
  onIncrement,
  onDelete,
  quantity,
}: ShoppingCartComponentProps) {
  const baseUrl = 'http://localhost:3333';
  const imageUrl = `${baseUrl}${product.image}`;

  return (
    <div className={styles.product_container}>
      <div className={styles.product_img_container}>
        <img src={imageUrl} className={styles.product_img}></img>
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
              // <p className={styles.product_discont_price}>
              //   ${quantity > 1 ? product.price * quantity : product.price}
              // </p>
              <p className={styles.product_price}>
                $
                {quantity > 1
                  ? product.discont_price * quantity
                  : product.discont_price}
              </p>
            )}
            <p
              className={`${product.discont_price ? styles.product_discont_price : styles.product_price}`}
            >
              ${quantity > 1 ? product.price * quantity : product.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
