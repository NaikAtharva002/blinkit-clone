import React from 'react';
import { CATEGORIES } from '../../data/categories';

interface CategorySidebarProps {
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategorySidebar: React.FC<CategorySidebarProps> = ({
  selectedCategoryId,
  onSelectCategory
}) => {
  return (
    <aside className="w-60 md:w-64 bg-white border-r border-[#EEEEEE] shrink-0 h-[calc(100vh-76px)] sticky top-[76px] overflow-y-auto hidden sm:block py-2">
      <div className="space-y-0.5">
        {CATEGORIES.map((cat) => {
          const isSelected = cat.id === selectedCategoryId;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-all ${
                isSelected
                  ? 'bg-[#F4F6FB] border-l-4 border-[#0C831F] text-[#1C1C1C] font-black'
                  : 'text-gray-700 hover:bg-gray-50 border-l-4 border-transparent font-medium'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex items-center justify-center shrink-0 p-0.5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xs leading-tight line-clamp-2">
                {cat.name}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
