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
    <div>
      <img src={imageUrl}></img>
      <div>
        <p>{product.title}</p>
        <button onClick={onDelete}>
          <CloseIcon className={styles.icon} />
        </button>
      </div>
      <p>{product.price}</p>
      {product.discont_price > 0 && <p>${product.discont_price}</p>}
      <QuantityCounterComponent
        quantity={quantity}
        onIncrement={onIncrement}
        onDecrement={onDecrement}
      />
    </div>
  );
}
