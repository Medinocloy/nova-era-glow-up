
import React from 'react';

// Fake image URL - would be replaced with actual silhouette in a real app
const muscleSilhouette = "/placeholder.svg";

const MuscleHeatmap: React.FC = () => {
  // Muscle activation data (simplified for prototype)
  const muscleGroups = [
    { id: "shoulders", name: "Hombros", status: "overloaded", x: 50, y: 20, radius: 12 },
    { id: "chest", name: "Pecho", status: "optimal", x: 50, y: 35, radius: 15 },
    { id: "biceps", name: "Bíceps", status: "optimal", x: 30, y: 40, radius: 10 },
    { id: "triceps", name: "Tríceps", status: "underloaded", x: 70, y: 40, radius: 10 },
    { id: "back", name: "Espalda", status: "optimal", x: 50, y: 50, radius: 18 },
    { id: "abs", name: "Abdomen", status: "optimal", x: 50, y: 65, radius: 15 },
    { id: "quads", name: "Cuádriceps", status: "optimal", x: 50, y: 85, radius: 14 },
    { id: "calves", name: "Gemelos", status: "underloaded", x: 50, y: 110, radius: 10 },
  ];
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'overloaded': return 'rgba(255, 46, 77, 0.7)';  // #FF2E4D with opacity
      case 'optimal': return 'rgba(255, 193, 7, 0.7)';     // Yellow with opacity
      case 'underloaded': return 'rgba(0, 245, 255, 0.7)'; // #00F5FF with opacity
      default: return 'rgba(224, 224, 224, 0.5)';          // Default gray
    }
  };
  
  const handleMuscleClick = (name: string, status: string) => {
    let message;
    switch(status) {
      case 'overloaded':
        message = `${name}: Sobrecargado. Considera reducir volumen o frecuencia.`;
        break;
      case 'optimal':
        message = `${name}: Balance óptimo de entrenamiento.`;
        break;
      case 'underloaded':
        message = `${name}: Subentrenado. Considera aumentar volumen o frecuencia.`;
        break;
      default:
        message = `${name}: Estado no determinado.`;
    }
    
    console.log(message); // In a real app, show this in a tooltip or modal
  };
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Placeholder silhouette */}
      <div className="relative w-48 h-full">
        <div className="absolute inset-0 bg-white/5 rounded-lg flex items-center justify-center">
          <div className="text-white/30 text-xs">Silueta muscular</div>
        </div>
        
        {/* Heat map overlays */}
        {muscleGroups.map((muscle) => (
          <div
            key={muscle.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 rounded-full transition-all hover:scale-110"
            style={{
              left: `${muscle.x}%`,
              top: `${muscle.y}%`,
              width: `${muscle.radius * 2}px`,
              height: `${muscle.radius * 2}px`,
              backgroundColor: getStatusColor(muscle.status),
              boxShadow: `0 0 10px ${getStatusColor(muscle.status)}`,
            }}
            onClick={() => handleMuscleClick(muscle.name, muscle.status)}
            title={`${muscle.name}: ${muscle.status === 'overloaded' ? 'Sobrecargado' : 
                    muscle.status === 'optimal' ? 'Óptimo' : 'Subentrenado'}`}
          />
        ))}
      </div>
      
      {/* Legend would normally be outside this component */}
    </div>
  );
};

export default MuscleHeatmap;
