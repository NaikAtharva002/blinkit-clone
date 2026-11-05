import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, unit?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  totalCount: number;
  subtotal: number;
  totalMrp: number;
  savings: number;
  deliveryFee: number;
  handlingFee: number;
  feedingIndia: boolean;
  setFeedingIndia: (val: boolean) => void;
  tip: number;
  setTip: (val: number) => void;
  grandTotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  lastAddedProduct: Product | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'blinkit_cart_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [feedingIndia, setFeedingIndia] = useState(true);
  const [tip, setTip] = useState(0);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (product: Product, unit?: string) => {
    setLastAddedProduct(product);
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1, selectedUnit: unit || item.selectedUnit }
            : item
        );
      }
      return [...prev, { product, quantity: 1, selectedUnit: unit || product.unit }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce((sum, item) => {
    // If pack size selected, we calculate based on pack price if available
    return sum + item.product.price * item.quantity;
  }, 0);

  const totalMrp = items.reduce((sum, item) => {
    return sum + item.product.mrp * item.quantity;
  }, 0);

  const savings = Math.max(0, totalMrp - subtotal);
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 199 ? 0 : 15;
  const handlingFee = subtotal > 0 ? 4 : 0;
  const grandTotal = subtotal + deliveryFee + handlingFee + (subtotal > 0 && feedingIndia ? 1 : 0) + tip;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
        totalCount,
        subtotal,
        totalMrp,
        savings,
        deliveryFee,
        handlingFee,
        feedingIndia,
        setFeedingIndia,
        tip,
        setTip,
        grandTotal,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        lastAddedProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
