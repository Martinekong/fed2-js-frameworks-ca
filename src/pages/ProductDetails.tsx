import Product from 'services/singleProduct';

type ProductPageProps = {
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

export default function ProductPage({ onAddToCart }: ProductPageProps) {
  return (
    <>
      <Product onAddToCart={onAddToCart} />
    </>
  );
}
