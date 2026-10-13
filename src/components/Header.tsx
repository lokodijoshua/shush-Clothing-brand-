import React from 'react';
import { Search, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onNavigate,
}) => {
  return (
    <header className="sticky top-2 sm:top-3 z-40 px-3 sm:px-6 w-full transition-all duration-200 pointer-events-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between rounded-[8px] liquid-glass-bezel pointer-events-auto transition-all duration-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
        {/* Left: HUSH Bubble Logo taking the explore spot */}
        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center select-none"
            aria-label="shush Homepage"
          >
            <motion.span
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.95 }}
              className="font-brand text-2xl sm:text-3xl font-bold tracking-tight text-[#D47A94] drop-shadow-[0_1px_1px_rgba(212,122,148,0.25)] block"
            >
              shush
            </motion.span>
          </a>

          {/* Navigation Links with High Contrast Readability */}
          <nav className="hidden sm:flex items-center gap-7 text-sm font-bold text-stone-900">
            <button
              onClick={() => onNavigate('collections')}
              className="hover:text-[#D47A94] transition-colors cursor-pointer text-left whitespace-nowrap"
            >
              Collections
            </button>
            <button
              onClick={() => onNavigate('about')}
              className="hover:text-[#D47A94] transition-colors cursor-pointer text-left whitespace-nowrap"
            >
              About
            </button>
            <button
              onClick={() => onNavigate('reviews')}
              className="hover:text-[#D47A94] transition-colors cursor-pointer text-left whitespace-nowrap"
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* Center: Mobile Navigation */}
        <nav className="flex sm:hidden items-center gap-4 text-xs font-medium text-stone-600">
          <button
            onClick={() => onNavigate('collections')}
            className="hover:text-black transition-colors"
          >
            Collections
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="hover:text-black transition-colors"
          >
            About
          </button>
        </nav>

        {/* Right: Normal Search Icon Button + Cart in a Black Circle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-700 hover:text-black hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            aria-label="Search collection"
          >
            <Search className="w-5 h-5 stroke-[1.8]" />
          </button>

          {/* Cart Icon inside a Solid Black Circle */}
          <button
            onClick={onOpenCart}
            className="relative w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-stone-800 transition-transform active:scale-95 cursor-pointer shadow-md"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4.5 h-4.5 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D47A94] text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
