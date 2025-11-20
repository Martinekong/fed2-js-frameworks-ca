import { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

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

  function closeSearch() {
    setQuery('');
    setFiltered([]);
    setIsOpen(false);
  }

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
          className="w-full p-2 mt-4 border rounded-xl md:mt-0 md:order-2"
        />

        <SearchIcon
          className="absolute text-gray-400 -translate-y-1/2 pointer-events-none right-3 top-9 md:top-1/2"
          fontSize="small"
        />
      </div>

      {isOpen && isLoading && (
        <ul className="absolute left-0 right-0 p-3 mt-1 text-sm text-gray-500 bg-white rounded shadow-lg">
          Loading search...
        </ul>
      )}

      {isOpen && !isLoading && !isError && filtered.length === 0 && (
        <ul className="absolute left-0 right-0 p-3 mt-1 text-sm text-gray-500 bg-white rounded shadow-lg">
          No matches found for "{query}"
        </ul>
      )}

      {isOpen && filtered.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 overflow-y-auto bg-white rounded shadow-lg max-h-64">
          {filtered.map((item) => (
            <li key={item.id}>
              <Link
                to={`/product/${item.id}`}
                onClick={closeSearch}
                className="flex gap-2 p-2 border-b cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={item.image.url}
                  alt={item.image.alt}
                  className="object-cover w-16 h-16 rounded-md"
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
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
