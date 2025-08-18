import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '@/types/data';

export interface CartItem extends Product {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },

    incrementItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.id === Number(action.payload)
      );
      if (item) {
        item.quantity++;
      }
    },

    decrementItem: (state, action: PayloadAction<number>) => {
      const item = state.items.find(
        (item) => item.id === Number(action.payload)
      );
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const idToRemove = Number(action.payload);
      state.items = state.items.filter((item) => item.id !== idToRemove);
    },
  },
});

export const { addItem, incrementItem, decrementItem, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
