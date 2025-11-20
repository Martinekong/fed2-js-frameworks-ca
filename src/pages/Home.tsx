import HeroSection from 'components/HeroSection';
import Products from 'services/allProducts';

type HomePageProps = {
  onAddToCart: (item: {
    id: string;
    title: string;
    price: number;
    image: string;
  }) => void;
};

export default function HomePage({ onAddToCart }: HomePageProps) {
  return (
    <>
      <HeroSection />

      <section>
        <h1 id="products" className="max-w-6xl mx-auto my-8 text-4xl">
          Our Products
        </h1>

        <Products onAddToCart={onAddToCart} />
      </section>
    </>
  );
}
