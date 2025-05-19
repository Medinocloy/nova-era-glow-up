
import React from 'react';
import { cn } from '@/lib/utils';

interface GoldenButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  variant?: 'red' | 'gold';
  disabled?: boolean;
}

const GoldenButton: React.FC<GoldenButtonProps> = ({ 
  onClick, 
  children, 
  className = "",
  fullWidth = false,
  variant = 'red',
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'relative px-6 py-3 border font-poppins uppercase tracking-wider',
        'text-white text-shadow shadow-nova transition-colors duration-300',
        'hover:animate-glowing active:scale-95',
        variant === 'red' ? 'nova-button-gradient border-nova-red/40' : 'nova-gold-gradient border-nova-gold/40',
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : '',
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
    </button>
  );
};

export default GoldenButton;
