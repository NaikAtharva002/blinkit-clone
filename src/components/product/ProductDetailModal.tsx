import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Stepper } from '../common/Stepper';
import { X, Zap, ShieldCheck, Clock, Award, Star, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSelectCategory
}) => {
  if (!product) return null;

  const { getItemQuantity, addItem, updateQuantity, openCart } = useCart();
  const [selectedPackIndex, setSelectedPackIndex] = useState(0);
  const [activeImage, setActiveImage] = useState(product.image);

  useEffect(() => {
    setActiveImage(product.image);
    setSelectedPackIndex(0);
  }, [product]);

  const packSizes = product.packSizes || [{ unit: product.unit, price: product.price, mrp: product.mrp }];
  const currentPack = packSizes[selectedPackIndex] || packSizes[0];

  const quantity = getItemQuantity(product.id);
  const discount = Math.round(((currentPack.mrp - currentPack.price) / currentPack.mrp) * 100);

  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row p-6 md:p-8 gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Showcase & Thumbnail Gallery */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <div className="relative w-full aspect-square max-w-[340px] bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-center shadow-sm">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-contain transition-all duration-200"
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#256FEF] text-white text-xs font-bold px-2 py-1 rounded">
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Interactive Multi-Image Thumbnails */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar max-w-[340px] pb-1">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-14 h-14 rounded-xl border p-1 bg-white shrink-0 overflow-hidden transition-all ${
                    activeImage === img
                      ? 'border-[#0C831F] ring-2 ring-green-100 shadow-xs scale-105'
                      : 'border-gray-200 hover:border-gray-400 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} angle ${i + 1}`} className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Perks */}
          <div className="grid grid-cols-3 gap-3 w-full mt-6 pt-4 border-t border-gray-100 text-center">
            <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50">
              <Clock className="w-5 h-5 text-[#0C831F] mb-1" />
              <span className="text-[11px] font-bold text-gray-800">10 mins</span>
              <span className="text-[10px] text-gray-500">Superfast Delivery</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50">
              <Award className="w-5 h-5 text-[#F8CB46] mb-1" />
              <span className="text-[11px] font-bold text-gray-800">Best Prices</span>
              <span className="text-[10px] text-gray-500">Authentic Deals</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl bg-gray-50">
              <ShieldCheck className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-[11px] font-bold text-gray-800">100% Genuine</span>
              <span className="text-[10px] text-gray-500">Directly Sourced</span>
            </div>
          </div>
        </div>

        {/* Right Column: Details, Pack Selector & Action */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <div>
            {/* Category Breadcrumbs & Delivery Tag */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#0C831F] tracking-wide uppercase">
                {product.brand}
              </span>

              <div className="flex items-center gap-1 bg-[#F3F9F4] text-[#0C831F] text-xs font-extrabold px-2 py-0.5 rounded">
                <Zap className="w-3 h-3 fill-current" />
                <span>Delivery in {product.deliveryTime}</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-xl md:text-2xl font-bold text-[#1C1C1C] leading-snug">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-[#0C831F] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-current" />
                </div>
                <span className="text-xs text-gray-500">
                  ({product.ratingCount?.toLocaleString()} reviews)
                </span>
              </div>
            )}

            {/* Pack Sizes Options */}
            {packSizes.length > 1 && (
              <div className="mt-4">
                <label className="text-xs font-bold text-gray-600 uppercase tracking-wider block mb-2">
                  Select Pack Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {packSizes.map((pack, idx) => (
                    <button
                      key={pack.unit}
                      onClick={() => setSelectedPackIndex(idx)}
                      className={`px-3 py-2 rounded-xl border text-left text-xs font-semibold transition-all ${
                        selectedPackIndex === idx
                          ? 'border-[#0C831F] bg-[#F7FFF9] text-[#0C831F] shadow-sm'
                          : 'border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div>{pack.unit}</div>
                      <div className="font-extrabold text-sm mt-0.5">₹{pack.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price section */}
            <div className="flex items-baseline gap-3 mt-5 p-3 rounded-xl bg-[#F8F9FA]">
              <span className="text-2xl font-black text-[#1C1C1C]">
                ₹{currentPack.price}
              </span>
              {currentPack.mrp > currentPack.price && (
                <>
                  <span className="text-sm text-gray-400 line-through">
                    ₹{currentPack.mrp}
                  </span>
                  <span className="text-xs font-bold text-[#0C831F] bg-green-100 px-2 py-0.5 rounded-full">
                    Save ₹{currentPack.mrp - currentPack.price}
                  </span>
                </>
              )}
              <span className="text-[11px] text-gray-500 ml-auto">(Inclusive of all taxes)</span>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex items-center gap-4">
              <div className="w-36">
                <Stepper
                  quantity={quantity}
                  onAdd={() => addItem(product, currentPack.unit)}
                  onIncrement={() => updateQuantity(product.id, 1)}
                  onDecrement={() => updateQuantity(product.id, -1)}
                  size="lg"
                  fullWidth
                />
              </div>

              {quantity > 0 && (
                <button
                  onClick={() => {
                    onClose();
                    openCart();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0C831F] text-white font-bold text-sm hover:bg-[#096618] transition-colors shadow-md text-center"
                >
                  View in Cart →
                </button>
              )}
            </div>

            {/* Key Features & Info Accordion */}
            <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
              {product.keyFeatures && product.keyFeatures.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-gray-600">
                    {product.keyFeatures.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0C831F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Product Details
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Shelf Life & Manufacturer Details */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-3 rounded-xl">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                    Shelf Life
                  </span>
                  <span className="font-semibold text-gray-800">
                    {product.shelfLife || 'Check packaging'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase font-semibold">
                    Country of Origin
                  </span>
                  <span className="font-semibold text-gray-800">
                    {product.countryOfOrigin || 'India'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
