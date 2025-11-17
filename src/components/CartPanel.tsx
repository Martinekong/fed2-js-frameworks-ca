import { getCart, CartItem } from 'services/storage';
import { useEffect, useState } from 'react';

export default function CartPanel() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <img
              src={item.image}
              alt={item.title}
              className="h-14 w-14 rounded object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-gray-500">
                {item.qty} x {item.price.toFixed(2)} NOK
              </p>
            </div>
            <p className="text-sm font-bold">
              {(item.price * item.qty).toFixed(2)} NOK
            </p>
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
