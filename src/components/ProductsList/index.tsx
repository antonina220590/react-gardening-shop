import { useParams, useLocation } from 'react-router-dom';
import {
  useGetAllProductsQuery,
  useGetProductsByCategoryIdQuery,
} from '../../store/api/apiSlice';
import { useProductFilters } from '../../hooks/useProductFilters';
import { categoriesMap } from '../../data/categories';
import type { Product } from '@/types/data';
import ProductCard from '../ProductCard';
import ErrorMessage from '../ui/ErrorMessage';
import styles from './ProductsList.module.css';
import FilterPanelComponent from '../FilterPanel';
import Spinner from '../ui/Spinner';

export default function ProductList() {
  const { categoryId } = useParams();
  const location = useLocation();

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useGetProductsByCategoryIdQuery(categoryId!, { skip: !categoryId });

  const {
    data: allProducts,
    isLoading: areAllProductsLoading,
    isError: areAllProductsError,
  } = useGetAllProductsQuery(undefined, { skip: !!categoryId });

  let title: string = 'Products';
  let productsToRender: Product[] | undefined = [];

  if (categoryId) {
    const currentCategory = categoriesMap.find(
      (cat) => cat.id === Number(categoryId)
    );
    title = currentCategory?.title || 'Category';
    productsToRender = categoryData?.data;
  } else if (location.pathname === '/sales') {
    title = 'Discounted items';
    productsToRender = allProducts?.filter(
      (product) => product.discont_price !== null
    );
  } else {
    title = 'All products';
    productsToRender = allProducts;
  }

  const {
    priceRange,
    discountOnly,
    sortOrder,
    handlePriceChange,
    handleDiscountChange,
    handleSortChange,
    filteredAndSortedProducts,
  } = useProductFilters(productsToRender);

  const isLoading = isCategoryLoading || areAllProductsLoading;
  const isError = isCategoryError || areAllProductsError;

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage />;

  return (
    <section className={styles.wrapper}>
      <div className="container">
        <h1 className={styles.title}>{title}</h1>
        <FilterPanelComponent
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          discountOnly={discountOnly}
          onDiscountChange={handleDiscountChange}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          pathname={location.pathname}
        />

        <div className={styles.products}>
          {filteredAndSortedProducts?.map((product) => (
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
      </div>
    </section>
  );
}
