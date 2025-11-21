import { useEffect, useState } from 'react';
import ProductCard from 'components/ProductCard';
import { errorToast } from 'utils/toast';
import ErrorMessage from 'components/ErrorMessage';
import LoadingMessage from 'components/LoadingMessage';

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
        if (!response.ok) {
          throw new Error(`Error status: ${response.status}`);
        }
        const json = await response.json();
        setProducts(json.data);
      } catch (error) {
        setIsError(true);
        errorToast('Error loading products');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, []);

  if (isLoading) return <LoadingMessage />;

  if (isError) return <ErrorMessage />;

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
