import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useLocation } from '../../context/LocationContext';
import { CheckCircle2, Clock, MapPin, PackageCheck, Bike, ArrowRight } from 'lucide-react';

interface OrderSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ isOpen, onClose }) => {
  const { clearCart, items, grandTotal } = useCart();
  const { location } = useLocation();

  const [step, setStep] = useState(1);
  const [orderId] = useState(() => 'BLK-' + Math.floor(100000 + Math.random() * 900000));

  useEffect(() => {
    if (isOpen) {
      const timer1 = setTimeout(() => setStep(2), 2500);
      const timer2 = setTimeout(() => setStep(3), 5000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinish = () => {
    clearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative animate-slide-in-right overflow-hidden text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top green glow */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[#0C831F]">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <span className="text-xs font-bold text-[#0C831F] bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider">
          Order Confirmed
        </span>

        <h2 className="text-2xl font-black text-[#1C1C1C] mt-2">
          Arriving in 9 minutes!
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Order ID: <span className="font-mono font-bold text-gray-700">{orderId}</span>
        </p>

        {/* Live Delivery Tracker */}
        <div className="bg-[#F8F9FA] rounded-2xl p-4 my-6 text-left border border-gray-100">
          <div className="flex items-center justify-between text-xs font-extrabold mb-3">
            <span className="text-gray-900">Live Delivery Status</span>
            <span className="text-[#0C831F] flex items-center gap-1 font-bold">
              <Clock className="w-3.5 h-3.5" /> 9 mins
            </span>
          </div>

          <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-200">
            {/* Step 1 */}
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-7 h-7 rounded-full bg-[#0C831F] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                ✓
              </div>
              <div className="text-xs">
                <p className="font-bold text-gray-800">Order Placed & Confirmed</p>
                <p className="text-[10px] text-gray-400">Payment of ₹{grandTotal} received via UPI</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3 relative z-10">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs transition-colors ${
                step >= 2 ? 'bg-[#0C831F] text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {step >= 2 ? '✓' : <PackageCheck className="w-3.5 h-3.5" />}
              </div>
              <div className="text-xs">
                <p className={`font-bold ${step >= 2 ? 'text-gray-800' : 'text-gray-400'}`}>
                  Packing at Blinkit Dark Store
                </p>
                <p className="text-[10px] text-gray-400">South City 2 Dark Store (0.8 km away)</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3 relative z-10">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-xs transition-colors ${
                step >= 3 ? 'bg-[#0C831F] text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                <Bike className="w-3.5 h-3.5" />
              </div>
              <div className="text-xs">
                <p className={`font-bold ${step >= 3 ? 'text-gray-800' : 'text-gray-400'}`}>
                  Delivery Partner Assigned
                </p>
                <p className="text-[10px] text-gray-400">Ramesh Kumar is picking up your bag</p>
              </div>
            </div>
          </div>
        </div>

        {/* Address preview */}
        <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-xl mb-6 text-left">
          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
          <span className="truncate">Delivering to: <strong className="text-gray-800">{location.title}</strong>, {location.city}</span>
        </div>

        {/* Action button */}
        <button
          onClick={handleFinish}
          className="w-full py-3.5 rounded-xl bg-[#0C831F] hover:bg-[#096618] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
