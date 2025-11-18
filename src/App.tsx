import { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from 'components/Navbar';
import SlideOver from 'components/SlideOver';
import CartPanel from 'components/CartPanel';
import FavoritesPanel from 'components/FavoritesPanel';
import Products from 'services/api';
import {
  addToCart,
  CartItem,
  getCart,
  updateCartQuantity,
} from 'services/storage';
import { successToast } from 'utils/toast';
import HeroSection from 'components/HeroSection';

type Panel = 'cart' | 'favorite' | null;

function App() {
  const [openPanel, setOpenPanel] = useState<Panel>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(getCart());
  }, []);

  function handleAddToCart(item: Omit<CartItem, 'qty'>) {
    const updated = addToCart(item);
    setCartItems(updated);
  }

  function handleChangeCartQty(id: string, delta: number) {
    const updated = updateCartQuantity(id, delta);
    setCartItems(updated);

    const item = updated.find((i) => i.id === id);

    if (!item) {
      successToast('Removed from cart');
    } else if (delta > 0) {
      successToast(`Added 1 more ${item.title}`);
    } else {
      successToast(`Removed 1 ${item.title}`);
    }
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Toaster position="bottom-right" />
      <Navbar
        onOpenCart={() => setOpenPanel('cart')}
        onOpenFavorite={() => setOpenPanel('favorite')}
        cartCount={cartCount}
      />

      <HeroSection />

      <h1 id="products" className="text-4xl my-8 max-w-6xl mx-auto">
        Our Products
      </h1>
      <Products onAddToCart={handleAddToCart} />

      <SlideOver
        open={openPanel !== null}
        title={openPanel === 'cart' ? 'Your cart' : 'Your favorites'}
        onClose={() => setOpenPanel(null)}
      >
        {openPanel === 'cart' && (
          <CartPanel items={cartItems} onChangeQty={handleChangeCartQty} />
        )}
        {openPanel === 'favorite' && <FavoritesPanel />}
      </SlideOver>
    </>
  );
}

export default App;
