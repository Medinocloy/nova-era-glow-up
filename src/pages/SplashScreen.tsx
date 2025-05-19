
import React, { useEffect, useState } from 'react';
import { Dumbbell } from 'lucide-react';
import ParticleEffect from '../components/ParticleEffect';

const SplashScreen: React.FC = () => {
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Show particles after a small delay
    const particleTimeout = setTimeout(() => {
      setShowParticles(true);
    }, 500);

    return () => {
      clearTimeout(particleTimeout);
    };
  }, []);

  return (
    <div className="bg-nova-black min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center h-24 w-24 nova-button-gradient mx-auto mb-6 shadow-nova">
          <Dumbbell className="h-14 w-14 text-white" />
        </div>
        <h1 className="text-5xl font-gothic uppercase tracking-widest text-white text-shadow animate-scale-in">
          NOVA <span className="text-nova-red">ERA</span>
        </h1>
        <p className="text-nova-gold mt-2 font-gothic tracking-wider">ENTRENAMIENTO DE ÉLITE</p>
        {showParticles && <ParticleEffect />}
        
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-nova-red to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-nova-red to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-nova-red to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-nova-red to-transparent"></div>
      </div>
    </div>
  );
};

export default SplashScreen;
