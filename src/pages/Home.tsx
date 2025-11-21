import { useState } from 'react';
import HeroSection from 'components/HeroSection';
import Products from 'services/allProducts';

type HomePageProps = {
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

export default function HomePage({ onAddToCart }: HomePageProps) {
  const [sortOption, setSortOption] = useState('name-asc');

  return (
    <>
      <HeroSection />

      <section className="max-w-6xl mx-auto my-8">
        <div className="flex items-center justify-between py-8">
          <h1 id="products" className="text-4xl">
            Our Products
          </h1>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="none">Sort products</option>
            <option value="name-asc">Name (A → Z)</option>
            <option value="name-desc">Name (Z → A)</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
          </select>
        </div>

        <Products onAddToCart={onAddToCart} sortOption={sortOption} />
      </section>
    </>
  );
}
