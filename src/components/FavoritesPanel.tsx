import { getFavorites, FavoriteItem } from 'services/storage';
import { useEffect, useState } from 'react';

export default function FavoritesPanel() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  if (favorites.length === 0) {
    return <p className="text-sm text-gray-500">No favorites yet.</p>;
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {favorites.map((item) => (
          <li key={item.id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="h-14 w-14 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-grey-500">⭐ {item.rating} / 5</p>
            </div>
            <p className="text-sm font-bold">{item.price.toFixed(2)} NOK</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
