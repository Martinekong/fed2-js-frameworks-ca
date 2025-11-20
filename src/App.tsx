import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { successToast } from 'utils/toast';

import Navbar from 'components/Navbar';
import SidePanel from 'components/SidePanel';
import CartPanel from 'components/CartPanel';
import FavoritesPanel from 'components/FavoritesPanel';
import Footer from 'components/Footer';

import {
  CartItem,
  getCart,
  updateCartQuantity,
  addToCart,
} from 'services/storage';

import HomePage from 'pages/Home';
import ProductPage from 'pages/ProductDetails';

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
    <div className="flex flex-col min-h-screen">
      <Toaster position="bottom-right" />
      <Navbar
        onOpenCart={() => setOpenPanel('cart')}
        onOpenFavorite={() => setOpenPanel('favorite')}
        cartCount={cartCount}
      />

      <SidePanel
        open={openPanel !== null}
        title={openPanel === 'cart' ? 'Your cart' : 'Your favorites'}
        onClose={() => setOpenPanel(null)}
      >
        {openPanel === 'cart' && (
          <CartPanel
            items={cartItems}
            onChangeQty={handleChangeCartQty}
            onClose={() => setOpenPanel(null)}
          />
        )}

        {openPanel === 'favorite' && (
          <FavoritesPanel onClose={() => setOpenPanel(null)} />
        )}
      </SidePanel>

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<HomePage onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/product/:id"
            element={<ProductPage onAddToCart={handleAddToCart} />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
