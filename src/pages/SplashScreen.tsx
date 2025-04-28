
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleEffect from '../components/ParticleEffect';

const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    // Show particles after a small delay
    const particleTimeout = setTimeout(() => {
      setShowParticles(true);
    }, 500);

    // Navigate to level selection after splash screen duration
    const navigationTimeout = setTimeout(() => {
      navigate('/level-selection');
    }, 2000);

    // Clean up timers
    return () => {
      clearTimeout(navigationTimeout);
      clearTimeout(particleTimeout);
    };
  }, [navigate]);

  return (
    <div className="nova-gradient min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="relative">
        <h1 className="text-5xl font-poppins font-bold text-white text-shadow animate-scale-in">
          NOVA ERA
        </h1>
        {showParticles && <ParticleEffect />}
      </div>
    </div>
  );
};

export default SplashScreen;
