// src/pages/OrderSuccess.tsx
import { Link, useLocation } from 'react-router-dom';

type LocationState = {
  name?: string;
};

export default function OrderSuccessPage() {
  const location = useLocation();
  const state = location.state as LocationState | null;
  const name = state?.name;

  return (
    <section className="max-w-2xl px-4 py-12 mx-auto text-center">
      <h1 className="mb-4 text-4xl font-semibold">Order confirmed 🎉</h1>

      {name && <p className="mb-2 text-lg">Thank you, {name}!</p>}

      <p className="mb-6 text-gray-600">
        Your order has been placed. You’ll receive a confirmation email shortly.
      </p>

      <Link
        to="/"
        className="inline-flex px-4 py-3 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-900"
      >
        Back to store
      </Link>
    </section>
  );
}
