
import React from 'react';
import { cn } from '@/lib/utils';

interface ExerciseItemProps {
  name: string;
  reps: string;
  imageUrl: string;
  isPopular?: boolean;
  onClick: () => void;
  className?: string;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  name, 
  reps, 
  imageUrl, 
  isPopular = false, 
  onClick, 
  className = "" 
}) => {
  return (
    <div 
      onClick={onClick}
      className={cn(
        'flex items-center p-3 mb-4 rounded-nova',
        'bg-white/10 backdrop-blur-sm border border-white/40',
        'cursor-pointer transition-transform hover:scale-[1.02]',
        className
      )}
    >
      <div className="w-16 h-16 rounded-nova overflow-hidden mr-4 flex-shrink-0">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-poppins font-bold text-white text-shadow">{name}</h3>
        <p className="text-sm text-white/80">{reps}</p>
      </div>
      {isPopular && (
        <div className="ml-2 px-2 py-1 bg-gradient-to-r from-nova-gold to-nova-yellow rounded-full text-xs font-medium text-white text-shadow whitespace-nowrap">
          🔥 Popular
        </div>
      )}
    </div>
  );
};

export default ExerciseItem;
