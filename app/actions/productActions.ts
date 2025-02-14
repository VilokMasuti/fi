'use server';
import { FilterState, Product } from '@/lib/types';
import { filterProducts, paginateProducts, sortProducts } from '@/lib/utils';
import axios from 'axios';

export async function fetchProducts(
  filters: FilterState
): Promise<{ products: Product[]; totalPages: number }> {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    let products: Product[] = response.data;
    products = filterProducts(products, filters);
    products = sortProducts(products, filters.sort);
    const totalPages = Math.ceil(products.length / 10);
    products = paginateProducts(products, filters.page, 6);
    return { products, totalPages };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { products: [], totalPages: 0 };
  }
}

export async function fetchProductById(id: string): Promise<Product | null> {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}
