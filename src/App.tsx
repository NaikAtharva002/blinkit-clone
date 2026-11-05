import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';
import { HeroBanners } from './components/home/HeroBanners';
import { CategoryGrid } from './components/home/CategoryGrid';
import { CuratedSection } from './components/home/CuratedSection';
import { CategoryPage } from './components/category/CategoryPage';
import { ProductDetailModal } from './components/product/ProductDetailModal';
import { CartDrawer } from './components/cart/CartDrawer';
import { OrderSuccessModal } from './components/cart/OrderSuccessModal';
import { LocationModal } from './components/location/LocationModal';
import { LoginModal } from './components/auth/LoginModal';
import { SearchModal } from './components/search/SearchModal';
import { PRODUCTS } from './data/products';
import { Product } from './types';

export const MainApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'category'>('home');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('dairy-bread-eggs');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutSuccessOpen, setIsCheckoutSuccessOpen] = useState(false);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategoryId(catId);
    setCurrentView('category');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6FB] pb-16 sm:pb-0 font-sans">
      {/* Sticky Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onGoHome={handleGoHome}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content View */}
      {currentView === 'home' ? (
        <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-6 w-full">
          {/* Hero Promotional Banners */}
          <HeroBanners onSelectCategory={handleSelectCategory} />

          {/* Category Exploration Grid */}
          <CategoryGrid onSelectCategory={handleSelectCategory} />

          {/* Curated Product Shelves */}
          <CuratedSection
            title="Dairy, Bread & Eggs"
            categoryId="dairy-bread-eggs"
            products={PRODUCTS.filter((p) => p.categoryId === 'dairy-bread-eggs')}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={setSelectedProduct}
          />

          <CuratedSection
            title="Snacks & Munchies"
            categoryId="snacks-munchies"
            products={PRODUCTS.filter((p) => p.categoryId === 'snacks-munchies')}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={setSelectedProduct}
          />

          <CuratedSection
            title="Cold Drinks & Juices"
            categoryId="cold-drinks-juices"
            products={PRODUCTS.filter((p) => p.categoryId === 'cold-drinks-juices')}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={setSelectedProduct}
          />

          <CuratedSection
            title="Fresh Fruits & Vegetables"
            categoryId="fruits-vegetables"
            products={PRODUCTS.filter((p) => p.categoryId === 'fruits-vegetables')}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={setSelectedProduct}
          />

          <CuratedSection
            title="Atta, Rice & Dal"
            categoryId="atta-rice-dal"
            products={PRODUCTS.filter((p) => p.categoryId === 'atta-rice-dal')}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={setSelectedProduct}
          />

          <CuratedSection
            title="Sweet Tooth & Chocolates"
            categoryId="sweet-tooth"
            products={PRODUCTS.filter((p) => p.categoryId === 'sweet-tooth')}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={setSelectedProduct}
          />

          <CuratedSection
            title="Cleaning & Household Essentials"
            categoryId="cleaning-essentials"
            products={PRODUCTS.filter((p) => p.categoryId === 'cleaning-essentials')}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={setSelectedProduct}
          />

          <CuratedSection
            title="Personal Care & Hygiene"
            categoryId="personal-care"
            products={PRODUCTS.filter((p) => p.categoryId === 'personal-care')}
            onSelectCategory={handleSelectCategory}
            onSelectProduct={setSelectedProduct}
          />
        </main>
      ) : (
        <CategoryPage
          categoryId={selectedCategoryId}
          onSelectCategory={(id) => setSelectedCategoryId(id)}
          onSelectProduct={setSelectedProduct}
        />
      )}

      {/* Footer */}
      <Footer onSelectCategory={handleSelectCategory} />

      {/* Mobile Sticky Navigation */}
      <MobileNav
        currentView={currentView}
        onNavigateHome={handleGoHome}
        onNavigateCategories={() => {
          setSelectedCategoryId('dairy-bread-eggs');
          setCurrentView('category');
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onSelectCategory={handleSelectCategory}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={setSelectedProduct}
      />

      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutSuccessOpen(true)}
      />

      <OrderSuccessModal
        isOpen={isCheckoutSuccessOpen}
        onClose={() => setIsCheckoutSuccessOpen(false)}
      />

      <LocationModal />

      <LoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </LocationProvider>
    </AuthProvider>
  );
}
