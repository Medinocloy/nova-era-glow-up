
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
    <div className="bg-gradient-to-br from-nova-black to-nova-darkGray min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center h-24 w-24 bg-gradient-to-br from-nova-red to-nova-black rounded-full mx-auto mb-6">
          <Dumbbell className="h-14 w-14 text-white" />
        </div>
        <h1 className="text-5xl font-poppins font-bold text-white text-shadow animate-scale-in">
          NOVA ERA
        </h1>
        <p className="text-white/80 mt-2">ENTRENAMIENTO DE ÉLITE</p>
        {showParticles && <ParticleEffect />}
      </div>
    </div>
  );
};

export default SplashScreen;
