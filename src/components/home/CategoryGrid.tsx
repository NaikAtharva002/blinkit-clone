import React from 'react';
import { CATEGORIES } from '../../data/categories';

interface CategoryGridProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <div className="w-full my-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg md:text-xl font-black text-[#1C1C1C]">
          Explore by Category
        </h2>
      </div>

      {/* Actual Blinkit 10-column desktop / 4-column mobile category tiles */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2.5 sm:gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="flex flex-col items-center rounded-2xl bg-transparent hover:scale-105 transition-all duration-200 group text-center cursor-pointer p-1"
          >
            <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden bg-white/70 border border-gray-100 shadow-2xs group-hover:shadow-md group-hover:border-gray-300 transition-all flex items-center justify-center p-1">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-contain"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-2_10.png';
                }}
              />
            </div>
            <span className="text-[11px] font-bold text-[#1C1C1C] leading-tight line-clamp-1 mt-1.5 group-hover:text-[#0C831F] transition-colors">
              {cat.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
