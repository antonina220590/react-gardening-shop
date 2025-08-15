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
    addItem: (state, action: PayloadAction<Product>) => {
      const productToAdd = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === productToAdd.id
      );
      if (!existingItem) {
        state.items.push({ ...productToAdd, quantity: 1 });
      }
    },

    incrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },

    decrementItem: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.items = state.items.filter((i) => i.id !== action.payload);
        }
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.items = state.items.filter((item) => item.id !== idToRemove);
    },
  },
});

export const { addItem, incrementItem, decrementItem, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
