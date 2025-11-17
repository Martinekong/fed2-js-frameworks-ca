import { useEffect, useState } from 'react';
import { getFavorites, FavoriteItem, removeFavorite } from 'services/storage';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function FavoritesPanel() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  function handleRemove(id: string) {
    const updated = removeFavorite(id);
    setFavorites(updated);
  }

  if (favorites.length === 0) {
    return <p className="text-sm text-gray-500">No favorites yet.</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold">Favorites ({favorites.length})</p>

      <ul className="space-y-3">
        {favorites.map((item) => (
          <li key={item.id} className="flex gap-3 border-b pb-2">
            <img
              src={item.image}
              alt={item.title}
              className="h-14 w-14 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-grey-500">⭐ {item.rating} / 5</p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-sm font-bold">{item.price.toFixed(2)} NOK</p>
              <button
                onClick={() => handleRemove(item.id)}
                className="flex items-center gap-1 rounded-full px-2 py-1 text-xs hover:bg-red-50 self-end"
                aria-label={`Remove ${item.title} from favorites`}
              >
                <FavoriteIcon fontSize="small" className="text-pink-300" />
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
