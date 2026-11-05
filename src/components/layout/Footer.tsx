import React from 'react';
import { BlinkitLogo } from '../common/BlinkitLogo';
import { CATEGORIES } from '../../data/categories';

interface FooterProps {
  onSelectCategory: (categoryId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-12 pt-12 pb-16 text-gray-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-10 border-b border-gray-100">
          
          {/* Brand Info & App Links */}
          <div className="col-span-2">
            <BlinkitLogo size="md" />
            <p className="text-xs text-gray-500 mt-3 max-w-sm leading-relaxed">
              India's leading quick-commerce delivery service. Get groceries, fresh dairy, fresh fruits & vegetables, snacks, and daily essentials delivered in 10 minutes.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900 text-white cursor-pointer hover:bg-black transition-colors">
                <span className="text-lg"></span>
                <div className="text-left leading-none">
                  <span className="text-[9px] block text-gray-400">Download on the</span>
                  <span className="text-xs font-bold">App Store</span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-900 text-white cursor-pointer hover:bg-black transition-colors">
                <span className="text-lg">▶</span>
                <div className="text-left leading-none">
                  <span className="text-[9px] block text-gray-400">GET IT ON</span>
                  <span className="text-xs font-bold">Google Play</span>
                </div>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="font-bold text-[#1C1C1C] mb-3 uppercase tracking-wider text-[11px]">
              Useful Links
            </h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-[#0C831F]">About Us</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Careers</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Blog</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Press & Media</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Lead</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Value Proposition</a></li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div>
            <h4 className="font-bold text-[#1C1C1C] mb-3 uppercase tracking-wider text-[11px]">
              Categories
            </h4>
            <ul className="space-y-2 text-gray-500">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelectCategory(c.id)}
                    className="hover:text-[#0C831F] text-left"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner & Policy */}
          <div>
            <h4 className="font-bold text-[#1C1C1C] mb-3 uppercase tracking-wider text-[11px]">
              Partner & Legal
            </h4>
            <ul className="space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-[#0C831F]">Partner with Blinkit</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Warehouse Partner</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Terms of Use</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Responsible Disclosure</a></li>
              <li><a href="#" className="hover:text-[#0C831F]">Security</a></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 text-[11px] text-gray-400 leading-relaxed flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © Blink Commerce Private Limited (formerly known as Grofers India Private Limited), 2016-2026
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500">
            <span>Facebook</span>
            <span>Twitter</span>
            <span>Instagram</span>
            <span>LinkedIn</span>
            <span>Threads</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
