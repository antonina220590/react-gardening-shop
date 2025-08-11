import styles from './QuantityCounterComponent.module.css';
import MinusIcon from '../ui/MinusIcon';
import PlusIcon from '../ui/PlusIcon';

type QuantityComponentProps = {
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
};

export default function QuantityCounterComponent({
  quantity,
  onDecrement,
  onIncrement,
}: QuantityComponentProps) {
  return (
    <div className={styles.quantity_selector}>
      <button className={styles.quantity_btn} onClick={onDecrement}>
        <MinusIcon className={styles.icon} />
      </button>
      <span className={styles.quantity}>{quantity}</span>
      <button className={styles.quantity_btn} onClick={onIncrement}>
        <PlusIcon className={styles.icon} />
      </button>
    </div>
  );
}
