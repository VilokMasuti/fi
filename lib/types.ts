// src/lib/types.ts

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface FilterState {
  category: string;
  priceRange: string;
  page: number;
  search: string;
  sort: 'asc' | 'desc' | '';
}
