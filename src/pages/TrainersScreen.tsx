
import React from 'react';
import GoldenButton from '../components/GoldenButton';
import { toast } from 'sonner';

interface Trainer {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  rating: number;
  imageSrc: string;
}

const trainers: Trainer[] = [
  {
    id: 1,
    name: "Carlos Martínez",
    specialty: "Hipertrofia y Fuerza",
    experience: "8 años",
    availability: "Lun-Vie: 8AM-2PM",
    rating: 4.9,
    imageSrc: "https://images.unsplash.com/photo-1567013127542-490d757e6349?q=80&w=250&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Laura Sánchez",
    specialty: "Nutrición Deportiva",
    experience: "6 años",
    availability: "Mar-Sáb: 3PM-9PM",
    rating: 4.7,
    imageSrc: "https://images.unsplash.com/photo-1609644124044-a9c3c855f711?q=80&w=250&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Miguel Torres",
    specialty: "CrossFit",
    experience: "7 años",
    availability: "Lun-Jue: 4PM-10PM",
    rating: 4.8,
    imageSrc: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=250&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Ana Ruiz",
    specialty: "Pilates y Yoga",
    experience: "10 años",
    availability: "Mié-Dom: 7AM-1PM",
    rating: 4.9,
    imageSrc: "https://images.unsplash.com/photo-1518310972828-a54e1fb49613?q=80&w=250&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Javier López",
    specialty: "Entrenamiento Funcional",
    experience: "5 años",
    availability: "Lun-Vie: 10AM-4PM",
    rating: 4.6,
    imageSrc: "https://images.unsplash.com/photo-1567324216289-97a45605611e?q=80&w=250&auto=format&fit=crop"
  }
];

const TrainersScreen: React.FC = () => {
  const [selectedTrainer, setSelectedTrainer] = React.useState<Trainer | null>(null);

  const handleBooking = (trainer: Trainer) => {
    toast.success(`Has reservado una sesión con ${trainer.name}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-gothic uppercase tracking-wider mb-2">Nuestros Entrenadores</h1>
        <div className="gothic-divider"></div>
        <p className="text-nova-gold mt-4">Reserva una sesión con nuestros profesionales certificados</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div 
            key={trainer.id} 
            className="gothic-card overflow-hidden transition-transform hover:scale-[1.02]"
          >
            <div className="h-56 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-nova-black via-transparent to-transparent"></div>
              <img 
                src={trainer.imageSrc} 
                alt={trainer.name} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-gothic uppercase text-xl mb-1 text-white">{trainer.name}</h2>
                  <p className="text-nova-red font-medium">{trainer.specialty}</p>
                </div>
                <div className="nova-button-gradient px-2 py-1 flex items-center">
                  <span className="text-nova-gold mr-1">★</span>
                  <span className="font-medium">{trainer.rating}</span>
                </div>
              </div>
              
              <div className="mt-4 space-y-2 text-nova-lightGray">
                <p><span className="font-medium text-white">Experiencia:</span> {trainer.experience}</p>
                <p><span className="font-medium text-white">Disponibilidad:</span> {trainer.availability}</p>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button 
                  onClick={() => setSelectedTrainer(trainer)}
                  className="px-4 py-2 gothic-card border-nova-gray/30 hover:border-nova-gold transition-colors"
                >
                  Ver Perfil
                </button>
                <GoldenButton 
                  onClick={() => handleBooking(trainer)}
                >
                  Agendar
                </GoldenButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Trainer Detail Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
          <div className="gothic-card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64">
              <button 
                onClick={() => setSelectedTrainer(null)}
                className="absolute top-4 right-4 z-20 bg-nova-black p-2 rounded-full border border-nova-red"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-nova-black to-transparent z-10"></div>
              <img 
                src={selectedTrainer.imageSrc.replace('w=250', 'w=600')} 
                alt={selectedTrainer.name} 
                className="w-full h-64 object-cover object-center"
              />
            </div>
            
            <div className="p-6">
              <h2 className="text-2xl font-gothic uppercase mb-2">{selectedTrainer.name}</h2>
              <div className="flex items-center mb-4">
                <span className="text-nova-gold mr-1">★</span>
                <span className="font-medium">{selectedTrainer.rating}</span>
              </div>
              
              <div className="gothic-divider"></div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-gothic text-lg uppercase text-nova-red">Especialidad</h3>
                  <p>{selectedTrainer.specialty}</p>
                </div>
                
                <div>
                  <h3 className="font-gothic text-lg uppercase text-nova-red">Experiencia</h3>
                  <p>{selectedTrainer.experience} en entrenamiento personalizado</p>
                </div>
                
                <div>
                  <h3 className="font-gothic text-lg uppercase text-nova-red">Disponibilidad</h3>
                  <p>{selectedTrainer.availability}</p>
                </div>
                
                <div>
                  <h3 className="font-gothic text-lg uppercase text-nova-red">Sobre {selectedTrainer.name.split(' ')[0]}</h3>
                  <p className="text-nova-lightGray">
                    Entrenador certificado con amplia experiencia en {selectedTrainer.specialty.toLowerCase()}. 
                    Enfocado en resultados personalizados y adaptados a las necesidades específicas de cada cliente. 
                    Metodología basada en la evidencia científica y actualización constante.
                  </p>
                </div>
              </div>
              
              <div className="gothic-divider mt-6"></div>
              
              <GoldenButton 
                onClick={() => {
                  handleBooking(selectedTrainer);
                  setSelectedTrainer(null);
                }}
                fullWidth
                className="mt-6"
              >
                Agendar Sesión
              </GoldenButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainersScreen;
