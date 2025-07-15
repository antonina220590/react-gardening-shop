import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import RootLayout from './routes/RootLayout';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import SingleProductPage from './pages/SingleProductPage/SingleProductPage';
import HomePage from './pages/HomePage/HomePage';

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
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
