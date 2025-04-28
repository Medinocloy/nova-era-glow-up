
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Moon, Sun } from 'lucide-react';
import ProgressCircle from '../components/ProgressCircle';
import ExerciseItem from '../components/ExerciseItem';
import GoldenButton from '../components/GoldenButton';
import workoutLevels from '../data/workoutRoutines';
import { toast } from 'sonner';

const DailyRoutineScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0); // Default to beginner
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Use location state if available (from level selection)
  React.useEffect(() => {
    if (location.state?.levelIndex !== undefined) {
      setCurrentLevelIndex(location.state.levelIndex);
    }
  }, [location]);
  
  const currentLevel = workoutLevels[currentLevelIndex];
  const currentDay = currentLevel.days[currentDayIndex];

  const handleNextDay = () => {
    if (currentDayIndex < currentLevel.days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
      // Play sound effect if available
      try {
        new Audio('/swipe-sound.mp3').play();
      } catch (e) {
        // Silent fail if sound can't be played
      }
    }
  };

  const handlePrevDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
      // Play sound effect if available
      try {
        new Audio('/swipe-sound.mp3').play();
      } catch (e) {
        // Silent fail if sound can't be played
      }
    }
  };

  const handleExerciseClick = (exerciseId: string) => {
    navigate(`/exercise/${exerciseId}`);
  };
  
  const handleExerciseLongPress = (exerciseTip: string | undefined) => {
    if (exerciseTip) {
      toast.info(exerciseTip, {
        duration: 3000,
        position: 'bottom-center'
      });
    }
  };

  const handleGoToWeeklyProgress = () => {
    navigate('/progress');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  // Handle swipe gestures
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const longPressExercise = useRef<string | undefined>(undefined);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && currentDayIndex < currentLevel.days.length - 1) {
      handleNextDay();
    }
    
    if (isRightSwipe && currentDayIndex > 0) {
      handlePrevDay();
    }
    
    setTouchEnd(null);
    setTouchStart(null);
  };
  
  // Exercise item long press handling
  const handleExerciseTouchStart = (exerciseId: string, tip: string | undefined) => {
    longPressExercise.current = tip;
    longPressTimer.current = setTimeout(() => {
      if (longPressExercise.current) {
        handleExerciseLongPress(longPressExercise.current);
      }
    }, 500); // 500ms for long press
  };
  
  const handleExerciseTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const currentProgress = currentDay.progress;
  const completedCount = Math.round(currentDay.exercises.length * currentProgress);

  return (
    <div 
      className={`nova-gradient min-h-screen flex flex-col overflow-hidden ${isDarkMode ? 'dark' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header */}
      <header className="pt-12 pb-4 px-4 flex items-center justify-between">
        <div className="flex-1 text-left">
          <button 
            onClick={handlePrevDay}
            disabled={currentDayIndex === 0}
            className={`p-2 ${currentDayIndex === 0 ? 'opacity-30' : ''}`}
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
        </div>
        
        <div className="flex-1 text-center">
          <h1 className="text-xl font-poppins font-bold text-white text-shadow">
            {currentDay.name}
          </h1>
          <p className="text-sm text-white/80">{currentDay.focus}</p>
        </div>
        
        <div className="flex-1 text-right flex justify-end">
          <button 
            onClick={toggleDarkMode}
            className="p-2 mr-1"
          >
            {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
          </button>
          <button 
            onClick={handleNextDay}
            disabled={currentDayIndex === currentLevel.days.length - 1}
            className={`p-2 ${currentDayIndex === currentLevel.days.length - 1 ? 'opacity-30' : ''}`}
          >
            <ArrowRight size={24} className="text-white" />
          </button>
        </div>
      </header>
      
      {/* Progress circle */}
      <div className="flex justify-center -mt-2 mb-2">
        <ProgressCircle 
          progress={currentProgress} 
          size={80} 
          strokeWidth={6}
        />
        <div className="absolute mt-16 text-sm text-white/90">
          {completedCount}/{currentDay.exercises.length} ejercicios
        </div>
      </div>
      
      {/* Exercise list */}
      <div className="flex-1 px-4 pb-24 overflow-y-auto hide-scrollbar">
        <h2 className="text-lg font-poppins font-semibold text-white text-shadow text-left mb-4">
          Ejercicios de hoy
        </h2>
        
        {currentDay.exercises.map((exercise) => (
          <div 
            key={exercise.id}
            onTouchStart={() => handleExerciseTouchStart(exercise.id, exercise.tips)}
            onTouchEnd={handleExerciseTouchEnd}
            onTouchCancel={handleExerciseTouchEnd}
          >
            <ExerciseItem
              name={exercise.name}
              reps={exercise.reps}
              imageUrl={exercise.image}
              isPopular={exercise.isPopular}
              equipment={exercise.equipment}
              onClick={() => handleExerciseClick(exercise.id)}
            />
          </div>
        ))}
      </div>
      
      {/* Bottom action button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <GoldenButton 
          onClick={handleGoToWeeklyProgress}
          fullWidth
        >
          Ver Progreso Semanal
        </GoldenButton>
      </div>
    </div>
  );
};

export default DailyRoutineScreen;
