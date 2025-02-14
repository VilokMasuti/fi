import { fetchProductById } from '@/app/actions/productActions';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  // Fetch the product by its ID
  const product = await fetchProductById(params.id);

  // Check if the product exists
  if (!product) {
    return <div>Product not found</div>;
  }

  // Render the product details directly
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <Image
            src={product.image || '/placeholder.svg'}
            alt={product.title}
            width={200}
            height={200}
            className="w-full h-48 object-contain mb-4"
          />
          <h2 className="text-lg font-semibold line-clamp-1">
            {product.title}
          </h2>
          <p className="text-sm text-gray-500">{product.category}</p>
        </CardContent>
        <CardFooter className="bg-gray-50 px-4 py-2">
          <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
