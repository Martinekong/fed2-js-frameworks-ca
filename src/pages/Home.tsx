import { useState } from 'react';
import HeroSection from 'components/HeroSection';
import Products from 'services/allProducts';
import { CartItem, addToCart } from 'services/storage';

export default function HomePage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function handleAddToCart(item: Omit<CartItem, 'qty'>) {
    const updated = addToCart(item);
    setCartItems(updated);
  }

  return (
    <>
      <HeroSection />

      <section>
        <h1 id="products" className="text-4xl my-8 max-w-6xl mx-auto">
          Our Products
        </h1>

        <Products onAddToCart={handleAddToCart} />
      </section>
    </>
  );
}
