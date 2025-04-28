
import { useEffect, useState } from 'react';

interface ParticleProps {
  index: number;
  totalParticles: number;
}

const Particle: React.FC<ParticleProps> = ({ index, totalParticles }) => {
  const [style, setStyle] = useState({});
  
  useEffect(() => {
    // Create random positions and animations for particles
    const size = Math.floor(Math.random() * 8) + 4; // between 4-12px
    const left = Math.random() * 100; // random position
    const top = Math.random() * 100;
    const delay = (index / totalParticles) * 1.5; // staggered animation
    
    const tx = (Math.random() - 0.5) * 400; // random direction
    const ty = (Math.random() - 0.5) * 400;
    const r = Math.random() * 720 - 360;
    
    setStyle({
      width: `${size}px`,
      height: `${size}px`,
      left: `${left}%`,
      top: `${top}%`,
      backgroundColor: getRandomGoldShade(),
      opacity: 0, // start invisible
      animationDelay: `${delay}s`,
      '--tx': `${tx}px`,
      '--ty': `${ty}px`,
      '--r': `${r}deg`,
    } as React.CSSProperties);
  }, [index, totalParticles]);

  const getRandomGoldShade = () => {
    const shades = ['#eebf24', '#f7c16a', '#fdc3a1', '#ffd700', '#daa520'];
    return shades[Math.floor(Math.random() * shades.length)];
  };

  return (
    <div 
      className="absolute rounded-full animate-particle" 
      style={style}
    />
  );
};

export default Particle;
