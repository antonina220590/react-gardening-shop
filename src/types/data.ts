export interface Product {
  id: string;
  title: string;
  price: number;
  discont_price?: number;
  description: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
  categoryId: string;
}

export interface Category {
  id: string;
  title: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductsByCategoryResponse {
  category: Category;
  data: Product[];
}
