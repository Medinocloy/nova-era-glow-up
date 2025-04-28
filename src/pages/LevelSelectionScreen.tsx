
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LevelCard from '../components/LevelCard';
import GoldenButton from '../components/GoldenButton';
import { workoutLevels } from '../data/workoutRoutines';
import { Activity, Sun, Moon } from 'lucide-react';

const LevelSelectionScreen = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
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
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };
  
  return (
    <div className={`nova-gradient min-h-screen flex flex-col p-6 ${isDarkMode ? 'dark' : ''}`}>
      <header className="flex justify-between items-center pt-8">
        <h1 className="text-3xl font-poppins font-semibold text-[#343a40] dark:text-white">
          NOVA ERA
        </h1>
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-colors"
        >
          {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-[#495057]" />}
        </button>
      </header>
      
      <p className="text-[#495057] dark:text-white/90 mt-1 mb-10 font-inter">
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
          className="flex items-center justify-center gap-2 bg-[#4dabf7] hover:bg-[#74c0fc] text-white transition-colors ripple"
        >
          <Activity size={18} />
          Análisis Técnico Avanzado
        </GoldenButton>
      </div>
    </div>
  );
};

export default LevelSelectionScreen;
