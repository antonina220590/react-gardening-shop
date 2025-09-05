import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useProductFilters } from './useProductFilters';
import type { Product } from '@/types/data';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Old cheap product',
    price: 10,
    discont_price: 0,
    createdAt: '2023-01-01T00:00:00.000Z',
    description: '',
    image: '',
    categoryId: '1',
  },
  {
    id: 2,
    title: 'Medium product with discount',
    price: 50,
    discont_price: 40,
    createdAt: '2023-05-01T00:00:00.000Z',
    description: '',
    image: '',
    categoryId: '1',
  },
  {
    id: 3,
    title: 'New expensive product',
    price: 100,
    discont_price: 0,
    createdAt: '2023-08-01T00:00:00.000Z',
    description: '',
    image: '',
    categoryId: '1',
  },
  {
    id: 4,
    title: 'New product with discount',
    price: 120,
    discont_price: 90,
    createdAt: '2023-09-01T00:00:00.000Z',
    description: '',
    image: '',
    categoryId: '1',
  },
];

describe('useProductFilters', () => {
  it('should return initial products without filtering or sorting', () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));
    expect(result.current.filteredAndSortedProducts).toEqual(mockProducts);
  });

  it('should filter by price "from"', () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => {
      result.current.handlePriceChange({
        target: { name: 'from', value: '50' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const productTitles = result.current.filteredAndSortedProducts?.map(
      (p) => p.title
    );
    expect(productTitles).toEqual([
      'New expensive product',
      'New product with discount',
    ]);
  });

  it('should filter by price "to"', () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => {
      result.current.handlePriceChange({
        target: { name: 'to', value: '50' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const productTitles = result.current.filteredAndSortedProducts?.map(
      (p) => p.title
    );
    expect(productTitles).toEqual([
      'Old cheap product',
      'Medium product with discount',
    ]);
  });

  it('should filter by discount only', () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => {
      result.current.handleDiscountChange({
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    const productTitles = result.current.filteredAndSortedProducts?.map(
      (p) => p.title
    );
    expect(productTitles).toEqual([
      'Medium product with discount',
      'New product with discount',
    ]);
  });

  it('should sort by price ascending', () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => {
      result.current.handleSortChange('price_asc');
    });
    const prices = result.current.filteredAndSortedProducts?.map((p) =>
      p.discont_price && p.discont_price > 0 ? p.discont_price : p.price
    );
    expect(prices).toEqual([10, 40, 90, 100]);
  });

  it('should sort by price descending', () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => {
      result.current.handleSortChange('price_desc');
    });

    const prices = result.current.filteredAndSortedProducts?.map((p) =>
      p.discont_price && p.discont_price > 0 ? p.discont_price : p.price
    );

    expect(prices).toEqual([100, 90, 40, 10]);
  });

  it('should sort by newest', () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));

    act(() => {
      result.current.handleSortChange('newest');
    });

    const ids = result.current.filteredAndSortedProducts?.map((p) => p.id);
    expect(ids).toEqual([4, 3, 2, 1]);
  });

  it('should filter by discount and then sort by price ascending', () => {
    const { result } = renderHook(() => useProductFilters(mockProducts));
    act(() => {
      result.current.handleDiscountChange({
        target: { checked: true },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSortChange('price_asc');
    });

    const products = result.current.filteredAndSortedProducts;
    expect(products?.length).toBe(2);
    expect(products?.[0].id).toBe(2);
    expect(products?.[1].id).toBe(4);
  });
});
