
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause, Info } from 'lucide-react';
import IntensitySlider from '../components/IntensitySlider';
import GoldenButton from '../components/GoldenButton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import { Exercise } from '../data/workoutRoutines';

import workoutLevels from '../data/workoutRoutines';

const ExerciseDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [intensity, setIntensity] = useState(5);
  const [showWaveEffect, setShowWaveEffect] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [reps, setReps] = useState('');
  const touchStartX = useRef<number | null>(null);
  const doubleTabTimeout = useRef<NodeJS.Timeout | null>(null);
  const tapCount = useRef(0);
  
  // Find the exercise in all workout levels
  const findExercise = (): Exercise | undefined => {
    for (const level of workoutLevels) {
      for (const day of level.days) {
        const found = day.exercises.find(ex => ex.id === exerciseId);
        if (found) return found;
      }
    }
    return undefined;
  };
  
  const exercise = findExercise();
  
  useEffect(() => {
    if (exercise) {
      setReps(exercise.reps);
    }
  }, [exercise]);

  // Handle missing exercise ID
  if (!exerciseId || !exercise) {
    return (
      <div className="nova-gradient min-h-screen flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-poppins font-bold text-white text-shadow mb-4">
          Ejercicio no encontrado
        </h1>
        <GoldenButton onClick={() => navigate('/routine')}>
          Volver a rutina
        </GoldenButton>
      </div>
    );
  }
  
  const handleBack = () => {
    navigate('/routine');
  };
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleIntensityChange = (value: number) => {
    setIntensity(value);
  };
  
  const handleComplete = () => {
    setShowWaveEffect(true);
    
    // Play completion sound if available
    const audio = new Audio('/complete-sound.mp3');
    audio.play().catch(() => {
      // Silent fail if audio not available or autoplay blocked
    });
    
    // Reset wave effect after animation
    setTimeout(() => {
      setShowWaveEffect(false);
      toast.success('¡Ejercicio completado!');
      navigate('/routine');
    }, 1500);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    
    // Handle double tap detection
    tapCount.current += 1;
    
    if (tapCount.current === 1) {
      doubleTabTimeout.current = setTimeout(() => {
        tapCount.current = 0;
        doubleTabTimeout.current = null;
      }, 300);
    } else if (tapCount.current === 2) {
      // Double tap detected
      if (doubleTabTimeout.current) {
        clearTimeout(doubleTabTimeout.current);
      }
      
      // Mark exercise as completed
      handleComplete();
      tapCount.current = 0;
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    // Reset double tap detection on move
    if (tapCount.current > 0) {
      tapCount.current = 0;
      if (doubleTabTimeout.current) {
        clearTimeout(doubleTabTimeout.current);
        doubleTabTimeout.current = null;
      }
    }
    
    if (!touchStartX.current) return;
    
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // If swipe is significant, navigate
    if (Math.abs(diff) > 50) {
      touchStartX.current = null;
      navigate('/routine'); // Go back to routine screen on any swipe
    }
  };
  
  const handleTouchEnd = () => {
    touchStartX.current = null;
  };
  
  const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReps(e.target.value);
  };

  const getEquipmentEmoji = () => {
    switch(exercise.equipment) {
      case 'weights': return '🏋️‍♂️';
      case 'bodyweight': return '🤸‍♀️';
      case 'machine': return '🏋️‍♀️';
      default: return '🏋️';
    }
  };

  return (
    <div 
      className={`nova-gradient min-h-screen flex flex-col ${showWaveEffect ? 'animate-wave' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Header with back button */}
      <header className="pt-12 pb-4 px-4 flex items-center">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="flex-1 text-xl font-poppins font-bold text-white text-shadow text-center ml-2">
          {exercise.name}
        </h1>
        <div className="p-2">
          {/* Placeholder for dark mode toggle in future */}
        </div>
      </header>
      
      {/* Exercise GIF */}
      <div className="relative">
        <div className="aspect-video max-h-64 w-full bg-black/20 overflow-hidden">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="text-5xl animate-pulse">{getEquipmentEmoji()}</div>
            </div>
          )}
          <img 
            src={exercise.image} 
            alt={exercise.name} 
            className="w-full h-full object-cover"
            onLoad={handleImageLoad}
            style={{ opacity: isImageLoading ? 0 : 1 }}
          />
        </div>
        
        {/* Playback controls */}
        <div className="absolute bottom-4 right-4 bg-black/30 rounded-full p-2" onClick={togglePlayPause}>
          {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white" />}
        </div>
      </div>
      
      {/* Exercise info */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-poppins font-bold text-lg text-white text-shadow">Instrucciones</h2>
          <div className="flex items-center">
            <input
              type="text"
              value={reps}
              onChange={handleRepsChange}
              className="w-20 px-3 py-1 bg-white/20 rounded-full text-sm text-center text-white"
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="ml-2 text-white/80 hover:text-white">
                    <Info size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white border-gray-700">
                  <p>Edita las series y repeticiones</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {/* Steps */}
        <div className="mb-6 bg-white/10 p-4 rounded-nova">
          {exercise.steps.map((step) => (
            <div key={step.step} className="flex mb-3 last:mb-0">
              <div className="mr-3 font-bold text-xl">{step.emoji}</div>
              <div className="text-left text-white">
                {step.description}
              </div>
            </div>
          ))}
        </div>
        
        {/* Muscle groups */}
        <div className="mb-6">
          <h3 className="text-left text-sm text-white/80 mb-1">Grupos musculares</h3>
          <p className="text-left text-white">{exercise.muscleGroups}</p>
        </div>
        
        {/* Intensity slider */}
        <div className="mb-6 bg-white/10 p-4 rounded-nova">
          <IntensitySlider 
            onChange={handleIntensityChange}
            initialValue={intensity}
          />
        </div>

        {/* Exercise tips */}
        {exercise.tips && (
          <div className="mb-6 bg-white/10 p-3 rounded-nova">
            <div className="flex items-start">
              <span className="text-xl mr-2">💡</span>
              <p className="text-left text-white text-sm">{exercise.tips}</p>
            </div>
          </div>
        )}
      </div>
      
      {/* Action button */}
      <div className="p-4">
        <GoldenButton 
          onClick={handleComplete}
          fullWidth
        >
          Completar Ejercicio
        </GoldenButton>
      </div>
    </div>
  );
};

export default ExerciseDetailScreen;
