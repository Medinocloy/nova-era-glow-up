
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProgressCircle from '../components/ProgressCircle';
import ExerciseItem from '../components/ExerciseItem';
import GoldenButton from '../components/GoldenButton';

// Mock data
const routineData = {
  days: [
    { 
      id: 'monday', 
      name: 'Lunes', 
      focus: 'Pecho/Hombros', 
      progress: 0.6,
      exercises: [
        { id: 'ex1', name: 'Press de banca', reps: '12x3', image: 'https://source.unsplash.com/random/200x200/?gym,chest', isPopular: true },
        { id: 'ex2', name: 'Press inclinado', reps: '12x3', image: 'https://source.unsplash.com/random/200x200/?gym,incline', isPopular: false },
        { id: 'ex3', name: 'Aperturas', reps: '15x3', image: 'https://source.unsplash.com/random/200x200/?gym,flys', isPopular: false },
        { id: 'ex4', name: 'Press militar', reps: '10x4', image: 'https://source.unsplash.com/random/200x200/?gym,shoulder', isPopular: true },
        { id: 'ex5', name: 'Elevaciones laterales', reps: '12x3', image: 'https://source.unsplash.com/random/200x200/?gym,lateral', isPopular: false },
      ]
    },
    { 
      id: 'wednesday', 
      name: 'Miércoles', 
      focus: 'Espalda/Biceps', 
      progress: 0.2,
      exercises: [
        { id: 'ex6', name: 'Dominadas', reps: '8x4', image: 'https://source.unsplash.com/random/200x200/?gym,pullup', isPopular: true },
        { id: 'ex7', name: 'Remo', reps: '12x3', image: 'https://source.unsplash.com/random/200x200/?gym,row', isPopular: true },
        { id: 'ex8', name: 'Curl de biceps', reps: '12x3', image: 'https://source.unsplash.com/random/200x200/?gym,bicep', isPopular: false },
      ]
    },
    { 
      id: 'friday', 
      name: 'Viernes', 
      focus: 'Piernas/Core', 
      progress: 0.0,
      exercises: [
        { id: 'ex9', name: 'Sentadillas', reps: '12x4', image: 'https://source.unsplash.com/random/200x200/?gym,squat', isPopular: true },
        { id: 'ex10', name: 'Peso muerto', reps: '10x4', image: 'https://source.unsplash.com/random/200x200/?gym,deadlift', isPopular: true },
        { id: 'ex11', name: 'Plancha', reps: '60s x3', image: 'https://source.unsplash.com/random/200x200/?gym,plank', isPopular: false },
        { id: 'ex12', name: 'Crunch', reps: '20x3', image: 'https://source.unsplash.com/random/200x200/?gym,crunch', isPopular: false },
      ]
    },
  ]
};

const DailyRoutineScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const currentDay = routineData.days[currentDayIndex];

  const handleNextDay = () => {
    if (currentDayIndex < routineData.days.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const handlePrevDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const handleExerciseClick = (exerciseId: string) => {
    navigate(`/exercise/${exerciseId}`);
  };

  const handleGoToWeeklyProgress = () => {
    navigate('/progress');
  };

  // Handle swipe gestures
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
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
    
    if (isLeftSwipe && currentDayIndex < routineData.days.length - 1) {
      handleNextDay();
    }
    
    if (isRightSwipe && currentDayIndex > 0) {
      handlePrevDay();
    }
    
    setTouchEnd(null);
    setTouchStart(null);
  };

  const currentProgress = currentDay.progress;
  const completedCount = Math.round(currentDay.exercises.length * currentProgress);

  return (
    <div 
      className="nova-gradient min-h-screen flex flex-col overflow-hidden"
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
        
        <div className="flex-1 text-right">
          <button 
            onClick={handleNextDay}
            disabled={currentDayIndex === routineData.days.length - 1}
            className={`p-2 ${currentDayIndex === routineData.days.length - 1 ? 'opacity-30' : ''}`}
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
          <ExerciseItem
            key={exercise.id}
            name={exercise.name}
            reps={exercise.reps}
            imageUrl={exercise.image}
            isPopular={exercise.isPopular}
            onClick={() => handleExerciseClick(exercise.id)}
          />
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
