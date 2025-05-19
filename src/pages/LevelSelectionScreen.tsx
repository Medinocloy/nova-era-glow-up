
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LevelCard from '../components/LevelCard';
import GoldenButton from '../components/GoldenButton';
import { workoutLevels } from '../data/workoutRoutines';
import { Activity } from 'lucide-react';

const LevelSelectionScreen = () => {
  const navigate = useNavigate();
  
  const handleLevelSelect = (levelIndex: number) => {
    // Navigate to routine screen with the selected level index
    navigate('/routine', { state: { levelIndex } });
    
    // Play confetti sound effect if available
    try {
      new Audio('/confetti-sound.mp3').play();
    } catch (e) {
      // Silent fail if audio not available or autoplay blocked
    }
  };
  
  const handleTechnicalAnalysis = () => {
    navigate('/technical-analysis');
  };
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-poppins font-bold mb-2">Selecciona tu Nivel</h1>
        <p className="text-gray-600 dark:text-gray-300">Escoge el nivel de entrenamiento que mejor se ajuste a ti</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        {workoutLevels.map((level, index) => (
          <LevelCard
            key={level.id}
            title={level.title}
            emoji={level.emoji}
            description={level.description}
            onClick={() => handleLevelSelect(index)}
          />
        ))}
      </div>
      
      <div className="mt-6">
        <GoldenButton
          onClick={handleTechnicalAnalysis}
          className="flex items-center justify-center gap-2 bg-white/20 mx-auto"
        >
          <Activity size={18} />
          Análisis Técnico Avanzado
        </GoldenButton>
      </div>
    </div>
  );
};

export default LevelSelectionScreen;
