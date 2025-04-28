
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface IntensitySliderProps {
  onChange?: (value: number) => void;
  className?: string;
  initialValue?: number;
}

const IntensitySlider: React.FC<IntensitySliderProps> = ({
  onChange,
  className = "",
  initialValue = 5
}) => {
  const [value, setValue] = useState(initialValue);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Calculate background gradient based on value
  const getBackgroundStyle = () => {
    const percent = ((value - 1) / 9) * 100;
    return {
      background: `linear-gradient(to right, #eebf24 0%, #eebf24 ${percent}%, rgba(255, 255, 255, 0.3) ${percent}%, rgba(255, 255, 255, 0.3) 100%)`,
    };
  };

  // Get emoji based on value
  const getEmoji = () => {
    if (value <= 2) return "😪";
    if (value <= 4) return "😌";
    if (value <= 6) return "😓";
    if (value <= 8) return "😰";
    return "🔥";
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">Intensidad</span>
        <span className="text-xl">{getEmoji()}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={handleChange}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={getBackgroundStyle()}
        />
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <span>1</span>
        <span>5</span>
        <span>10</span>
      </div>
    </div>
  );
};

export default IntensitySlider;
