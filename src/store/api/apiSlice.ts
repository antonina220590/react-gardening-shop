import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Product,
  Category,
  ProductsByCategoryResponse,
} from '@/types/data';
import type { CartItem } from '../cart/cartSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3333' }),
  endpoints: (builder) => ({
    getAllCategories: builder.query<Category[], void>({
      query: () => '/categories/all',
    }),
    getProductsByCategoryId: builder.query<ProductsByCategoryResponse, string>({
      query: (id) => `/categories/${id}`,
    }),
    getAllProducts: builder.query<Product[], void>({
      query: () => '/products/all',
    }),
    getProductById: builder.query<Product[], string>({
      query: (id) => `/products/${id}`,
    }),
    sendSaleRequest: builder.mutation<
      void,
      { name: string; phone: string; email: string }
    >({
      query: (body) => ({
        url: '/sale/send',
        method: 'POST',
        body,
      }),
    }),
    sendOrderRequest: builder.mutation<
      void,
      { user: { name: string; phone: string; email: string }; cart: CartItem[] }
    >({
      query: (body) => ({
        url: '/order/send',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetProductsByCategoryIdQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useSendSaleRequestMutation,
  useSendOrderRequestMutation,
} = apiSlice;
