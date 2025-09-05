import styles from './ProductInfo.module.css';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../store/api/apiSlice';
import QuantityCounterComponent from '../ui/ProductQuantity';
import ErrorLoadComponent from '../ui/ErrorMessage';
import SpinnerComponent from '../ui/Spinner';
import AddToCartButton from '../ui/AddToCartButton';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { decrementItem, incrementItem } from '@/store/cart/cartSlice';
import { useEffect, useState } from 'react';
import { useProductDiscount } from '../../hooks/useProductDiscount';

export default function ProductInfo() {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductByIdQuery(productId!);

  const product = productData?.[0];
  const cartItem = useAppSelector((state) =>
    state.cart.items.find((item) => item.id === product?.id)
  );

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
  const imageUrl = product ? `${baseUrl}${product.image}` : '';
  const discount_percent = useProductDiscount(
    product?.price ?? 0,
    product?.discont_price
  );

  if (isProductLoading) {
    return <SpinnerComponent />;
  }

  if (isProductError || !product) {
    return <ErrorLoadComponent />;
  }

  const handleIncrement = () => {
    if (cartItem) {
      dispatch(incrementItem(product.id));
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      dispatch(decrementItem(product.id));
    } else {
      setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <div className={styles.product}>
          <div className={styles.imageWrapper}>
            <img
              src={imageUrl}
              alt={product.title}
              className={styles.image}
            ></img>
          </div>
          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.priceWrapper}>
              {product.discont_price && (
                <p className={styles.productPrice}>${product.discont_price}</p>
              )}
              <div className={styles.discontWrapper}>
                <p
                  className={`${product.discont_price ? styles.discountedPrice : styles.productPrice}`}
                >
                  ${product.price}
                </p>
                <div className={styles.badgeWrapper}>
                  {discount_percent > 0 && (
                    <div className={styles.badge}>-{discount_percent}%</div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <QuantityCounterComponent
                quantity={quantity}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
              />
              <div className={styles.btnWrapper}>
                <AddToCartButton product={product} quantity={quantity} />
              </div>
            </div>
            <div className={styles.description}>
              <h2 className={styles.descriptionTitle}>Description</h2>
              <p className={styles.descriptionText}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
