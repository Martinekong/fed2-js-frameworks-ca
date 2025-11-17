import { useEffect, useState } from 'react';
import ProductCard from 'components/ProductCard';

const url = 'https://v2.api.noroff.dev/online-shop';

type Product = {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  rating: number;
  image: {
    url: string;
  };
};

type ProductsProps = {
  onAddToCart: (item: {
    id: string;
    title: string;
    price: number;
    image: string;
  }) => void;
};

export default function Products({ onAddToCart }: ProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setProducts(json.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    }

    getData();
  }, []);

  if (isLoading) return <div>Loading products...</div>;

  if (isError) return <div>Error loading products</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={
            product.price > product.discountedPrice
              ? product.discountedPrice
              : product.price
          }
          image={product.image.url}
          discountedPrice={
            product.discountedPrice === product.price ? null : product.price
          }
          rating={product.rating}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
