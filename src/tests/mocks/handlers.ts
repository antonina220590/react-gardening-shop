import { http, HttpResponse } from 'msw';
import type { Product } from '@/types/data';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Magic Watering Can',
    price: 150,
    discont_price: 120,
    image: '/images/magic_can.png',
    createdAt: '2023-09-01T00:00:00.000Z',
    description: 'A can that waters plants magically and sings a song.',
    categoryId: '1',
  },
  {
    id: 2,
    title: 'Golden Shovel',
    price: 300,
    discont_price: 0,
    image: '/images/golden_shovel.png',
    createdAt: '2023-08-01T00:00:00.000Z',
    description: 'A shovel made of pure gold. It does not help with digging.',
    categoryId: '1',
  },
];

const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

export const handlers = [
  http.get(`${baseUrl}/products/all`, () => {
    return HttpResponse.json(mockProducts);
  }),
];
