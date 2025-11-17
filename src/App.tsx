import { useEffect, useState } from 'react';
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
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Navbar
        onOpenCart={() => setOpenPanel('cart')}
        onOpenFavorite={() => setOpenPanel('favorite')}
        cartCount={cartCount}
      />

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
