import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ShoppingCartProduct from '../ShoppingCartProduct';
import {
  decrementItem,
  incrementItem,
  removeItem,
} from '@/store/cart/cartSlice';

export default function ShoppingCartComponent() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  return (
    <div className="container">
      {cartItems.map((item) => (
        <ShoppingCartProduct
          key={item.id}
          product={item}
          quantity={item.quantity}
          onIncrement={() => dispatch(incrementItem(item.id))}
          onDecrement={() => dispatch(decrementItem(item.id))}
          onDelete={() => dispatch(removeItem(item.id))}
        />
      ))}
    </div>
  );
}
