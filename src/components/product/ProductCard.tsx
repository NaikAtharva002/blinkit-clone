import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Stepper } from '../common/Stepper';
import { Zap } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelectProduct }) => {
  const { getItemQuantity, addItem, updateQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const discount = product.discountPercentage || 
    (product.mrp > product.price 
      ? Math.round(((product.mrp - product.price) / product.mrp) * 100) 
      : 0);

  return (
    <div
      onClick={() => onSelectProduct && onSelectProduct(product)}
      className="group relative flex flex-col justify-between bg-white rounded-2xl border border-[#EDEDED] p-3 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer min-w-[170px] max-w-[220px] w-full"
    >
      {/* Top row: Delivery badge & Discount pill */}
      <div className="flex items-center justify-between mb-1 min-h-[22px]">
        <div className="flex items-center gap-0.5 bg-[#F3F9F4] text-[#0C831F] text-[10px] font-extrabold px-1.5 py-0.5 rounded tracking-tight">
          <Zap className="w-2.5 h-2.5 fill-current" />
          <span>{product.deliveryTime}</span>
        </div>

        {discount > 0 && (
          <span className="text-[10px] font-bold text-[#256FEF] bg-blue-50 px-1.5 py-0.5 rounded">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Product Image */}
      <div className="relative w-full aspect-square flex items-center justify-center p-2 my-1 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            // Fallback image if unsplash url fails
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80';
          }}
        />
      </div>

      {/* Details Container */}
      <div className="flex flex-col mt-1">
        {/* Unit / Weight */}
        <span className="text-[11px] font-medium text-[#666666]">
          {product.unit}
        </span>

        {/* Product Name */}
        <h3 className="text-xs font-semibold text-[#1C1C1C] line-clamp-2 min-h-[34px] leading-snug mt-0.5 group-hover:text-[#0C831F] transition-colors">
          {product.name}
        </h3>
      </div>

      {/* Bottom Row: Price & ADD Button */}
      <div className="flex items-center justify-between mt-3 pt-1">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs md:text-sm font-extrabold text-[#1C1C1C]">
              ₹{product.price}
            </span>
            {product.mrp > product.price && (
              <span className="text-[11px] text-[#9C9C9C] line-through font-normal">
                ₹{product.mrp}
              </span>
            )}
          </div>
        </div>

        <div>
          <Stepper
            quantity={quantity}
            onAdd={() => addItem(product)}
            onIncrement={() => updateQuantity(product.id, 1)}
            onDecrement={() => updateQuantity(product.id, -1)}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};
