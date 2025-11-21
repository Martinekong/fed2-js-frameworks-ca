import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';

type NavbarProps = {
  onOpenCart: () => void;
  onOpenFavorite: () => void;
  cartCount: number;
};

function Navbar({ onOpenCart, onOpenFavorite, cartCount }: NavbarProps) {
  return (
    <nav className="grid items-center justify-between grid-cols-2 px-8 pt-8 md:grid-cols-4">
      <Link to={`/`} className="text-3xl tracking-wider uppercase">
        varivo
      </Link>
      <div className="flex gap-4 justify-self-end md:order-3">
        <HeaderButton
          name="cart"
          background="bg-[#C6F6BA]"
          onClick={onOpenCart}
          badge={cartCount}
        />
        <HeaderButton name="favorite" onClick={onOpenFavorite} />
      </div>
      <SearchBar className="col-span-2" />
    </nav>
  );
}

type HeaderButtonProps = {
  name: 'cart' | 'favorite';
  background?: string;
  onClick: () => void;
  badge?: number;
};

function HeaderButton({
  name,
  background = 'bg-gray-100',
  onClick,
  badge,
}: HeaderButtonProps) {
  const showBadge = typeof badge === 'number' && badge > 0;

  return (
    <button
      onClick={onClick}
      className={`relative rounded-full p-3 ${background} shadow hover:shadow-lg transition-shadow cursor-pointer`}
      aria-label={name === 'cart' ? 'Open cart' : 'Open favorites'}
    >
      {name === 'cart' ? <LocalMallOutlinedIcon /> : <FavoriteBorderIcon />}

      {showBadge && (
        <span className="absolute -top-1 -right-1 min-w-[1.25rem] rounded-full bg-black px-2 py-1 text-center text-[10px] font-semibold text-white">
          {badge}
        </span>
      )}
    </button>
  );
}

export default Navbar;
