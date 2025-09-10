import { describe, it, expect } from 'vitest';
import cartReducer, {
  addItem,
  incrementItem,
  decrementItem,
  removeItem,
  clearCart,
  type CartState,
} from './cartSlice';
import type { Product } from '@/types/data';

const mockProduct1: Product = {
  id: 101,
  title: 'Secateurs',
  price: 800,
  discont_price: 750,
  description:
    'This high quality everyday secateur features a fully hardened and tempered, high-carbon steel blade for lasting sharpness. ',
  image: '/images/scissors.jpg',
  createdAt: new Date().toISOString(),
  categoryId: '3',
};

const mockProduct2: Product = {
  id: 202,
  title: 'Ceramic Gold Linen Finish Plant Pot',
  price: 500,
  discont_price: 500,
  description:
    'This Gold Linen Finish Plant Pot could be the star attraction to your Christmas table decor with its textured gold finish and star bow. ',
  image: '/images/pot.jpg',
  createdAt: new Date().toISOString(),
  categoryId: '4',
};

describe('cartSlice reducers', () => {
  it('should return the initial state', () => {
    const initialState: CartState = { items: [] };
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('addItem reducer', () => {
    it('should add a new item to an empty cart', () => {
      const initialState: CartState = { items: [] };
      const action = addItem({ product: mockProduct1, quantity: 1 });
      const newState = cartReducer(initialState, action);
      expect(newState.items).toHaveLength(1);
      expect(newState.items[0]).toEqual({ ...mockProduct1, quantity: 1 });
    });

    it('should add a new, different item to a cart that already has items', () => {
      const initialState: CartState = {
        items: [{ ...mockProduct1, quantity: 1 }],
      };
      const action = addItem({ product: mockProduct2, quantity: 2 });
      const newState = cartReducer(initialState, action);
      expect(newState.items).toHaveLength(2);
      expect(newState.items[1]).toEqual({ ...mockProduct2, quantity: 2 });
    });

    it('should increase the quantity of an existing item', () => {
      const initialState: CartState = {
        items: [{ ...mockProduct1, quantity: 2 }],
      };
      const action = addItem({ product: mockProduct1, quantity: 3 });
      const newState = cartReducer(initialState, action);
      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].quantity).toBe(5);
    });
  });

  describe('incrementItem reducer', () => {
    it('should increment the quantity of a specific item', () => {
      const initialState: CartState = {
        items: [{ ...mockProduct1, quantity: 1 }],
      };
      const action = incrementItem(mockProduct1.id);
      const newState = cartReducer(initialState, action);
      expect(newState.items[0].quantity).toBe(2);
    });

    it('should not change state if item to increment is not found', () => {
      const initialState: CartState = {
        items: [{ ...mockProduct1, quantity: 1 }],
      };
      const action = incrementItem(999);
      const newState = cartReducer(initialState, action);
      expect(newState).toEqual(initialState);
    });
  });

  describe('decrementItem reducer', () => {
    it('should decrement the quantity of a specific item if quantity > 1', () => {
      const initialState: CartState = {
        items: [{ ...mockProduct1, quantity: 5 }],
      };
      const action = decrementItem(mockProduct1.id);
      const newState = cartReducer(initialState, action);

      expect(newState.items[0].quantity).toBe(4);
    });

    it('should not decrement the quantity if it is 1', () => {
      const initialState: CartState = {
        items: [{ ...mockProduct1, quantity: 1 }],
      };
      const action = decrementItem(mockProduct1.id);
      const newState = cartReducer(initialState, action);
      expect(newState.items[0].quantity).toBe(1);
    });
  });

  describe('removeItem reducer', () => {
    it('should remove an item from the cart', () => {
      const initialState: CartState = {
        items: [
          { ...mockProduct1, quantity: 1 },
          { ...mockProduct2, quantity: 3 },
        ],
      };
      const action = removeItem(mockProduct1.id);
      const newState = cartReducer(initialState, action);
      expect(newState.items).toHaveLength(1);
      expect(newState.items[0].id).toBe(mockProduct2.id);
    });
  });

  describe('clearCart reducer', () => {
    it('should remove all items from the cart', () => {
      const initialState: CartState = {
        items: [
          { ...mockProduct1, quantity: 1 },
          { ...mockProduct2, quantity: 3 },
        ],
      };
      const action = clearCart();
      const newState = cartReducer(initialState, action);
      expect(newState.items).toHaveLength(0);
    });
  });
});
