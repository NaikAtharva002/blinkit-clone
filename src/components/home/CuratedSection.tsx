import React, { useRef } from 'react';
import { Product } from '../../types';
import { ProductCard } from '../product/ProductCard';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface CuratedSectionProps {
  title: string;
  categoryId: string;
  products: Product[];
  onSelectCategory: (categoryId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CuratedSection: React.FC<CuratedSectionProps> = ({
  title,
  categoryId,
  products,
  onSelectCategory,
  onSelectProduct
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="w-full my-6 bg-white rounded-3xl p-4 md:p-6 border border-[#EDEDED] shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg md:text-xl font-black text-[#1C1C1C]">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectCategory(categoryId)}
            className="text-xs md:text-sm font-bold text-[#0C831F] hover:underline flex items-center gap-0.5"
          >
            <span>see all</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Desktop scroll arrows */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full border border-gray-200 hover:bg-gray-100 text-gray-600 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-2 pt-1"
      >
        {products.map((product) => (
          <div key={product.id} className="shrink-0 w-[170px] sm:w-[190px] md:w-[200px]">
            <ProductCard
              product={product}
              onSelectProduct={onSelectProduct}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
