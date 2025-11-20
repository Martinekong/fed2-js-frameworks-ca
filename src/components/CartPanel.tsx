import { CartItem } from 'services/storage';
import { Link } from 'react-router-dom';

type CartPanelProps = {
  items: CartItem[];
  onChangeQty: (id: string, delta: number) => void;
  onClose: () => void;
};

export default function CartPanel({
  items,
  onChangeQty,
  onClose,
}: CartPanelProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between hover:opacity-90">
            <Link
              to={`/product/${item.id}`}
              onClick={onClose}
              className="flex flex-grow gap-3"
            >
              <img
                src={item.image.url}
                alt={item.image.alt || item.title}
                className="object-cover rounded h-14 w-14"
              />
              <div className="flex-1">
                <p className="pb-1 text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {item.qty} x {item.price.toFixed(2)} NOK
                </p>
              </div>
            </Link>
            <div className="flex flex-col justify-between">
              <p className="text-sm font-bold">
                {(item.price * item.qty).toFixed(2)} NOK
              </p>
              <div className="flex self-end gap-2">
                <button
                  onClick={() => onChangeQty(item.id, -1)}
                  className="w-6 h-6 leading-5 text-center border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => onChangeQty(item.id, +1)}
                  className="w-6 h-6 leading-5 text-center border rounded hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between pt-3 text-sm font-semibold border-t">
        <span>Total:</span>
        <span>{total.toFixed(2)} NOK</span>
      </div>
    </div>
  );
}
