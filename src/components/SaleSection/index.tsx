import type { Product } from '@/types/data';
import { useGetAllProductsQuery } from '../../store/api/apiSlice';
import CategoryHeader from '../CategoryHeader';
import styles from './SaleSection.module.css';
import ProductCard from '../ProductCard';

export default function SaleSection() {
  const { data: allProducts } = useGetAllProductsQuery();

  const discountedProducts = allProducts
    ?.filter((product: Product) => product.discont_price !== null)
    .sort((a: Product, b: Product) => {
      const discountA = ((a.price - a.discont_price) / a.price) * 100;
      const discountB = ((b.price - b.discont_price) / b.price) * 100;
      return discountB - discountA;
    })
    .slice(0, 4);

  console.log(discountedProducts);

  return (
    <section className={styles.sale}>
      <div className="container">
        <CategoryHeader
          title={'Sale'}
          pathTo={'/sales'}
          btnText={'All sales'}
        />
        <div className={styles.products_container}>
          {discountedProducts?.map((product) => {
            return (
              <ProductCard
                key={product.id}
                id={Number(product.id)}
                image={product.image}
                title={product.title}
                price={product.price}
                discount_price={product.discont_price}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
