import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FilterState, Product } from './types';
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterProducts = (products: Product[], filters: FilterState) => {
  return products.filter((products) => {
    if (filters.category && products.category !== filters.category)
      return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (products.price < min || (max && products.price > max)) return false;
    }
    if (
      filters.search &&
      !products.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });
};

export const sortProducts = (
  products: Product[],
  sort: 'asc' | 'desc' | ''
): Product[] => {
  if (sort === 'asc') {
    return [...products].sort((a, b) => a.price - b.price);
  }
  if (sort === 'desc') {
    return [...products].sort((a, b) => b.price - a.price);
  }
  return products;
};

export const paginateProducts = (products: Product[], page: number, perPage: number): Product[] => {
  const start = (page- 1)* perPage
  const end = start + perPage
  return products.slice(start, end)


}
