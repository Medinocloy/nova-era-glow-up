
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

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
        'flex items-center p-4 mb-6 rounded-lg',
        'bg-white dark:bg-gray-800 border border-[#dee2e6] dark:border-gray-700',
        'cursor-pointer card-hover ripple',
        className
      )}
    >
      <div className="w-16 h-16 rounded-lg overflow-hidden mr-4 flex-shrink-0 relative">
        {isImageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#e9ecef] dark:bg-gray-700">
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
        <h3 className="font-poppins font-semibold text-[#343a40] dark:text-white">{name}</h3>
        <p className="text-sm italic text-[#6c757d] dark:text-gray-300">{reps}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        {equipment && (
          <div className="w-8 h-8 rounded-full bg-[#e9ecef] dark:bg-gray-700 flex items-center justify-center">
            <span>{getEquipmentEmoji()}</span>
          </div>
        )}
        {isPopular && (
          <div className="px-2 py-1 bg-[#69db7c] dark:bg-emerald-700 rounded-full text-xs font-medium text-white whitespace-nowrap">
            🔥 Popular
          </div>
        )}
        <div className="w-8 h-8 rounded-full bg-[#4dabf7] flex items-center justify-center text-white">
          <Play size={16} />
        </div>
      </div>
    </div>
  );
};

export default ExerciseItem;
