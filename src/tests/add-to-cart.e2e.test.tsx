import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { apiSlice } from '../store/api/apiSlice';
import cartReducer from '../store/cart/cartSlice';
import { server } from './mocks/server';

import RootLayout from '../routes/RootLayout';
import ProductsByCategoryPage from '../pages/ProductsByCategoryPage';
import CartPage from '../pages/CartPage';

const testRoutes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'products',
        element: <ProductsByCategoryPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
    ],
  },
];

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderTestApp = (route: string) => {
  const store = configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });

  const router = createMemoryRouter(testRoutes, {
    initialEntries: [route],
  });

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

describe('E2E - Add to Cart Flow', () => {
  it('should add a product to cart and update header counter', async () => {
    const user = userEvent.setup();
    renderTestApp('/products');
    const product1 = await screen.findByText('Magic Watering Can');
    expect(product1).toBeInTheDocument();
    expect(await screen.findByText('Golden Shovel')).toBeInTheDocument();
    const product1Card = product1.closest('div[class*="card"]') as HTMLElement;
    const addToCartButton = within(product1Card!).getByRole('button', {
      name: /add to cart/i,
    });
    await user.click(addToCartButton);
    const header = screen.getByRole('banner');
    const cartCounter = await within(header).findByText('1');
    expect(cartCounter).toBeInTheDocument();
    expect(cartCounter).toHaveClass(/productCount/);
  });
});
