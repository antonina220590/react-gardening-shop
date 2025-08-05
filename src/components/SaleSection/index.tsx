import type { Product } from '@/types/data';
import { useGetAllProductsQuery } from '../../store/api/apiSlice';
import CategoryHeader from '../CategoryHeader';
import styles from './SaleSection.module.css';
import ProductCard from '../ProductCard';
import ErrorLoadComponent from '../ErrorLoadComponent';

export default function SaleSection() {
  const { data: allProducts, isLoading, isError } = useGetAllProductsQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = <ErrorLoadComponent />;
  } else if (allProducts) {
    const discountedProducts = allProducts
      ?.filter((product: Product) => product.discont_price !== null)
      .sort((a: Product, b: Product) => {
        const discountA = ((a.price - a.discont_price) / a.price) * 100;
        const discountB = ((b.price - b.discont_price) / b.price) * 100;
        return discountB - discountA;
      })
      .slice(0, 4);

    content = (
      <div className={styles.products_container}>
        {discountedProducts?.map((product) => (
          <ProductCard
            key={product.id}
            id={Number(product.id)}
            image={product.image}
            title={product.title}
            price={product.price}
            discount_price={product.discont_price}
          />
        ))}
      </div>
    );
  }

  return (
    <section className={styles.sale}>
      <div className="container">
        <CategoryHeader
          title={'Sale'}
          pathTo={'/sales'}
          btnText={'All sales'}
        />
        {content}
      </div>
    </section>
  );
}
