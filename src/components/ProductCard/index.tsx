import ButtonCard from '../ui/ButtonCard';
import styles from './ProductCard.module.css';
type ProductCardProps = {
  id: number;
  image: string;
  title: string;
  price: number;
  discount_price?: number | null;
  variant?: 'default' | 'compact';
};

export default function ProductCard({
  id,
  image,
  title,
  price,
  discount_price,
  variant = 'default',
}: ProductCardProps) {
  const baseUrl = 'http://localhost:3333';
  const imageUrl = `${baseUrl}${image}`;
  let discount_percent = 0;
  if (discount_price) {
    discount_percent = Math.round(((price - discount_price) / price) * 100);
  }

  return (
    <div key={id} className={styles.product_card}>
      <div className={styles.product_img}>
        {discount_percent > 0 && (
          <div className={styles.discount_badge}>-{discount_percent}%</div>
        )}

        {variant === 'default' && (
          <div className={styles.product_btn}>
            <ButtonCard text={'Add to card'} />
          </div>
        )}
        <img src={imageUrl} alt={title}></img>
      </div>
      <div className={styles.product_info}>
        <p className={styles.product_title}>{title}</p>
        <div className={styles.price_container}>
          <p className={styles.product_price}>${price}</p>
          {discount_price && (
            <p className={styles.product_discounted_price}>${discount_price}</p>
          )}
        </div>
      </div>
    </div>
  );
}
