
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
      navigate('/level-selection');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <>
      {showSplash && (
        <div className="fixed inset-0 z-50">
          <SplashScreen />
          <ParticleEffect />
        </div>
      )}
    </>
  );
};

export default Index;
