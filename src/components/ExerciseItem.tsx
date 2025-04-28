
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ExerciseItemProps {
  name: string;
  reps: string;
  imageUrl: string;
  isPopular?: boolean;
  equipment?: 'weights' | 'bodyweight' | 'machine';
  onClick: () => void;
  className?: string;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ 
  name, 
  reps, 
  imageUrl, 
  isPopular = false,
  equipment,
  onClick, 
  className = "" 
}) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  
  const handleImageLoad = () => {
    setIsImageLoading(false);
  };
  
  const getEquipmentEmoji = () => {
    switch(equipment) {
      case 'weights': return '🏋️‍♂️';
      case 'bodyweight': return '🤸‍♀️';
      case 'machine': return '🏋️‍♀️';
      default: return '🏋️';
    }
  };

  return (
    <div 
      onClick={onClick}
      className={cn(
        'flex items-center p-3 mb-4 rounded-nova',
        'bg-white/10 backdrop-blur-sm border border-white/40',
        'cursor-pointer transition-transform hover:scale-[1.02]',
        'dark:bg-gray-800/30 dark:border-gray-700/40',
        className
      )}
    >
      <div className="w-16 h-16 rounded-nova overflow-hidden mr-4 flex-shrink-0 relative">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <div className="text-2xl">{getEquipmentEmoji()}</div>
          </div>
        )}
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          style={{ opacity: isImageLoading ? 0 : 1 }}
        />
      </div>
      <div className="flex-1 text-left">
        <h3 className="font-poppins font-bold text-white text-shadow">{name}</h3>
        <p className="text-sm text-white/80">{reps}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        {equipment && (
          <div className="w-8 h-8 rounded-full bg-white/10 dark:bg-gray-700/50 flex items-center justify-center">
            <span>{getEquipmentEmoji()}</span>
          </div>
        )}
        {isPopular && (
          <div className="px-2 py-1 bg-gradient-to-r from-nova-gold to-nova-yellow rounded-full text-xs font-medium text-white text-shadow whitespace-nowrap dark:from-amber-700 dark:to-amber-600">
            🔥 Popular
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseItem;
