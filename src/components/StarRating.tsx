type StarRatingProps = {
  rating: number;
};

export default function StarRating({ rating }: StarRatingProps) {
  const fullStars = Math.max(1, Math.floor(rating));
  const stars = ' ⭐ '.repeat(fullStars);

  return (
    <p className="text-sm text-gray-500 col-span-2">
      {stars} ({rating.toFixed(1)}/5.0)
    </p>
  );
}
