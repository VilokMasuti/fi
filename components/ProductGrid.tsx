// src/components/ProductGrid.tsx

import Link from 'next/link';
import { Product } from '../lib/types';
import ProductCard from './ProductCard';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link key={product.id} href={`/product/${product.id}`}>
          {' '}
          <ProductCard key={product.id} product={product} />{' '}
        </Link>
      ))}
    </div>
  );
}
