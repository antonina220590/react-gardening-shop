import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addItem } from '../../../store/cart/cartSlice';
import { type Product } from '@/types/data';
import Button from '../Button';

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

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isAdded}
      variant={isAdded ? 'secondary' : 'primary'}
    >
      {isAdded ? 'Added' : 'Add to cart'}
    </Button>
  );
}
