import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { useAuth } from '../../context/AuthContext';
import { Stepper } from '../common/Stepper';
import { X, Clock, ShoppingBag, ShieldAlert, ArrowRight, Heart, CheckCircle2, ChevronRight } from 'lucide-react';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onProceedToCheckout }) => {
  const {
    items,
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
    closeCart,
    addItem,
    updateQuantity
  } = useCart();

  const { location, openLocationModal } = useLocation();
  const { isLoggedIn, openLoginModal } = useAuth();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 199;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      openLoginModal();
    } else {
      onProceedToCheckout();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-in Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F4F6FB] shadow-2xl flex flex-col justify-between animate-slide-in-right">
          
          {/* Header */}
          <div className="bg-white px-5 py-4 border-b border-gray-100 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-[#1C1C1C]">My Cart</h2>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {totalCount} {totalCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={closeCart}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {items.length === 0 ? (
              /* Empty Cart State */
              <div className="h-full flex flex-col items-center justify-center text-center p-8 mt-12">
                <div className="w-24 h-24 rounded-full bg-[#FFF8E1] border-2 border-[#F8CB46] flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-[#0C831F]" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1C1C1C]">You don't have any items in your cart</h3>
                <p className="text-xs text-gray-500 mt-2 max-w-[260px]">
                  Your favourite grocery items are just 10 minutes away.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-6 px-6 py-2.5 rounded-xl bg-[#0C831F] text-white text-xs font-bold hover:bg-[#096618] transition-colors shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                {/* Delivery Time and Address Pill */}
                <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#E8F5E9] flex items-center justify-center text-[#0C831F] shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-extrabold text-[#1C1C1C]">
                        Delivery in {location.deliveryTime}
                      </h4>
                      <p className="text-[11px] text-gray-500 truncate max-w-[200px]">
                        Shipment to: {location.title}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={openLocationModal}
                    className="text-xs font-bold text-[#0C831F] hover:underline"
                  >
                    Change
                  </button>
                </div>

                {/* Free Delivery Meter */}
                <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs">
                  {amountNeededForFreeDelivery > 0 ? (
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                        <span className="text-gray-700">
                          Add items worth <span className="text-[#0C831F] font-bold">₹{amountNeededForFreeDelivery}</span> more for FREE delivery
                        </span>
                        <span className="text-[11px] text-gray-400">₹{subtotal}/₹{freeDeliveryThreshold}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#0C831F] transition-all duration-300 rounded-full"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0C831F]">
                      <CheckCircle2 className="w-4 h-4 text-[#0C831F] shrink-0" />
                      <span>Congratulations! You've unlocked FREE Delivery</span>
                    </div>
                  )}
                </div>

                {/* Cart Items List */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs divide-y divide-gray-100">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Added Items ({totalCount})
                  </h3>

                  {items.map(({ product, quantity, selectedUnit }) => (
                    <div key={product.id} className="py-3 flex items-center justify-between gap-3">
                      {/* Image */}
                      <div className="w-14 h-14 rounded-xl border border-gray-100 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="text-xs font-semibold text-[#1C1C1C] truncate">
                          {product.name}
                        </h4>
                        <span className="text-[11px] text-gray-500 block">
                          {selectedUnit || product.unit}
                        </span>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className="text-xs font-extrabold text-[#1C1C1C]">
                            ₹{product.price * quantity}
                          </span>
                          {product.mrp > product.price && (
                            <span className="text-[10px] text-gray-400 line-through">
                              ₹{product.mrp * quantity}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="shrink-0">
                        <Stepper
                          quantity={quantity}
                          onAdd={() => addItem(product)}
                          onIncrement={() => updateQuantity(product.id, 1)}
                          onDecrement={() => updateQuantity(product.id, -1)}
                          size="sm"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery Tip Options */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-xs font-bold text-[#1C1C1C]">Delivery Partner Tip</h4>
                      <p className="text-[10px] text-gray-500">100% of the tip goes directly to your delivery partner</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    {[10, 20, 30, 50].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setTip(tip === amount ? 0 : amount)}
                        className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                          tip === amount
                            ? 'border-[#0C831F] bg-[#F7FFF9] text-[#0C831F]'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        ₹{amount}
                      </button>
                    ))}
                    {tip > 0 && (
                      <button
                        onClick={() => setTip(0)}
                        className="text-[10px] text-red-500 font-bold px-2 py-1"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>

                {/* Bill Details */}
                <div className="bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs space-y-2.5">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                    Bill Details
                  </h4>

                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Items Total</span>
                    <div className="flex items-center gap-1.5">
                      {totalMrp > subtotal && (
                        <span className="text-gray-400 line-through">₹{totalMrp}</span>
                      )}
                      <span className="font-semibold text-gray-900">₹{subtotal}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      Delivery Charge
                      <span className="text-[10px] text-gray-400">(Distance: 1.2 km)</span>
                    </span>
                    {deliveryFee === 0 ? (
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400 line-through text-[11px]">₹15</span>
                        <span className="font-bold text-[#0C831F]">FREE</span>
                      </div>
                    ) : (
                      <span className="font-semibold text-gray-900">₹{deliveryFee}</span>
                    )}
                  </div>

                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Handling Charge</span>
                    <span className="font-semibold text-gray-900">₹{handlingFee}</span>
                  </div>

                  {/* Feeding India */}
                  <div className="flex items-center justify-between text-xs text-gray-600 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feedingIndia}
                        onChange={(e) => setFeedingIndia(e.target.checked)}
                        className="rounded text-[#0C831F] focus:ring-[#0C831F]"
                      />
                      <span>Feeding India Donation</span>
                    </label>
                    <span className="font-semibold text-gray-900">₹{feedingIndia ? 1 : 0}</span>
                  </div>

                  {tip > 0 && (
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Delivery Tip</span>
                      <span className="font-semibold text-gray-900">₹{tip}</span>
                    </div>
                  )}

                  {/* Grand Total */}
                  <div className="pt-2.5 border-t border-gray-100 flex justify-between items-baseline">
                    <span className="text-sm font-black text-[#1C1C1C]">Grand Total</span>
                    <span className="text-base font-black text-[#1C1C1C]">₹{grandTotal}</span>
                  </div>

                  {savings > 0 && (
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 text-[11px] font-bold text-center mt-2">
                      🎉 You saved ₹{savings} on this order!
                    </div>
                  )}
                </div>

                {/* Cancellation Policy */}
                <div className="bg-white rounded-2xl p-3.5 border border-gray-200/80 shadow-xs flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-gray-500 leading-snug">
                    <span className="font-bold text-gray-700">Cancellation Policy: </span>
                    Orders cannot be cancelled once packed for delivery. In case of unexpected delay, a refund will be provided.
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sticky Bottom Bar */}
          {items.length > 0 && (
            <div className="bg-white p-4 border-t border-gray-200 shadow-lg shrink-0">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">
                    Total to pay
                  </span>
                  <span className="text-lg font-black text-[#1C1C1C]">₹{grandTotal}</span>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#0C831F] hover:bg-[#096618] active:scale-95 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span>{isLoggedIn ? 'Proceed to Pay' : 'Login to Proceed'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
