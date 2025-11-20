import StarRating from 'components/StarRating';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { successToast } from 'utils/toast';

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
  tags: string[];
  reviews: Review[];
};

type Review = {
  id: string;
  username: string;
  description: string;
  rating: number;
};

type ProductPageProps = {
  onAddToCart: (item: {
    id: string;
    title: string;
    price: number;
    image: string;
  }) => void;
};

export default function Product({ onAddToCart }: ProductPageProps) {
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

  function handleAddToCartClick() {
    if (!product) return;

    const priceToUse =
      product.discountedPrice < product.price
        ? product.discountedPrice
        : product.price;

    onAddToCart({
      id: product.id,
      title: product.title,
      price: priceToUse,
      image: product.image.url,
    });

    successToast(`Added 1 "${product.title}" to cart`);
  }

  return (
    <section className="flex flex-col max-w-6xl gap-8 mx-auto md:grid md:grid-cols-2">
      <div className="md:col-span-2">
        <h1 className="text-4xl">{product.title}</h1>
        <StarRating rating={product.rating} />
      </div>

      <img
        src={product.image.url}
        alt={product.image.alt}
        className="object-cover w-full rounded h-80 md:row-span-3"
      />

      <div className="flex items-center gap-4">
        {product.price === product.discountedPrice ? (
          <p className="text-2xl font-bold">{product.price} NOK</p>
        ) : (
          <p className="text-2xl font-bold">{product.discountedPrice} NOK</p>
        )}

        {product.discountedPrice < product.price ? (
          <p className="text-sm line-through">({product.price} NOK)</p>
        ) : null}
      </div>

      <div className="flex justify-between gap-4 max-h-16">
        <AddToCartBtn onClick={handleAddToCartClick} />
        <AddToFavoritesBtn />
      </div>

      <div className="flex flex-col md:self-end">
        <h2 className="pb-2 font-bold">Product details:</h2>
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
        <h2 className="pb-2 font-bold">Reviews:</h2>
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

type AddToCartBtnProps = {
  onClick: () => void;
};

function AddToCartBtn({ onClick }: AddToCartBtnProps) {
  return (
    <button
      className="flex items-center gap-2 rounded-md text-lg p-4 shadow-lg transition-transform hover:scale-105 bg-[#C6F6BA] font-bold w-full justify-center"
      aria-label="Add product to cart"
      onClick={onClick}
    >
      <LocalMallOutlinedIcon />
      Add to cart
    </button>
  );
}

function AddToFavoritesBtn() {
  return (
    <button className="flex items-center gap-2 p-4 transition-transform bg-white rounded-md shadow-lg hover:scale-105">
      <FavoriteBorderIcon className="text-pink-300" />
    </button>
  );
}
