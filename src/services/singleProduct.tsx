import StarRating from 'components/StarRating';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { isFavorite, toggleFavorite } from 'services/storage';

const BASE_URL = 'https://v2.api.noroff.dev/online-shop';

type SingleProduct = {
  id: string;
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  rating: number;
  image: {
    url: string;
    alt: string;
  };
  tags: String[];
  reviews: Review[];
};

type Review = {
  id: string;
  username: string;
  description: string;
  rating: number;
};

export default function Product() {
  const [product, setProduct] = useState<SingleProduct | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function getData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/${id}`);
        const json = await response.json();
        setProduct(json.data);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
        console.log(error);
      }
    }

    getData();
  }, [id]);

  if (isLoading) return <div>Loading product...</div>;

  if (isError) return <div>Error loading product</div>;

  if (!product) {
    return <div>Product not found.</div>;
  }

  console.log(product);

  return (
    <section className="flex flex-col gap-8 md:grid md:grid-cols-2 max-w-6xl mx-auto">
      <div className="md:col-span-2">
        <h1 className="text-4xl">{product.title}</h1>
        <StarRating rating={product.rating} />
      </div>

      <img
        src={product.image.url}
        alt={product.image.alt}
        className="h-80 w-full object-cover rounded md:row-span-3"
      />

      <div className="flex items-center gap-4">
        {product.price === product.discountedPrice ? (
          <p className="font-bold text-2xl">{product.price} NOK</p>
        ) : (
          <p className="font-bold text-2xl">{product.discountedPrice} NOK</p>
        )}

        {product.discountedPrice < product.price ? (
          <p className="line-through text-sm">({product.price} NOK)</p>
        ) : null}
      </div>

      <div className="flex justify-between gap-4 max-h-16">
        <AddToCartBtn />
        <AddToFavoritesBtn />
      </div>

      <div className="flex flex-col md:self-end">
        <h2 className="font-bold pb-2">Product details:</h2>
        <p>{product.description}</p>

        <div className="flex gap-4 mt-4">
          <p>Tags:</p>
          {product.tags.map((tag) => (
            <p className="p-1 bg-[#C6F6BA] opacity-70 rounded-sm text-sm shadow-sm">
              {tag}
            </p>
          ))}
        </div>
      </div>

      <div className="md:col-span-2">
        <h2 className="font-bold pb-2">Reviews:</h2>
        <ul className="flex flex-col gap-4">
          {product.reviews.map((review) => (
            <li key={review.id} className="pb-2 border-b">
              <div className="flex justify-between mb-2">
                <p>{review.username}</p>
                <StarRating rating={review.rating} />
              </div>
              <p>{review.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AddToCartBtn() {
  return (
    <button
      className="flex items-center gap-2 rounded-md text-lg p-4 shadow-lg transition-transform hover:scale-105 bg-[#C6F6BA] font-bold w-full justify-center"
      aria-label="Add product to cart"
    >
      <LocalMallOutlinedIcon />
      Add to cart
    </button>
  );
}

function AddToFavoritesBtn() {
  return (
    <button className="bg-white flex items-center gap-2 p-4 shadow-lg rounded-md transition-transform hover:scale-105">
      <FavoriteBorderIcon className="text-pink-300" />
    </button>
  );
}
