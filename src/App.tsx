import { useState } from 'react';
import Navbar from 'components/Navbar';
import SlideOver from 'components/SlideOver';
import CartPanel from 'components/CartPanel';
import FavoritesPanel from 'components/FavoritesPanel';
import Products from 'services/api';

type Panel = 'cart' | 'favorite' | null;

function App() {
  const [openPanel, setOpenPanel] = useState<Panel>(null);

  return (
    <>
      <Navbar
        onOpenCart={() => setOpenPanel('cart')}
        onOpenFavorite={() => setOpenPanel('favorite')}
      />

      <Products />

      <SlideOver
        open={openPanel !== null}
        title={openPanel === 'cart' ? 'Your cart' : 'Favorites'}
        onClose={() => setOpenPanel(null)}
      >
        {openPanel === 'cart' && <CartPanel />}
        {openPanel === 'favorite' && <FavoritesPanel />}
      </SlideOver>
    </>
  );
}

export default App;
