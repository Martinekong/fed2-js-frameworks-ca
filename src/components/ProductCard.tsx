import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { successToast } from 'utils/toast';
import StarRating from './StarRating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { isFavorite, toggleFavorite } from 'services/storage';

type ProductCardProps = {
  id: string;
  image: {
    url: string;
    alt: string;
  };
  title: string;
  price: number;
  discountedPrice: number | null;
  rating: number;
  onAddToCart: (item: {
    id: string;
    title: string;
    price: number;
    image: {
      url: string;
      alt: string;
    };
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

  const isDiscounted = discountedPrice !== null && discountedPrice < price;

  return (
    <>
      <div className="relative transition rounded-md shadow-md cursor-pointer hover:shadow-lg">
        <Link to={`/product/${id}`}>
          <img
            src={image.url}
            alt={image.alt || title}
            className="object-cover w-full h-48 rounded-md"
          />

          <div className="grid items-center grid-cols-3 p-4">
            <h2 className="col-span-2 text-lg font-semibold">{title}</h2>
            <p className="font-bold text-right">
              {isDiscounted ? discountedPrice : price} NOK
            </p>
            <StarRating rating={rating} />
            {isDiscounted && (
              <p className="text-sm text-right text-gray-500 line-through">
                {price} NOK
              </p>
            )}
          </div>
        </Link>

        <button
          onClick={onToggleFavorite}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-0 left-0 p-2 transition-transform bg-white shadow-lg rounded-tl-md rounded-br-md hover:scale-110"
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
      </div>
    </>
  );
}
