import React, { useState, useEffect } from 'react';
import { HERO_BANNERS, PROMO_STRIPS } from '../../data/banners';
import { ChevronLeft, ChevronRight, Zap } from 'lucide-react';

interface HeroBannersProps {
  onSelectCategory: (catId: string) => void;
}

export const HeroBanners: React.FC<HeroBannersProps> = ({ onSelectCategory }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const banner = HERO_BANNERS[currentSlide];

  return (
    <div className="w-full space-y-4">
      {/* Main Hero Slider */}
      <div className="relative w-full h-[180px] sm:h-[220px] md:h-[260px] rounded-3xl overflow-hidden shadow-sm group">
        <div
          onClick={() => banner.linkToCategory && onSelectCategory(banner.linkToCategory)}
          className="relative w-full h-full cursor-pointer overflow-hidden"
        >
          {/* Background image with gradient overlay */}
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent flex flex-col justify-center px-6 md:px-12 text-white">
            <div className="flex items-center gap-1.5 w-fit bg-[#0C831F] text-white text-[10px] md:text-xs font-black px-2.5 py-0.5 rounded-full mb-2 uppercase tracking-wider">
              <Zap className="w-3 h-3 fill-current" />
              <span>{banner.tag}</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-black max-w-lg leading-tight drop-shadow-sm">
              {banner.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 mt-1.5 max-w-md line-clamp-2">
              {banner.subtitle}
            </p>
            <button className="mt-4 px-4 py-1.5 w-fit rounded-xl bg-[#F8CB46] text-[#1C1C1C] font-black text-xs hover:bg-yellow-400 transition-colors shadow-md">
              Order Now →
            </button>
          </div>
        </div>

        {/* Carousel Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide((prev) => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length);
          }}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setCurrentSlide((prev) => (prev + 1) % HERO_BANNERS.length);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          {HERO_BANNERS.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full cursor-pointer transition-all ${
                currentSlide === idx ? 'w-6 bg-[#F8CB46]' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Value Strips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PROMO_STRIPS.map((strip) => (
          <div
            key={strip.id}
            className={`p-3.5 rounded-2xl border flex items-center justify-between ${strip.bg} shadow-2xs`}
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider block opacity-75">
                {strip.badge}
              </span>
              <h4 className="text-xs font-black">{strip.title}</h4>
              <p className="text-[11px] opacity-80">{strip.description}</p>
            </div>
            <span className="text-xl">⚡</span>
          </div>
        ))}
      </div>
    </div>
  );
};
