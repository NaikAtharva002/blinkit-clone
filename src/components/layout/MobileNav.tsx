import React from 'react';
import { useCart } from '../../context/CartContext';
import { Home, Grid, Search, ShoppingBag } from 'lucide-react';

interface MobileNavProps {
  currentView: 'home' | 'category' | 'search';
  onNavigateHome: () => void;
  onNavigateCategories: () => void;
  onOpenSearch: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onNavigateHome,
  onNavigateCategories,
  onOpenSearch
}) => {
  const { totalCount, openCart } = useCart();

  return (
    <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 py-1.5 px-3 flex items-center justify-around shadow-lg">
      <button
        onClick={onNavigateHome}
        className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold ${
          currentView === 'home' ? 'text-[#0C831F]' : 'text-gray-500'
        }`}
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>Home</span>
      </button>

      <button
        onClick={onNavigateCategories}
        className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold ${
          currentView === 'category' ? 'text-[#0C831F]' : 'text-gray-500'
        }`}
      >
        <Grid className="w-5 h-5 mb-0.5" />
        <span>Categories</span>
      </button>

      <button
        onClick={onOpenSearch}
        className={`flex flex-col items-center py-1 px-3 text-[10px] font-bold ${
          currentView === 'search' ? 'text-[#0C831F]' : 'text-gray-500'
        }`}
      >
        <Search className="w-5 h-5 mb-0.5" />
        <span>Search</span>
      </button>

      <button
        onClick={openCart}
        className="flex flex-col items-center py-1 px-3 text-[10px] font-bold text-gray-500 relative"
      >
        <ShoppingBag className="w-5 h-5 mb-0.5" />
        <span>Cart</span>
        {totalCount > 0 && (
          <span className="absolute top-0 right-2 w-4 h-4 rounded-full bg-[#0C831F] text-white text-[9px] font-black flex items-center justify-center">
            {totalCount}
          </span>
        )}
      </button>
    </nav>
  );
};
