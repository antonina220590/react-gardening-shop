import styles from './ProductInfoComponent.module.css';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../store/api/apiSlice';
import QuantityCounterComponent from '../CounterComponent';
import { useState } from 'react';
import ButtonCard from '../ui/ButtonCard';
export default function ProductInfoComponent() {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);

  const {
    data: productData,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useGetProductByIdQuery(productId!);

  if (isProductLoading) {
    return <p>Loading product...</p>;
  }

  const product = productData?.[0];

  if (isProductError || !product) {
    return <p>Error: Could not load product.</p>;
  }

  const baseUrl = 'http://localhost:3333';
  const imageUrl = `${baseUrl}${product?.image}`;

  let discount_percent = 0;
  if (product.discont_price) {
    discount_percent = Math.round(
      ((product.price - product.discont_price) / product.price) * 100
    );
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
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
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
              />
              <ButtonCard text={'Add to card'} onClick={handleAddToCart} />
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
