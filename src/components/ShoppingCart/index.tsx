import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import ShoppingCartProduct from '../ShoppingCartProduct';
import styles from './ShoppingCart.module.css';
import {
  clearCart,
  decrementItem,
  incrementItem,
  removeItem,
} from '@/store/cart/cartSlice';
import FormComponent from '../ui/Form';
import ButtonCard from '../ui/ButtonCard';
import CategoryHeader from '../ui/CategoryHeader';
import { useSendOrderRequestMutation } from '@/store/api/apiSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import type { SubmitHandler } from 'react-hook-form';
import {
  schema,
  saleFormInputs,
  type SaleFormValues,
} from '../../schema/validation';

export default function ShoppingCart() {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [sendOrder, { isLoading, isSuccess }] = useSendOrderRequestMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { totalAmount, totalCount } = useMemo(() => {
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const amount = cartItems.reduce((sum, item) => {
      const price =
        item.discont_price && item.discont_price > 0
          ? item.discont_price
          : item.price;
      return sum + price * item.quantity;
    }, 0);

    return { totalCount: count, totalAmount: amount };
  }, [cartItems]);

  const handleFormSubmit: SubmitHandler<SaleFormValues> = async (
    data,
    event
  ) => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty!');
      return;
    }
    const orderData = { user: data, cart: cartItems };
    try {
      await sendOrder(orderData).unwrap();
      setIsModalOpen(true);
      event?.target.reset();
      console.log('Order submitted');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearCart());
  };

  return (
    <>
      <div className="container">
        <div className={styles.shopping_cart}>
          <CategoryHeader
            title={'Shopping cart'}
            pathTo={'/products'}
            btnText={'Back to the store'}
          />
          {cartItems.length ? (
            <div className={styles.cart_container}>
              <div>
                {cartItems.map((item) => (
                  <ShoppingCartProduct
                    key={item.id}
                    product={item}
                    quantity={item.quantity}
                    onIncrement={() => dispatch(incrementItem(item.id))}
                    onDecrement={() => dispatch(decrementItem(item.id))}
                    onDelete={() => dispatch(removeItem(item.id))}
                    id={item.id}
                  />
                ))}
              </div>
              <div className={styles.form_container}>
                <h3 className={styles.order_title}>Order details</h3>
                <p className={styles.order_info}>{totalCount} items</p>
                <div className={styles.order_price_container}>
                  <p className={styles.order_info}>Total: </p>
                  <span className={styles.order_price}>
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <FormComponent<typeof schema>
                  theme="light"
                  inputs={saleFormInputs}
                  onSubmit={handleFormSubmit}
                  validationSchema={schema}
                  renderButton={() => (
                    <Button
                      type="submit"
                      disabled={isLoading || isSuccess}
                      variant={isSuccess ? 'success' : 'primary'}
                    >
                      {isSuccess ? 'The Order is Placed' : 'Order'}
                    </Button>
                  )}
                />
              </div>
            </div>
          ) : (
            <div className={styles.empty_basket_container}>
              <p className={styles.empty_basket_text}>
                Looks like you have no item in your basket currently.
              </p>
              <Link to="/products" className={styles.link}>
                <div className={styles.btn_container}>
                  <ButtonCard text="Continue Shopping" />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={styles.modal_container}>
          <h2 className={styles.modal_title}>Congratulations!</h2>
          <p className={styles.modal_message}>
            Your order has been successfully placed on the website.
          </p>
          <p className={styles.modal_message}>
            A manager will contact you shortly to confirm your order.
          </p>
        </div>
      </Modal>
    </>
  );
}
