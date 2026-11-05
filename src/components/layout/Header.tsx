import React, { useState, useEffect } from 'react';
import { BlinkitLogo } from '../common/BlinkitLogo';
import { useLocation } from '../../context/LocationContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Search, ShoppingCart, ChevronDown, User, LogOut, Package, MapPin } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSelectCategory?: (categoryId: string) => void;
  onGoHome?: () => void;
}

const SEARCH_PLACEHOLDERS = [
  'Search "milk"',
  'Search "bread"',
  'Search "chips"',
  'Search "butter"',
  'Search "curd"',
  'Search "paneer"',
  'Search "eggs"',
  'Search "atta"',
  'Search "chocolates"',
  'Search "cold drinks"'
];

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  searchQuery = '',
  onSearchChange,
  onGoHome
}) => {
  const { location, openLocationModal } = useLocation();
  const { totalCount, subtotal, openCart } = useCart();
  const { user, isLoggedIn, openLoginModal, logout } = useAuth();

  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#EDEDED] shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-[76px] flex items-center justify-between gap-4 md:gap-8">
        
        {/* Left: Logo & Location */}
        <div className="flex items-center gap-4 md:gap-8 shrink-0">
          <button
            onClick={onGoHome}
            className="flex items-center focus:outline-none transition-transform hover:scale-[1.02]"
            aria-label="Blinkit Home"
          >
            <BlinkitLogo size="md" />
          </button>

          {/* Location Picker */}
          <div className="hidden sm:block border-l border-gray-200 pl-4 md:pl-6">
            <button
              onClick={openLocationModal}
              className="text-left group flex flex-col focus:outline-none"
            >
              <span className="text-[13px] font-black text-[#1C1C1C] tracking-tight group-hover:text-[#0C831F] transition-colors flex items-center gap-1">
                Delivery in {location.deliveryTime}
              </span>
              <div className="flex items-center gap-1 text-xs text-[#666666] max-w-[200px] md:max-w-[260px] truncate">
                <span className="truncate">{location.title} - {location.city}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0C831F] shrink-0" />
              </div>
            </button>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-[640px] relative">
          <div
            onClick={onOpenSearch}
            className="flex items-center w-full h-[46px] px-3.5 rounded-xl bg-[#F8F8F8] border border-gray-200 hover:border-gray-300 focus-within:border-gray-400 focus-within:bg-white transition-all cursor-text shadow-sm"
          >
            <Search className="w-4 h-4 text-gray-500 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                if (onSearchChange) onSearchChange(e.target.value);
              }}
              placeholder={SEARCH_PLACEHOLDERS[placeholderIndex]}
              className="w-full bg-transparent text-sm text-[#1C1C1C] placeholder:text-gray-400 focus:outline-none font-medium"
            />
            {searchQuery && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSearchChange) onSearchChange('');
                }}
                className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Login & Cart */}
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          
          {/* User / Login Button */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown((prev) => !prev)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold text-[#1C1C1C] hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#FFF8E1] border border-[#F8CB46] text-[#1C1C1C] flex items-center justify-center font-black text-xs">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline font-bold">{user?.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
              </button>

              {/* User Dropdown */}
              {showUserDropdown && (
                <div
                  className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in"
                  onMouseLeave={() => setShowUserDropdown(false)}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-xs font-bold text-gray-800 truncate">{user?.phone}</p>
                  </div>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      openLocationModal();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 text-left"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>My Addresses</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserDropdown(false);
                      alert('Order history simulation');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 text-left"
                  >
                    <Package className="w-4 h-4 text-gray-400" />
                    <span>My Orders</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      setShowUserDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 text-left border-t border-gray-100 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="text-base font-semibold text-[#1C1C1C] hover:text-[#0C831F] px-2 py-1 transition-colors"
            >
              Login
            </button>
          )}

          {/* My Cart Button */}
          <button
            onClick={openCart}
            className={`flex items-center gap-2.5 px-4 md:px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95 ${
              totalCount > 0
                ? 'bg-[#0C831F] text-white hover:bg-[#096618]'
                : 'bg-[#0C831F] text-white hover:bg-[#096618]'
            }`}
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <div className="flex flex-col text-left leading-none">
              {totalCount > 0 ? (
                <>
                  <span className="text-[11px] font-medium opacity-90">{totalCount} items</span>
                  <span className="text-xs md:text-sm font-extrabold mt-0.5">₹{subtotal}</span>
                </>
              ) : (
                <span className="text-xs md:text-sm font-extrabold">My Cart</span>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Location Header Bar */}
      <div className="sm:hidden px-4 py-2 bg-[#F8F9FA] border-t border-gray-100 flex items-center justify-between">
        <button
          onClick={openLocationModal}
          className="flex items-center gap-1.5 text-left text-xs text-[#1C1C1C]"
        >
          <span className="font-extrabold text-[#0C831F]">⚡ {location.deliveryTime}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-700 truncate max-w-[240px]">{location.title}</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </div>
    </header>
  );
};
