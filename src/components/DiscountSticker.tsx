type DiscountStickerProps = {
  price: number;
  discountedPrice: number | null;
  className?: string;
};

export default function DiscountSticker({
  price,
  discountedPrice,
  className,
}: DiscountStickerProps) {
  if (discountedPrice === null || discountedPrice === price) {
    return null;
  }

  const discountPercent = Math.round(((price - discountedPrice) / price) * 100);

  return (
    <div
      className={`absolute rounded-full bg-black/80 px-3 py-1 text-sm font-semibold text-white shadow-md ${className}`}
    >
      -{discountPercent}%
    </div>
  );
}
