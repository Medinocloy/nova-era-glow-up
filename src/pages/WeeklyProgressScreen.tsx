
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import WeeklyProgressGraph from '../components/WeeklyProgressGraph';
import GoldenButton from '../components/GoldenButton';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock data
const weekData = [
  { day: 'monday', date: 'Lun 15', completed: true, percentage: 100 },
  { day: 'tuesday', date: 'Mar 16', completed: true, percentage: 80 },
  { day: 'wednesday', date: 'Mie 17', completed: true, percentage: 100 },
  { day: 'thursday', date: 'Jue 18', completed: false, percentage: 60 },
  { day: 'friday', date: 'Vie 19', completed: false, percentage: 0 },
  { day: 'saturday', date: 'Sab 20', completed: false, percentage: 0 },
  { day: 'sunday', date: 'Dom 21', completed: false, percentage: 0 },
];

const badges = [
  { id: 'streak', title: '3 días seguidos', emoji: '🔥', description: '¡Sigue así!' },
  { id: 'chest', title: 'Maestro del pecho', emoji: '💪', description: 'Completaste todos los ejercicios de pecho' },
  { id: 'morning', title: 'Pájaro madrugador', emoji: '🌅', description: 'Entrenamientos antes de las 8AM' },
];

// List of motivational phrases for easter egg
const motivationalPhrases = [
  "No hay atajos para un lugar al que vale la pena llegar.",
  "El mejor proyecto en el que puedes trabajar eres tú.",
  "Pequeños pasos, grandes resultados.",
  "La disciplina es el puente entre tus metas y tus logros.",
  "Ningún esfuerzo sincero es desperdiciado.",
  "La consistencia supera al talento y a la suerte.",
  "Tu cuerpo puede resistir casi cualquier cosa. Es tu mente la que debes convencer.",
  "No cuentes los días, haz que los días cuenten."
];

const WeeklyProgressScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const handleBack = () => {
    navigate('/routine');
  };
  
  const handleDayClick = (day: string) => {
    toast.info(`Ir a los entrenamientos del ${day}`);
    navigate('/routine');
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };
  
  // Handle shake gesture for easter egg
  React.useEffect(() => {
    let shakeThreshold = 15;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastZ: number | null = null;
    let lastTime = 0;
    
    const handleMotion = (event: DeviceMotionEvent) => {
      const currentTime = new Date().getTime();
      if ((currentTime - lastTime) > 100) {
        const acceleration = event.accelerationIncludingGravity;
        
        if (!acceleration) return;
        
        let x = acceleration.x || 0;
        let y = acceleration.y || 0;
        let z = acceleration.z || 0;
        
        if (lastX !== null && lastY !== null && lastZ !== null) {
          const deltaX = Math.abs(x - lastX);
          const deltaY = Math.abs(y - lastY);
          const deltaZ = Math.abs(z - lastZ);
          
          if ((deltaX > shakeThreshold && deltaY > shakeThreshold) || 
              (deltaX > shakeThreshold && deltaZ > shakeThreshold) || 
              (deltaY > shakeThreshold && deltaZ > shakeThreshold)) {
            // Show random motivational phrase
            const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
            toast.success(randomPhrase, { position: 'bottom-center', duration: 5000 });
          }
        }
        
        lastX = x;
        lastY = y;
        lastZ = z;
        lastTime = currentTime;
      }
    };
    
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }
    
    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion);
      }
    };
  }, []);

  return (
    <div className={`nova-gradient min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="pt-12 pb-4 px-4 flex items-center justify-between">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="flex-1 text-xl font-poppins font-bold text-white text-shadow text-center ml-2">
          Progreso Semanal
        </h1>
        <button 
          onClick={toggleDarkMode}
          className="p-2"
        >
          {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
        </button>
      </header>
      
      {/* Progress graph */}
      <div className="p-4">
        <div className="mb-2 text-left">
          <h2 className="font-poppins font-semibold text-white text-shadow">Esta semana</h2>
        </div>
        <div className="bg-white/10 dark:bg-gray-800/30 p-4 rounded-nova">
          <WeeklyProgressGraph days={weekData} onDayClick={handleDayClick} />
          
          <div className="flex justify-between text-sm mt-2">
            <div>
              <span className="text-white/80">Completados:</span>
              <span className="ml-1 font-semibold">3/7</span>
            </div>
            <div>
              <span className="text-white/80">Progreso:</span>
              <span className="ml-1 font-semibold">43%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Badges section */}
      <div className="p-4">
        <div className="mb-2 text-left">
          <h2 className="font-poppins font-semibold text-white text-shadow">Tus logros</h2>
        </div>
        
        <TooltipProvider>
          <div className="grid grid-cols-1 gap-3">
            {badges.map(badge => (
              <Tooltip key={badge.id}>
                <TooltipTrigger asChild>
                  <div 
                    className="flex items-center p-4 bg-white/10 dark:bg-gray-800/30 rounded-nova transition-transform hover:scale-[1.02] cursor-pointer"
                    onClick={() => toast.success(`¡Desbloqueaste: ${badge.title}!`)}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-white dark:from-gray-600 dark:to-gray-400 flex items-center justify-center text-2xl mr-4 shadow-lg">
                      {badge.emoji}
                    </div>
                    <div className="text-left">
                      <h3 className="font-poppins font-bold text-white">{badge.title}</h3>
                      <p className="text-xs text-white/80">{badge.description}</p>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-gray-800 text-white border-gray-700">
                  <p>Haz click para ver detalles</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
      
      {/* Motivational text */}
      <div className="mt-auto p-4 text-center">
        <p className="text-white/90 italic">
          "La consistencia es la clave del éxito. ¡Sigue así!"
        </p>
        <p className="text-white/70 text-xs mt-1">
          <em>Sacude tu dispositivo para más motivación</em>
        </p>
      </div>
      
      {/* Action button */}
      <div className="p-4">
        <GoldenButton 
          onClick={handleBack}
          fullWidth
        >
          Volver a mi rutina
        </GoldenButton>
      </div>
    </div>
  );
};

export default WeeklyProgressScreen;
