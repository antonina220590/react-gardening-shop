import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addItem } from '../../../store/cart/cartSlice';
import { type Product } from '@/types/data';
import styles from './AddToCartButton.module.css';

type AddToCartButtonProps = {
  product: Product;
  quantity: number;
};

export default function AddToCartButton({
  product,
  quantity,
}: AddToCartButtonProps) {
  const dispatch = useAppDispatch();

  const itemInCart = useAppSelector((state) =>
    state.cart.items.find((item) => Number(item.id) === Number(product.id))
  );

  const handleAddToCart = () => {
    if (!itemInCart) {
      dispatch(addItem({ product, quantity }));
    }
  };

  const isAdded = !!itemInCart;
  const buttonClasses = `${styles.button_card} ${isAdded ? styles.button_cardAdded : ''}`;
  const buttonText = isAdded ? 'Added' : 'Add to cart';

  return (
    <button
      onClick={handleAddToCart}
      className={buttonClasses}
      disabled={isAdded}
    >
      {buttonText}
    </button>
  );
}
