import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../product/ProductCard';
import { Search, X, TrendingUp, Sparkles, Clock } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  initialQuery?: string;
}

const TRENDING_SEARCHES = [
  'Milk',
  'Amul Butter',
  'Brown Bread',
  'Eggs',
  'Curd',
  'Chips',
  'Coca-Cola',
  'Atta',
  'Ice Cream',
  'Paneer',
  'Surf Excel',
  'Maggi'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const searchResults = trimmed
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.brand.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.subCategory.toLowerCase().includes(trimmed) ||
          p.description.toLowerCase().includes(trimmed)
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white overflow-hidden animate-fade-in">
      {/* Top Search Bar Header */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 md:py-4 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="flex-1 flex items-center h-12 px-4 rounded-2xl bg-gray-100 border border-transparent focus-within:border-[#0C831F] focus-within:bg-white transition-all">
            <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for milk, chips, curd, atta..."
              className="w-full bg-transparent text-sm font-semibold text-gray-800 placeholder:text-gray-400 focus:outline-none"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Main Search Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F4F6FB]">
        <div className="max-w-6xl mx-auto">
          
          {!trimmed ? (
            /* Blank Search State: Trending & Popular */
            <div className="space-y-6 max-w-2xl mx-auto pt-4">
              <div>
                <div className="flex items-center gap-2 mb-3 text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-[#0C831F]" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((item) => (
                    <button
                      key={item}
                      onClick={() => setQuery(item)}
                      className="px-3.5 py-2 rounded-xl bg-white border border-gray-200/80 text-xs font-semibold text-gray-800 hover:border-[#0C831F] hover:text-[#0C831F] hover:bg-[#F7FFF9] transition-all shadow-2xs"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Daily Essentials Grid */}
              <div className="pt-4">
                <div className="flex items-center gap-2 mb-4 text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-[#F8CB46]" />
                  <span>Popular Daily Essentials</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {PRODUCTS.slice(0, 8).map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onSelectProduct={(p) => {
                        onClose();
                        onSelectProduct(p);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : searchResults.length > 0 ? (
            /* Results Grid */
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-extrabold text-[#1C1C1C]">
                  Showing {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{query}"
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                {searchResults.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelectProduct={(p) => {
                      onClose();
                      onSelectProduct(p);
                    }}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Zero Results State */
            <div className="text-center py-16 max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-extrabold text-[#1C1C1C]">
                No products found for "{query}"
              </h3>
              <p className="text-xs text-gray-500 mt-1.5">
                Check your spelling or explore our trending grocery items below.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Milk', 'Chips', 'Bread', 'Eggs', 'Curd'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-bold text-[#0C831F] hover:bg-[#F7FFF9]"
                  >
                    Search "{item}"
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
