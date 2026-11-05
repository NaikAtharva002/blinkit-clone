import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { CategorySidebar } from './CategorySidebar';
import { ProductCard } from '../product/ProductCard';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

interface CategoryPageProps {
  categoryId: string;
  onSelectCategory: (catId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  categoryId,
  onSelectCategory,
  onSelectProduct
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'price-asc' | 'price-desc' | 'discount'>('relevance');

  const currentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.id === categoryId) || CATEGORIES[0];
  }, [categoryId]);

  // Reset subcategory when main category changes
  React.useEffect(() => {
    setSelectedSubCategory('All');
  }, [categoryId]);

  const filteredProducts = useMemo(() => {
    let prods = PRODUCTS.filter((p) => p.categoryId === currentCategory.id);

    if (selectedSubCategory !== 'All') {
      prods = prods.filter((p) => p.subCategory.toLowerCase() === selectedSubCategory.toLowerCase());
    }

    if (sortBy === 'price-asc') {
      prods = [...prods].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      prods = [...prods].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      prods = [...prods].sort((a, b) => (b.discountPercentage || 0) - (a.discountPercentage || 0));
    }

    return prods;
  }, [currentCategory, selectedSubCategory, sortBy]);

  return (
    <div className="flex-1 flex max-w-7xl mx-auto w-full bg-[#F4F6FB] min-h-[calc(100vh-76px)]">
      {/* Category Sidebar */}
      <CategorySidebar
        selectedCategoryId={currentCategory.id}
        onSelectCategory={onSelectCategory}
      />

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 p-4 md:p-6 overflow-y-auto">
        
        {/* Mobile Category Horizontal Scroller */}
        <div className="sm:hidden mb-4 overflow-x-auto no-scrollbar flex items-center gap-2 pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                cat.id === currentCategory.id
                  ? 'bg-[#0C831F] text-white shadow-xs'
                  : 'bg-white text-gray-700 border border-gray-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Category Header & Subcategory Bar */}
        <div className="bg-white rounded-2xl p-4 border border-[#EEEEEE] shadow-2xs mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <h1 className="text-lg md:text-xl font-black text-[#1C1C1C]">
                {currentCategory.name}
              </h1>
              <p className="text-xs text-gray-500 mt-0.5">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-xs font-semibold text-gray-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-bold text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-[#0C831F] cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>

          {/* Subcategories Horizontal Bar */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 border-t border-gray-100">
            {currentCategory.subCategories.map((sub) => {
              const isActive = selectedSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#1C1C1C] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 md:gap-4">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={onSelectProduct}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 max-w-md mx-auto my-8">
            <span className="text-3xl mb-3 block">📦</span>
            <h3 className="text-base font-bold text-gray-800">No products in this subcategory</h3>
            <p className="text-xs text-gray-500 mt-1">
              Try selecting "All" or browse other categories.
            </p>
            <button
              onClick={() => setSelectedSubCategory('All')}
              className="mt-4 px-4 py-2 rounded-xl bg-[#0C831F] text-white text-xs font-bold"
            >
              Show All Products
            </button>
          </div>
        )}

      </main>
    </div>
  );
};
