import { fetchProductById } from '@/app/actions/productActions';
import ProductCard from '@/components/ProductCard';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductById(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <ProductCard product={product} />
    </div>
  );
}
