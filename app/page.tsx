'use client';
import Filters from '@/components/Filters';
import { Pagination } from '@/components/Pagination';
import ProductGrid from '@/components/ProductGrid';
import { FilterState, Product } from '@/lib/types'; // Import the Product type
import { useEffect, useState } from 'react';
import { fetchProducts } from './actions/productActions';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    priceRange: '',
    page: 1,
    search: '',
    sort: '',
  });
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const getProducts = async () => {
    setLoading(true);
    try {
      const { products: fetchedProducts, totalPages: pages } =
        await fetchProducts(filters);
      setProducts(fetchedProducts);
      setTotalPages(pages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [filters]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters, page: 1 }));
  };

  const handleChange = (page: number) => {
    setFilters((prevFilters) => ({ ...prevFilters, page }));
  };

  return (
    <main className="flex flex-col gap-6 items-center sm:items-start p-4 w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
        Product Listing
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full">
          <div className="w-full mb-6">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
          </div>
          <div className="w-full">
            <ProductGrid products={products} />
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              onPageChange={handleChange}
            />
          </div>
        </div>
      )}
    </main>
  );
}
