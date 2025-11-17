import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

type NavbarProps = {
  onOpenCart: () => void;
  onOpenFavorite: () => void;
};

function Navbar({ onOpenCart, onOpenFavorite }: NavbarProps) {
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
};

function HeaderButton({
  name,
  background = 'bg-gray-100',
  onClick,
}: HeaderButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full p-3 ${background}`}
      aria-label={name === 'cart' ? 'Open cart' : 'Open favorites'}
    >
      {name === 'cart' ? <LocalMallOutlinedIcon /> : <FavoriteBorderIcon />}
    </button>
  );
}

export default Navbar;
