
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
        'flex flex-col items-center justify-center p-6 rounded-nova',
        'bg-white/20 backdrop-blur-sm border-2 border-white',
        'shadow-nova cursor-pointer text-white text-shadow',
        'transition-transform duration-300 hover:scale-105',
        className
      )}
    >
      <div className="text-4xl mb-2">{emoji}</div>
      <h3 className="font-poppins font-bold text-xl mb-1">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
};

export default LevelCard;
