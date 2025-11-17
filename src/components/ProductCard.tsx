import { useEffect, useState } from 'react';
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
      //Snackbar
      console.log(`Added "${title}" to favorites`);
    } else {
      //Snackbar
      console.log(`Removed "${title}" from favorites`);
    }
  }

  function handleAddToCart() {
    onAddToCart({ id, title, price, image });
    //Snackbar
    console.log(`Added 1 "${title}" to cart`);
  }

  return (
    <div className="rounded-md shadow-md hover:shadow-lg transition relative">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />
      <button
        onClick={onToggleFavorite}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        className="absolute left-0 top-0 bg-white p-2 shadow-lg rounded-tl-md rounded-br-md"
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
        className="absolute right-0 top-0 rounded-tr-md rounded-bl-md bg-[#C6F6BA] p-2 shadow-lg"
      >
        <LocalMallOutlinedIcon />
      </button>
      <div className="p-4 items-center grid grid-cols-3">
        <h2 className="text-lg font-semibold col-span-2">{title}</h2>
        <p className="font-bold text-right">{price}</p>
        {/* <p className="text-xs text-grey-500 col-span-2">⭐ {rating} / 5</p> */}
        <StarRating rating={rating} />
        <p className="text-right line-through">{discountedPrice}</p>
      </div>
    </div>
  );
}
