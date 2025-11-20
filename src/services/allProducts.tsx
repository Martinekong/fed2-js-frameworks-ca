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
    alt: string;
  };
};

type ProductsProps = {
  onAddToCart: (item: {
    id: string;
    title: string;
    price: number;
    image: {
      url: string;
      alt: string;
    };
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
    <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          image={product.image}
          price={product.price}
          discountedPrice={product.discountedPrice}
          rating={product.rating}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
