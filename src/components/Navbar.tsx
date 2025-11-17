import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

type NavbarProps = {
  onOpenCart: () => void;
  onOpenFavorite: () => void;
  cartCount: number;
};

function Navbar({ onOpenCart, onOpenFavorite, cartCount }: NavbarProps) {
  return (
    <nav className="p-8 flex justify-between items-center gap-12">
      <div className="text-3xl uppercase">Varivo</div>
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded-xl w-full"
      />
      <div className="flex gap-4">
        <HeaderButton
          name="cart"
          background="bg-[#C6F6BA]"
          onClick={onOpenCart}
          badge={cartCount}
        />
        <HeaderButton name="favorite" onClick={onOpenFavorite} />
      </div>
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
      className={`relative rounded-full p-3 ${background}`}
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
