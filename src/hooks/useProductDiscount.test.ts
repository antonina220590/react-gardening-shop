import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useProductDiscount } from './useProductDiscount';

describe('useProductDiscount', () => {
  it('should calculate the correct discount percentage', () => {
    const { result } = renderHook(() => useProductDiscount(100, 80));
    expect(result.current).toBe(20);
  });

  it('should round the discount percentage correctly', () => {
    const { result } = renderHook(() => useProductDiscount(99.99, 66.66));
    expect(result.current).toBe(33);
  });

  it('should return 0 when price and discount price are the same', () => {
    const { result } = renderHook(() => useProductDiscount(150, 150));
    expect(result.current).toBe(0);
  });

  it('should return 0 when discont_price is null', () => {
    const { result } = renderHook(() => useProductDiscount(100, null));

    expect(result.current).toBe(0);
  });

  it('should return 0 when discont_price is undefined', () => {
    const { result } = renderHook(() => useProductDiscount(100, undefined));
    expect(result.current).toBe(0);
  });

  it('should return 0 when the original price is 0 to avoid division by zero', () => {
    const { result } = renderHook(() => useProductDiscount(0, 0));
    expect(result.current).toBe(0);
  });
});
