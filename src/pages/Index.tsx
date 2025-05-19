
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import ParticleEffect from '../components/ParticleEffect';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // Reduced from 2000 to 1000 ms for faster splash screen
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {showSplash ? (
        <div className="fixed inset-0 z-50">
          <SplashScreen />
          <ParticleEffect />
        </div>
      ) : (
        <div className="text-center p-6">
          <h1 className="text-4xl font-poppins font-bold mb-6">Bienvenido a NOVA ERA</h1>
          <p className="text-xl mb-8">Tu plataforma de entrenamiento de última generación</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div 
              onClick={() => navigate('/schedule')}
              className="bg-gray-100 p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🗓️</div>
              <h2 className="text-xl font-bold mb-2">Agendar Hora</h2>
              <p className="text-gray-600">Reserva tu espacio en el gimnasio</p>
            </div>
            
            <div 
              onClick={() => navigate('/trainers')}
              className="bg-gray-100 p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">💼</div>
              <h2 className="text-xl font-bold mb-2">Agendar Personal</h2>
              <p className="text-gray-600">Entrena con nuestros profesionales</p>
            </div>
            
            <div 
              onClick={() => navigate('/level-selection')}
              className="bg-gray-100 p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="text-4xl mb-4">🔥</div>
              <h2 className="text-xl font-bold mb-2">Entrenar</h2>
              <p className="text-gray-600">Comienza tu rutina personalizada</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
