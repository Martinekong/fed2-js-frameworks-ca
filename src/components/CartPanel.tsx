import { CartItem } from 'services/storage';

type CartPanelProps = {
  items: CartItem[];
  onChangeQty: (id: string, delta: number) => void;
};

export default function CartPanel({ items, onChangeQty }: CartPanelProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="h-14 w-14 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold pb-1">{item.title}</p>
              <p className="text-xs text-gray-500">
                {item.qty} x {item.price.toFixed(2)} NOK
              </p>
            </div>
            <div className="flex flex-col justify-between">
              <p className="text-sm font-bold">
                {(item.price * item.qty).toFixed(2)} NOK
              </p>
              <div className="flex gap-2 self-end">
                <button
                  onClick={() => onChangeQty(item.id, -1)}
                  className="h-6 w-6 rounded border text-center leading-5 hover:bg-gray-100"
                >
                  -
                </button>
                <span>{item.qty}</span>
                <button
                  onClick={() => onChangeQty(item.id, +1)}
                  className="h-6 w-6 rounded border text-center leading-5 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex justify-between border-t pt-3 text-sm font-semibold">
        <span>Total:</span>
        <span>{total.toFixed(2)} NOK</span>
      </div>
    </div>
  );
}
