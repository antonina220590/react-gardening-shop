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
    return initialProducts
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
