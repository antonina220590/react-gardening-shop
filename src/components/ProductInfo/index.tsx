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

  if (isProductLoading) {
    return <SpinnerComponent />;
  }

  if (isProductError || !product) {
    return <ErrorLoadComponent />;
  }

  const imageUrl = product?.image;

  let discount_percent = 0;
  if (product.discont_price) {
    discount_percent = Math.round(
      ((product.price - product.discont_price) / product.price) * 100
    );
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
    <section className={styles.single_product}>
      <div className="container">
        <div className={styles.product_wrapper}>
          <div className={styles.image_container}>
            <img
              src={imageUrl}
              alt={product.title}
              className={styles.product_image}
            ></img>
          </div>
          <div className={styles.info_container}>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.price_container}>
              {product.discont_price && (
                <p className={styles.product_price}>${product.discont_price}</p>
              )}
              <div className={styles.discont_container}>
                <p
                  className={`${product.discont_price ? styles.product_discounted_price : styles.product_price}`}
                >
                  ${product.price}
                </p>
                <div className={styles.badge_container}>
                  {discount_percent > 0 && (
                    <div className={styles.discount_badge}>
                      -{discount_percent}%
                    </div>
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
              <AddToCartButton product={product} quantity={quantity} />
            </div>
            <div className={styles.description_container}>
              <h2 className={styles.description_title}>Description</h2>
              <p className={styles.description_text}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
