
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LevelCard from '../components/LevelCard';
import GoldenButton from '../components/GoldenButton';

const LevelSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const levels = [
    {
      id: 'beginner',
      title: 'Principiante',
      emoji: '🌱',
      description: '3 días/semana',
    },
    {
      id: 'intermediate',
      title: 'Intermedio',
      emoji: '💪',
      description: '5 días/semana',
    },
    {
      id: 'advanced',
      title: 'Avanzado',
      emoji: '🚀',
      description: 'Retos extremos',
    },
  ];

  const handleLevelSelect = (levelId: string) => {
    setSelectedLevel(levelId);
  };

  const handleConfirm = () => {
    if (selectedLevel) {
      // Show confetti animation
      setShowConfetti(true);
      
      // Navigate after animation
      setTimeout(() => {
        navigate('/routine');
      }, 800);
    }
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
        backgroundColor: i % 3 === 0 ? '#eebf24' : i % 3 === 1 ? '#f7c16a' : '#fdc3a1',
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
        {levels.map((level) => (
          <LevelCard
            key={level.id}
            title={level.title}
            emoji={level.emoji}
            description={level.description}
            onClick={() => handleLevelSelect(level.id)}
            className={selectedLevel === level.id ? 'ring-4 ring-white' : ''}
          />
        ))}
      </div>
      
      <GoldenButton 
        onClick={handleConfirm} 
        className={`${!selectedLevel ? 'opacity-50 pointer-events-none' : ''}`}
        fullWidth
      >
        Comenzar
      </GoldenButton>
      
      {renderConfetti()}
    </div>
  );
};

export default LevelSelectionScreen;
