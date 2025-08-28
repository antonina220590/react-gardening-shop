import styles from './ProductQuantity.module.css';
import MinusIcon from '../icons/MinusIcon';
import PlusIcon from '../icons/PlusIcon';

type ProductQuantityProps = {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

export default function ProductQuantity({
  quantity,
  onDecrement,
  onIncrement,
}: ProductQuantityProps) {
  return (
    <div className={styles.selector}>
      <button
        className={styles.btn}
        onClick={onDecrement}
        disabled={quantity <= 1}
      >
        <MinusIcon className={styles.icon} />
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button className={styles.btn} onClick={onIncrement}>
        <PlusIcon className={styles.icon} />
      </button>
    </div>
  );
}
