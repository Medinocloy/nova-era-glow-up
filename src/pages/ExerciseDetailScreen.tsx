
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Play, Pause } from 'lucide-react';
import IntensitySlider from '../components/IntensitySlider';
import GoldenButton from '../components/GoldenButton';

// Mock data for exercises
const exercisesData = {
  'ex1': {
    id: 'ex1',
    name: 'Press de banca',
    gifUrl: 'https://source.unsplash.com/random/400x300/?gym,bench-press',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Acuéstate en el banco horizontal.' },
      { step: 2, emoji: '2️⃣', description: 'Agarra la barra con las manos a la anchura de los hombros.' },
      { step: 3, emoji: '3️⃣', description: 'Baja la barra hasta tocar ligeramente el pecho.' },
      { step: 4, emoji: '4️⃣', description: 'Empuja hacia arriba hasta que los brazos estén extendidos.' },
    ],
    reps: '12x3',
    muscleGroups: 'Pecho, Tríceps, Hombros',
  },
  'ex2': {
    id: 'ex2',
    name: 'Press inclinado',
    gifUrl: 'https://source.unsplash.com/random/400x300/?gym,incline-press',
    steps: [
      { step: 1, emoji: '1️⃣', description: 'Acuéstate en banco inclinado a 45°.' },
      { step: 2, emoji: '2️⃣', description: 'Agarra las mancuernas a los lados.' },
      { step: 3, emoji: '3️⃣', description: 'Empuja hacia arriba hasta extender los brazos.' },
      { step: 4, emoji: '4️⃣', description: 'Baja lentamente controlando el peso.' },
    ],
    reps: '12x3',
    muscleGroups: 'Pecho superior, Hombros',
  },
  // Add more exercises as needed
};

const ExerciseDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [intensity, setIntensity] = useState(5);
  const [showWaveEffect, setShowWaveEffect] = useState(false);
  
  // Handle missing exercise ID
  if (!exerciseId || !exercisesData[exerciseId as keyof typeof exercisesData]) {
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
  
  const exercise = exercisesData[exerciseId as keyof typeof exercisesData];
  
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
    
    // Reset wave effect after animation
    setTimeout(() => {
      setShowWaveEffect(false);
      navigate('/routine');
    }, 1500);
  };

  return (
    <div className={`nova-gradient min-h-screen flex flex-col ${showWaveEffect ? 'animate-wave' : ''}`}>
      {/* Header with back button */}
      <header className="pt-12 pb-4 px-4 flex items-center">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="flex-1 text-xl font-poppins font-bold text-white text-shadow text-center ml-2">
          {exercise.name}
        </h1>
      </header>
      
      {/* Exercise GIF */}
      <div className="relative">
        <div className="aspect-video max-h-64 w-full bg-black/20 overflow-hidden">
          <img 
            src={exercise.gifUrl} 
            alt={exercise.name} 
            className="w-full h-full object-cover"
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
          <div className="px-3 py-1 bg-white/20 rounded-full text-sm">
            {exercise.reps}
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
