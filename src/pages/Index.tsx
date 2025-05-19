
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SplashScreen from './SplashScreen';
import ParticleEffect from '../components/ParticleEffect';
import { Calendar, Users, Flame } from 'lucide-react';

const Index = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000); // Splash screen rápido
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  const menuItems = [
    {
      icon: <Calendar className="text-5xl mb-4 text-nova-gold" />,
      emoji: "🗓️",
      title: "Agendar Hora",
      description: "Reserva tu espacio en el gimnasio",
      path: "/schedule"
    },
    {
      icon: <Users className="text-5xl mb-4 text-nova-gold" />,
      emoji: "💼",
      title: "Agendar Personal",
      description: "Entrena con nuestros profesionales",
      path: "/trainers"
    },
    {
      icon: <Flame className="text-5xl mb-4 text-nova-gold" />,
      emoji: "🔥",
      title: "Entrenar",
      description: "Comienza tu rutina personalizada",
      path: "/level-selection"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-nova-black text-white">
      {showSplash ? (
        <div className="fixed inset-0 z-50">
          <SplashScreen />
          <ParticleEffect />
        </div>
      ) : (
        <div className="text-center p-6 max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-gothic uppercase tracking-wider mb-2">Bienvenido a <span className="text-nova-red">NOVA ERA</span></h1>
            <div className="gothic-divider"></div>
            <p className="mt-4 text-lg text-nova-gold">Tu plataforma de entrenamiento de última generación</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <div 
                key={index}
                onClick={() => navigate(item.path)}
                className="gothic-card p-6 cursor-pointer hover:border-nova-red transition-all duration-300"
              >
                <div className="flex flex-col items-center">
                  {item.icon}
                  <h2 className="text-xl font-gothic uppercase mb-2">{item.title}</h2>
                  <p className="text-nova-lightGray">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
