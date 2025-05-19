
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
      <div className="text-center mb-12">
        <h1 className="text-3xl font-gothic uppercase tracking-wider mb-2">Selecciona tu Nivel</h1>
        <div className="gothic-divider"></div>
        <p className="text-nova-gold mt-4">Escoge el nivel de entrenamiento que mejor se ajuste a ti</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8">
        {workoutLevels.map((level, index) => (
          <div key={level.id} className="gothic-card hover:border-nova-red transition-all duration-300">
            <LevelCard
              key={level.id}
              title={level.title}
              emoji={level.emoji}
              description={level.description}
              onClick={() => handleLevelSelect(index)}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-6">
        <GoldenButton
          onClick={handleTechnicalAnalysis}
          className="flex items-center justify-center gap-2 mx-auto"
          variant="gold"
        >
          <Activity size={18} />
          Análisis Técnico Avanzado
        </GoldenButton>
      </div>
    </div>
  );
};

export default LevelSelectionScreen;
