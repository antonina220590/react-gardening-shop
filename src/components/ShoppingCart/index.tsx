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
        <div className={styles.wrapper}>
          <CategoryHeader
            title={'Shopping cart'}
            pathTo={'/products'}
            btnText={'Back to the store'}
          />
          {cartItems.length ? (
            <div className={styles.cart}>
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
              <div className={styles.formWrapper}>
                <h3 className={styles.orderTitle}>Order details</h3>
                <p className={styles.orderInfo}>{totalCount} items</p>
                <div className={styles.priceWrapper}>
                  <p className={styles.orderInfo}>Total: </p>
                  <span className={styles.orderPrice}>
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
            <div className={styles.emptyCart}>
              <p className={styles.emptyCartText}>
                Looks like you have no item in your basket currently.
              </p>
              <Link to="/products" className={styles.link}>
                <div className={styles.btnWrapper}>
                  <Button type="button" variant="card">
                    Continue Shopping
                  </Button>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={styles.modal}>
          <h2 className={styles.modalTitle}>Congratulations!</h2>
          <p className={styles.modalMessage}>
            Your order has been successfully placed on the website.
          </p>
          <p className={styles.modalMessage}>
            A manager will contact you shortly to confirm your order.
          </p>
        </div>
      </Modal>
    </>
  );
}
