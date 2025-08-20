import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './index.css';
import RootLayout from './routes/RootLayout';
import CategoriesPage from './pages/CategoriesPage';
import SingleProductPage from './pages/SingleProductPage';
import HomePage from './pages/HomePage';
import ProductsByCategoryPage from './pages/ProductsByCategoryPage';
import CartPage from './pages/CartPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'products/:productId',
        element: <SingleProductPage />,
      },
      {
        path: 'categories',
        element: <CategoriesPage />,
      },
      {
        path: 'sales',
        element: <ProductsByCategoryPage />,
      },
      {
        path: 'categories/:categoryId',
        element: <ProductsByCategoryPage />,
      },
      {
        path: 'products',
        element: <ProductsByCategoryPage />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
