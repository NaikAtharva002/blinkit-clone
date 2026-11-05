import React from 'react';
import { Plus, Minus } from 'lucide-react';

interface StepperProps {
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
  size = 'md',
  fullWidth = false
}) => {
  if (quantity === 0) {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAdd();
        }}
        className={`flex items-center justify-center font-bold uppercase transition-all duration-150 rounded-lg border border-[#0C831F] bg-[#F7FFF9] text-[#0C831F] hover:bg-[#0C831F] hover:text-white active:scale-95 shadow-sm ${
          size === 'sm'
            ? 'h-7 px-3 text-[11px]'
            : size === 'lg'
            ? 'h-11 px-6 text-sm font-extrabold tracking-wide'
            : 'h-8 px-4 text-xs tracking-wider'
        } ${fullWidth ? 'w-full' : 'min-w-[66px]'}`}
        aria-label="Add to cart"
      >
        ADD
      </button>
    );
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex items-center justify-between rounded-lg bg-[#0C831F] text-white font-bold transition-all shadow-sm select-none ${
        size === 'sm'
          ? 'h-7 px-1.5 text-xs min-w-[66px]'
          : size === 'lg'
          ? 'h-11 px-3 text-base min-w-[120px]'
          : 'h-8 px-2 text-xs min-w-[76px]'
      } ${fullWidth ? 'w-full' : ''}`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDecrement();
        }}
        className="flex items-center justify-center p-1 hover:bg-[#096618] active:scale-90 rounded transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} strokeWidth={3} />
      </button>

      <span className="font-extrabold px-1 tracking-tight text-center">{quantity}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onIncrement();
        }}
        className="flex items-center justify-center p-1 hover:bg-[#096618] active:scale-90 rounded transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className={size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'} strokeWidth={3} />
      </button>
    </div>
  );
};
