import { useState, useMemo } from 'react';
import type { Product } from '@/types/data';

export function useProductFilters(initialProducts: Product[] | undefined) {
  const [priceRange, setPriceRange] = useState({ from: '', to: '' });
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountOnly(e.target.checked);
  };

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };
  const filteredAndSortedProducts = useMemo(() => {
    // Вспомогательная функция для чистоты кода
    const getActualPrice = (product: Product) => {
      return product.discont_price && product.discont_price > 0
        ? product.discont_price
        : product.price;
    };

    return initialProducts
      ?.filter((product) => {
        const productPrice = getActualPrice(product);
        const from = parseFloat(priceRange.from);
        const to = parseFloat(priceRange.to);

        const hasDiscount = product.discont_price && product.discont_price > 0;
        if (discountOnly && !hasDiscount) return false;

        if (!isNaN(from) && productPrice < from) return false;
        if (!isNaN(to) && productPrice > to) return false;
        return true;
      })
      .sort((a, b) => {
        const priceA = getActualPrice(a);
        const priceB = getActualPrice(b);

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
  }, [initialProducts, priceRange, discountOnly, sortOrder]);

  return {
    priceRange,
    discountOnly,
    sortOrder,
    handlePriceChange,
    handleDiscountChange,
    handleSortChange,
    filteredAndSortedProducts,
  };
}
