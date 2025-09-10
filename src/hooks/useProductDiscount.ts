import { useMemo } from 'react';

export function useProductDiscount(
  price: number,
  discont_price: number | null | undefined
) {
  const discountPercent = useMemo(() => {
    if (!discont_price) {
      return 0;
    }
    return Math.round(((price - discont_price) / price) * 100);
  }, [price, discont_price]);

  return discountPercent;
}
