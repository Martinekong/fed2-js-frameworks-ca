import { useEffect, useState } from 'react';
import { successToast } from 'utils/toast';
import StarRating from './StarRating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { isFavorite, toggleFavorite } from 'services/storage';

type ProductCardProps = {
  id: string;
  image: string;
  title: string;
  price: number;
  discountedPrice: number | null;
  rating: number;
  onAddToCart: (item: {
    id: string;
    title: string;
    price: number;
    image: string;
  }) => void;
};

export default function ProductCard({
  id,
  image,
  title,
  price,
  discountedPrice,
  rating,
  onAddToCart,
}: ProductCardProps) {
  const [favorite, setFavorites] = useState(() => isFavorite(id));

  useEffect(() => {
    setFavorites(isFavorite(id));
  }, [id]);

  function onToggleFavorite() {
    const nowFavorite = toggleFavorite({
      id,
      title,
      price,
      image,
      rating,
    });
    setFavorites(nowFavorite);

    if (nowFavorite) {
      successToast(`Added "${title}" to favorites`);
    } else {
      successToast(`Removed "${title}" from favorites`);
    }
  }

  function handleAddToCart() {
    onAddToCart({ id, title, price, image });
    successToast(`Added 1 "${title}" to cart`);
  }

  return (
    <div className="rounded-md shadow-md hover:shadow-lg transition relative cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />
      <button
        onClick={onToggleFavorite}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute left-0 top-0 bg-white p-2 shadow-lg rounded-tl-md rounded-br-md transition-transform hover:scale-110"
      >
        {favorite ? (
          <FavoriteIcon className="text-pink-300" />
        ) : (
          <FavoriteBorderIcon className="text-pink-300" />
        )}
      </button>
      <button
        onClick={handleAddToCart}
        aria-label="Add to cart"
        className="absolute right-0 top-0 rounded-tr-md rounded-bl-md bg-[#C6F6BA] p-2 shadow-lg transition-transform hover:scale-110"
      >
        <LocalMallOutlinedIcon />
      </button>
      <div className="p-4 items-center grid grid-cols-3">
        <h2 className="text-lg font-semibold col-span-2">{title}</h2>
        <p className="font-bold text-right">{price} NOK</p>
        <StarRating rating={rating} />
        <p className="text-right line-through">{discountedPrice} NOK</p>
      </div>
    </div>
  );
}
