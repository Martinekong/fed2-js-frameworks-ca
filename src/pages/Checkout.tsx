// src/pages/Checkout.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItem } from 'services/storage';

type CheckoutPageProps = {
  items: CartItem[];
  onClearCart: () => void;
};

type FormData = {
  fullName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
};

export default function CheckoutPage({
  items,
  onClearCart,
}: CheckoutPageProps) {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    address: '',
    postalCode: '',
    city: '',
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors: Partial<FormData> = {};

    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.postalCode.trim())
      newErrors.postalCode = 'Postal code is required';
    if (!form.city.trim()) newErrors.city = 'City is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!validate()) return;

    onClearCart();
    navigate('/order-success', { state: { name: form.fullName } });
  }

  if (items.length === 0) {
    return (
      <section className="max-w-3xl px-4 py-8 mx-auto">
        <h1 className="mb-4 text-4xl font-semibold">Checkout</h1>
        <p className="mb-4 text-gray-600">
          Your cart is empty. Add some products before checking out.
        </p>
        <Link
          to="/"
          className="inline-flex px-4 py-3 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-900"
        >
          Back to products
        </Link>
      </section>
    );
  }

  return (
    <section className="grid max-w-5xl grid-cols-1 gap-8 px-4 py-8 mx-auto md:grid-cols-[2fr,1.5fr]">
      <div>
        <h1 className="mb-4 text-4xl font-semibold">Checkout</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="fullName"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="address">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-600">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                className="block mb-1 text-sm font-medium"
                htmlFor="postalCode"
              >
                Postal code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                value={form.postalCode}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.postalCode && (
                <p className="mt-1 text-xs text-red-600">{errors.postalCode}</p>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium" htmlFor="city">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
              {errors.city && (
                <p className="mt-1 text-xs text-red-600">{errors.city}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-900"
          >
            Confirm order
          </button>
        </form>
      </div>

      <aside className="p-4 border rounded-lg bg-gray-50">
        <h2 className="mb-3 text-lg font-semibold">Order summary</h2>
        <ul className="mb-4 space-y-3 overflow-y-auto max-h-64">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3">
              <img
                src={item.image.url}
                alt={item.image.alt || item.title}
                className="object-cover rounded w-14 h-14"
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {item.qty} × {item.price.toFixed(2)} NOK
                </p>
              </div>
              <p className="text-sm font-semibold">
                {(item.price * item.qty).toFixed(2)} NOK
              </p>
            </li>
          ))}
        </ul>

        <div className="flex justify-between pt-3 text-sm font-semibold border-t">
          <span>Total</span>
          <span>{total.toFixed(2)} NOK</span>
        </div>
      </aside>
    </section>
  );
}
