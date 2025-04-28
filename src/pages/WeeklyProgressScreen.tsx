
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import WeeklyProgressGraph from '../components/WeeklyProgressGraph';
import GoldenButton from '../components/GoldenButton';

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

const WeeklyProgressScreen: React.FC = () => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate('/routine');
  };
  
  const handleDayClick = (day: string) => {
    navigate('/routine');
  };

  return (
    <div className="nova-gradient min-h-screen flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-4 px-4 flex items-center">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="flex-1 text-xl font-poppins font-bold text-white text-shadow text-center ml-2">
          Progreso Semanal
        </h1>
      </header>
      
      {/* Progress graph */}
      <div className="p-4">
        <div className="mb-2 text-left">
          <h2 className="font-poppins font-semibold text-white text-shadow">Esta semana</h2>
        </div>
        <div className="bg-white/10 p-4 rounded-nova">
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
        
        <div className="grid grid-cols-1 gap-3">
          {badges.map(badge => (
            <div 
              key={badge.id}
              className="flex items-center p-4 bg-white/10 rounded-nova transition-transform hover:scale-[1.02]"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-nova-gold to-nova-yellow flex items-center justify-center text-2xl mr-4">
                {badge.emoji}
              </div>
              <div className="text-left">
                <h3 className="font-poppins font-bold text-white">{badge.title}</h3>
                <p className="text-xs text-white/80">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Motivational text */}
      <div className="mt-auto p-4 text-center">
        <p className="text-white/90 italic">
          "La consistencia es la clave del éxito. ¡Sigue así!"
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
