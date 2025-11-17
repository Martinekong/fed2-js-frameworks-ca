import { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const url = 'https://v2.api.noroff.dev/online-shop?search=';

type SearchBarProps = {
  className?: string;
};

export default function SearchBar({ className = '' }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsError(false);
        setIsLoading(true);
        const response = await fetch(url);
        const json = await response.json();
        setProducts(json.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
    }
    loadProducts();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setFiltered([]);
      setIsOpen(false);
      return;
    }

    const q = query.toLowerCase();
    const results = products.filter((item) =>
      item.title.toLowerCase().includes(q)
    );

    setFiltered(results);
    setIsOpen(true);
  }, [query, products]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setQuery('');
        setFiltered([]);
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full mx-auto z-10 ${className}`}
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          placeholder="Search..."
          aria-label="Search products"
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 border rounded-xl w-full mt-4 md:mt-0 md:order-2"
        />

        <SearchIcon
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          fontSize="small"
        />
      </div>

      {isOpen && isLoading && (
        <ul className="absolute left-0 right-0 bg-white rounded mt-1 shadow-lg p-3 text-sm text-gray-500">
          Loading search...
        </ul>
      )}

      {isOpen && !isLoading && !isError && filtered.length === 0 && (
        <ul className="absolute left-0 right-0 bg-white rounded mt-1 shadow-lg p-3 text-sm text-gray-500">
          No matches found for "{query}"
        </ul>
      )}

      {isOpen && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white rounded mt-1 max-h-64 overflow-y-auto shadow-lg">
          {filtered.map((item) => (
            <li
              key={item.id}
              className="p-2 border-b hover:bg-gray-100 cursor-pointer flex gap-2"
            >
              <img
                src={item.image.url}
                alt={item.image.alt}
                className="h-16 w-16 object-cover rounded-md"
              />
              <div>
                <p className="font-bold">{item.title}</p>
                <p className="text-sm">
                  {item.discountedPrice < item.price
                    ? item.discountedPrice
                    : item.price}{' '}
                  NOK
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
