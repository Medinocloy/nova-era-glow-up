
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
    <div className="nova-gradient min-h-screen flex flex-col p-6">
      <h1 className="text-3xl font-poppins font-bold text-white text-shadow text-center mt-12 mb-2">
        NOVA ERA
      </h1>
      <p className="text-white/90 text-center mb-10">
        Selecciona tu nivel de entrenamiento
      </p>
      
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
      
      <div className="mt-auto">
        <GoldenButton
          onClick={handleTechnicalAnalysis}
          className="flex items-center justify-center gap-2 bg-white/20"
        >
          <Activity size={18} />
          Análisis Técnico Avanzado
        </GoldenButton>
      </div>
    </div>
  );
};

export default LevelSelectionScreen;
