
import React from 'react';
import { cn } from '@/lib/utils';

interface GoldenButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

const GoldenButton: React.FC<GoldenButtonProps> = ({ 
  onClick, 
  children, 
  className = "",
  fullWidth = false
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'nova-button-gradient relative px-6 py-3 rounded-nova border-2',
        'font-poppins font-bold text-white text-shadow shadow-nova',
        'transition-transform duration-300 ease-out hover:scale-105',
        'active:scale-95',
        'border-nova-darkGray/30 dark:border-gray-600', 
        fullWidth ? 'w-full' : '',
        className
      )}
    >
      {children}
    </button>
  );
};

export default GoldenButton;
