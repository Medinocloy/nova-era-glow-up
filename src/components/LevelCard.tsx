
import React from 'react';
import { cn } from '@/lib/utils';

interface LevelCardProps {
  title: string;
  emoji: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const LevelCard: React.FC<LevelCardProps> = ({ 
  title, 
  emoji, 
  description, 
  onClick, 
  className = "" 
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        'flex flex-col items-center justify-center p-6 rounded-lg',
        'bg-white dark:bg-gray-800 border border-[#dee2e6] dark:border-gray-700',
        'shadow-sm card-hover cursor-pointer ripple',
        className
      )}
    >
      <div className="text-4xl mb-4">{emoji}</div>
      <h3 className="font-poppins font-semibold text-xl mb-2 text-[#343a40] dark:text-white">{title}</h3>
      <p className="text-sm text-[#6c757d] dark:text-gray-300 font-inter">{description}</p>
    </div>
  );
};

export default LevelCard;
