
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelCard from '../components/LevelCard';
import GoldenButton from '../components/GoldenButton';
import { toast } from 'sonner';
import workoutLevels from '../data/workoutRoutines';

const LevelSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleLevelSelect = (levelId: string, index: number) => {
    setSelectedLevel(levelId);
    
    // Provide haptic feedback if available
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    // Show toast notification
    toast.success(`Nivel ${workoutLevels[index].title} seleccionado`);
    
    // Automatically proceed to routine after selection
    setShowConfetti(true);
      
    // Navigate after animation
    setTimeout(() => {
      navigate('/routine', { state: { levelIndex: index } });
    }, 800);
  };

  // Generate confetti elements when animation is triggered
  const renderConfetti = () => {
    if (!showConfetti) return null;
    
    return Array.from({ length: 50 }).map((_, i) => {
      const left = Math.random() * 100;
      const animationDuration = 1 + Math.random() * 1;
      const size = Math.random() * 10 + 5;
      
      const style = {
        left: `${left}%`,
        top: '-10px',
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: i % 3 === 0 ? '#E0E0E0' : i % 3 === 1 ? '#9F9EA1' : '#fdc3a1',
        animationDuration: `${animationDuration}s`,
      };
      
      return <div key={i} className="confetti animate-confetti" style={style} />;
    });
  };

  return (
    <div className="nova-gradient min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <h1 className="text-3xl font-poppins font-bold text-white text-shadow mb-10">
        Selecciona tu nivel
      </h1>
      
      <div className="grid grid-cols-1 gap-6 w-full max-w-md mb-10">
        {workoutLevels.map((level, index) => (
          <LevelCard
            key={level.id}
            title={level.title}
            emoji={level.emoji}
            description={level.description}
            onClick={() => handleLevelSelect(level.id, index)}
            className={selectedLevel === level.id ? 'ring-4 ring-white' : ''}
          />
        ))}
      </div>
      
      {renderConfetti()}
    </div>
  );
};

export default LevelSelectionScreen;
