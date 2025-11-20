export type FavoriteItem = {
  id: string;
  title: string;
  price: number;
  image: {
    url: string;
    alt: string;
  };
  rating?: number;
};

const FAV_KEY = 'favorites';

export function getFavorites(): FavoriteItem[] {
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]');
  } catch {
    return [];
  }
}

export function isFavorite(id: string) {
  return getFavorites().some((item) => item.id === id);
}

export function toggleFavorite(item: FavoriteItem) {
  const favorites = getFavorites();
  const exists = favorites.find((fav) => fav.id === item.id);

  let updated;

  if (exists) {
    updated = favorites.filter((fav) => fav.id !== item.id);
  } else {
    updated = [...favorites, item];
  }

  localStorage.setItem(FAV_KEY, JSON.stringify(updated));
  return !exists;
}

export function removeFavorite(id: string): FavoriteItem[] {
  const updated = getFavorites().filter((item) => item.id !== id);
  localStorage.setItem(FAV_KEY, JSON.stringify(updated));
  return updated;
}

export type CartItem = {
  id: string;
  title: string;
  price: number;
  image: {
    url: string;
    alt: string;
  };
  qty: number;
};

const CART_KEY = 'cart';

export function getCart(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addToCart(item: Omit<CartItem, 'qty'>) {
  const cart = getCart();
  const index = cart.findIndex((cart) => cart.id === item.id);

  if (index > -1) {
    cart[index].qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
}

export function updateCartQuantity(id: string, delta: number): CartItem[] {
  const cart = getCart();
  const index = cart.findIndex((item) => item.id === id);

  if (index === -1) return cart;

  cart[index].qty += delta;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
}
