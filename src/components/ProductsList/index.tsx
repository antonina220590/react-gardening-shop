import { useParams, useLocation } from 'react-router-dom';
import {
  useGetAllProductsQuery,
  useGetProductsByCategoryIdQuery,
} from '../../store/api/apiSlice';
import { categoriesMap } from '../../data/categories';
import type { Product } from '@/types/data';
import ProductCard from '../ProductCard';
import ErrorLoadComponent from '../ui/ErrorMessage';
import styles from './ProductsList.module.css';
import FilterPanelComponent from '../FilterPanel';
import { useState } from 'react';
import SpinnerComponent from '../ui/Spinner';

export default function ProductList() {
  const [priceRange, setPriceRange] = useState({ from: '', to: '' });
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');

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

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountOnly(e.target.checked);
  };
  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

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

  const filteredAndSortedProducts = productsToRender
    ?.filter((product) => {
      const productPrice = product.discont_price ?? product.price;
      const from = parseFloat(priceRange.from);
      const to = parseFloat(priceRange.to);
      if (discountOnly && product.discont_price === null) return false;
      if (!isNaN(from) && productPrice < from) return false;
      if (!isNaN(to) && productPrice > to) return false;
      return true;
    })
    .sort((a, b) => {
      const priceA = a.discont_price ?? a.price;
      const priceB = b.discont_price ?? b.price;
      switch (sortOrder) {
        case 'price_asc':
          return priceA - priceB;
        case 'price_desc':
          return priceB - priceA;
        case 'newest':
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

  const isLoading = isCategoryLoading || areAllProductsLoading;
  const isError = isCategoryError || areAllProductsError;

  if (isLoading) return <SpinnerComponent />;
  if (isError) return <ErrorLoadComponent />;

  return (
    <section>
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

        <div className={styles.products_container}>
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
