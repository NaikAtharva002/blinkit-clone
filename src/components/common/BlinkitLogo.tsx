import React from 'react';

interface BlinkitLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'colored' | 'monochrome';
}

export const BlinkitLogo: React.FC<BlinkitLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'colored'
}) => {
  const sizeClasses = {
    sm: 'h-6 text-xl',
    md: 'h-8 text-2xl md:text-3xl',
    lg: 'h-11 text-4xl'
  };

  return (
    <div className={`flex items-center select-none font-black tracking-tight ${sizeClasses[size]} ${className}`}>
      {/* Official Blinkit styling: 'blink' in bold black/dark-charcoal with yellow accent or yellow text, 'it' in Blinkit green */}
      <span className="text-[#F8CB46] font-black drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]">
        blink
      </span>
      <span className="text-[#0C831F] font-black">
        it
      </span>
    </div>
  );
};
