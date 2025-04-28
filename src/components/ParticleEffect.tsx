
import Particle from './Particle';

const ParticleEffect = () => {
  const particleCount = 50; // Adjust based on desired density
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: particleCount }).map((_, index) => (
        <Particle 
          key={index} 
          index={index} 
          totalParticles={particleCount} 
        />
      ))}
    </div>
  );
};

export default ParticleEffect;
