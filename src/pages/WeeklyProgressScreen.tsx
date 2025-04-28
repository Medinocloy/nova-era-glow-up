
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Share2, FileText, PlusCircle } from 'lucide-react';
import WeeklyProgressGraph from '../components/WeeklyProgressGraph';
import GoldenButton from '../components/GoldenButton';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import TechnicalDataPanel from '../components/TechnicalDataPanel';
import MuscleHeatmap from '../components/MuscleHeatmap';
import PerformanceRadar from '../components/PerformanceRadar';

// Mock data
const weekData = [
  { day: 'monday', date: 'Lun 15', completed: true, percentage: 100 },
  { day: 'tuesday', date: 'Mar 16', completed: true, percentage: 80 },
  { day: 'wednesday', date: 'Mie 17', completed: true, percentage: 100 },
  { day: 'thursday', date: 'Jue 18', completed: false, percentage: 60 },
  { day: 'friday', date: 'Vie 19', completed: false, percentage: 0 },
  { day: 'saturday', date: 'Sab 20', completed: false, percentage: 0 },
  { day: 'sunday', date: 'Dom 21', completed: false, percentage: 0 },
];

const badges = [
  { id: 'streak', title: '3 días seguidos', emoji: '🔥', description: '¡Sigue así!' },
  { id: 'chest', title: 'Maestro del pecho', emoji: '💪', description: 'Completaste todos los ejercicios de pecho' },
  { id: 'morning', title: 'Pájaro madrugador', emoji: '🌅', description: 'Entrenamientos antes de las 8AM' },
];

// User profile data
const userProfile = {
  name: "Alex Trainer",
  level: "Avanzado",
  currentRM: "120kg (Press Banca)",
  currentWeek: "3/8 (Fase Hipertrofia)",
  avatar: "/placeholder.svg"
};

// Performance metrics
const performanceMetrics = [
  { name: "TUT Piernas", current: "38s/set", optimal: "42s" },
  { name: "ROM Sentadilla", current: "85°", optimal: "90°" },
  { name: "Vel. Concéntrica", current: "0.5m/s", optimal: "0.45m/s" },
  { name: "Recup. Interset", current: "85s", optimal: "90s" },
];

// Progress metrics
const progressMetrics = [
  { name: "Fuerza", value: "Press", change: "+7%" },
  { name: "Volumen", value: "92%", change: "meta semanal" },
  { name: "Recuperación", value: "6.2h", change: "sueño promedio" },
];

// Performance radar data
const radarData = [
  { axis: "Fuerza Máxima", value: 80 },
  { axis: "Resistencia", value: 65 },
  { axis: "Movilidad", value: 70 },
  { axis: "Simetría", value: 85 },
  { axis: "Potencia", value: 75 },
];

// List of motivational phrases for easter egg
const motivationalPhrases = [
  "No hay atajos para un lugar al que vale la pena llegar.",
  "El mejor proyecto en el que puedes trabajar eres tú.",
  "Pequeños pasos, grandes resultados.",
  "La disciplina es el puente entre tus metas y tus logros.",
  "Ningún esfuerzo sincero es desperdiciado.",
  "La consistencia supera al talento y a la suerte.",
  "Tu cuerpo puede resistir casi cualquier cosa. Es tu mente la que debes convencer.",
  "No cuentes los días, haz que los días cuenten."
];

const WeeklyProgressScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("progress");
  
  const handleBack = () => {
    navigate('/routine');
  };
  
  const handleDayClick = (day: string) => {
    toast.info(`Ir a los entrenamientos del ${day}`);
    navigate('/routine');
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };
  
  const handleExportData = () => {
    toast.success("Exportando datos de rendimiento...");
  };
  
  const handleShareProgress = () => {
    toast.success("Compartiendo progreso en redes sociales...");
  };
  
  const handleDeepDive = () => {
    navigate('/technical-analysis');
  };
  
  // Handle shake gesture for easter egg
  React.useEffect(() => {
    let shakeThreshold = 15;
    let lastX: number | null = null;
    let lastY: number | null = null;
    let lastZ: number | null = null;
    let lastTime = 0;
    
    const handleMotion = (event: DeviceMotionEvent) => {
      const currentTime = new Date().getTime();
      if ((currentTime - lastTime) > 100) {
        const acceleration = event.accelerationIncludingGravity;
        
        if (!acceleration) return;
        
        let x = acceleration.x || 0;
        let y = acceleration.y || 0;
        let z = acceleration.z || 0;
        
        if (lastX !== null && lastY !== null && lastZ !== null) {
          const deltaX = Math.abs(x - lastX);
          const deltaY = Math.abs(y - lastY);
          const deltaZ = Math.abs(z - lastZ);
          
          if ((deltaX > shakeThreshold && deltaY > shakeThreshold) || 
              (deltaX > shakeThreshold && deltaZ > shakeThreshold) || 
              (deltaY > shakeThreshold && deltaZ > shakeThreshold)) {
            // Show random motivational phrase
            const randomPhrase = motivationalPhrases[Math.floor(Math.random() * motivationalPhrases.length)];
            toast.success(randomPhrase, { position: 'bottom-center', duration: 5000 });
          }
        }
        
        lastX = x;
        lastY = y;
        lastZ = z;
        lastTime = currentTime;
      }
    };
    
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', handleMotion);
    }
    
    return () => {
      if (window.DeviceMotionEvent) {
        window.removeEventListener('devicemotion', handleMotion);
      }
    };
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark bg-[#121212]' : 'nova-gradient'}`}>
      {/* Header */}
      <header className="pt-12 pb-4 px-4 flex items-center justify-between">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="flex-1 text-xl font-bold text-white text-shadow text-center ml-2 font-[Rajdhani]">
          Dashboard de Rendimiento
        </h1>
        <button 
          onClick={toggleDarkMode}
          className="p-2"
        >
          {isDarkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
        </button>
      </header>
      
      {/* User Profile Stats */}
      <div className="p-4">
        <div className="bg-white/10 dark:bg-gray-800/30 p-4 rounded-nova flex items-center">
          <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border-2 border-[#00F5FF] dark:border-[#00F5FF]">
            <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1">
            <h3 className="font-[Rajdhani] font-bold text-white text-lg">{userProfile.name}</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div className="flex items-center">
                <span className="text-white/70 mr-1">🏋️‍♂️ NIVEL:</span>
                <span className="text-white font-semibold">{userProfile.level}</span>
              </div>
              <div className="flex items-center">
                <span className="text-white/70 mr-1">⚡ RM Actual:</span>
                <span className="text-white font-semibold">{userProfile.currentRM}</span>
              </div>
              <div className="flex items-center col-span-2">
                <span className="text-white/70 mr-1">📅 Semana:</span>
                <span className="text-white font-semibold">{userProfile.currentWeek}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs for Tech Data and Progress */}
      <div className="px-4">
        <Tabs defaultValue="progress" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-4 bg-white/10 dark:bg-gray-800/30">
            <TabsTrigger value="techData" className="font-[Orbitron] text-sm">
              TECH DATA
            </TabsTrigger>
            <TabsTrigger value="progress" className="font-[Orbitron] text-sm">
              PROGRESO
            </TabsTrigger>
          </TabsList>
          
          {/* Technical Data Tab */}
          <TabsContent value="techData" className="space-y-4">
            <section>
              <h3 className="font-[Orbitron] text-lg font-bold text-white mb-3">Curva de Fuerza</h3>
              <div className="bg-white/10 dark:bg-gray-800/30 p-3 rounded-nova">
                <TechnicalDataPanel />
                
                <div className="mt-4">
                  <h4 className="font-[Rajdhani] text-white mb-2 text-sm font-bold">Métricas Clave</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="py-2 text-left text-white/70">Variable</th>
                          <th className="py-2 text-right text-white/70">Val. Actual</th>
                          <th className="py-2 text-right text-white/70">Óptimo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performanceMetrics.map((metric, idx) => (
                          <tr key={idx} className="border-b border-white/10">
                            <td className="py-2 text-white">{metric.name}</td>
                            <td className="py-2 text-right text-[#00F5FF]">{metric.current}</td>
                            <td className="py-2 text-right text-white/80">{metric.optimal}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="font-[Orbitron] text-lg font-bold text-white mb-3">Perfil de Rendimiento</h3>
              <div className="bg-white/10 dark:bg-gray-800/30 p-3 rounded-nova">
                <div className="h-60">
                  <PerformanceRadar data={radarData} />
                </div>
                <div className="mt-2 bg-[#121212]/50 dark:bg-black/30 p-2 rounded text-xs text-white/80">
                  <p className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-[#00F5FF] mr-1 rounded-full"></span>
                    Perfil actual relativo al máximo potencial (100%)
                  </p>
                </div>
              </div>
            </section>
            
            <div className="bg-[#121212]/50 dark:bg-black/30 p-3 rounded-nova text-xs text-white mt-1 mb-4">
              <p className="flex items-center">
                <span className="text-[#FF2E4D] mr-1">🔔</span>
                <span>Tu ROM en peso muerto bajó 8% → ¿Fatiga neural?</span>
              </p>
            </div>
          </TabsContent>
          
          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-4">
            <section>
              <h3 className="font-[Orbitron] text-lg font-bold text-white mb-3">Esta semana</h3>
              <div className="bg-white/10 dark:bg-gray-800/30 p-3 rounded-nova">
                <WeeklyProgressGraph days={weekData} onDayClick={handleDayClick} />
                
                <div className="flex justify-between text-sm mt-2">
                  <div>
                    <span className="text-white/80">Completados:</span>
                    <span className="ml-1 font-semibold text-white">3/7</span>
                  </div>
                  <div>
                    <span className="text-white/80">Progreso:</span>
                    <span className="ml-1 font-semibold text-white">43%</span>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="font-[Orbitron] text-lg font-bold text-white mb-3">Métricas de Progreso</h3>
              <div className="bg-white/10 dark:bg-gray-800/30 p-3 rounded-nova space-y-4">
                {progressMetrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="text-sm text-white">{metric.name}</div>
                      <div className="text-xs">
                        <span className="text-[#00F5FF] font-bold">{metric.value}</span>
                        <span className="text-white/70 ml-1">{metric.change}</span>
                      </div>
                    </div>
                    <Progress value={idx === 0 ? 75 : idx === 1 ? 92 : 65} 
                      className="h-2 bg-white/20" 
                      indicatorClassName="bg-gradient-to-r from-[#00F5FF] to-[#00F5FF]/70" 
                    />
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h3 className="font-[Orbitron] text-lg font-bold text-white mb-3">Activación Muscular</h3>
              <div className="bg-white/10 dark:bg-gray-800/30 p-3 rounded-nova">
                <div className="h-60 flex items-center justify-center">
                  <MuscleHeatmap />
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-1"></span>
                    <span className="text-white/80">Sobrecargado</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block mr-1"></span>
                    <span className="text-white/80">Óptimo</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block mr-1"></span>
                    <span className="text-white/80">Subentrenado</span>
                  </div>
                </div>
              </div>
            </section>
            
            <TooltipProvider>
              <div className="grid grid-cols-1 gap-3 mb-4">
                {badges.map(badge => (
                  <Tooltip key={badge.id}>
                    <TooltipTrigger asChild>
                      <div 
                        className="flex items-center p-4 bg-white/10 dark:bg-gray-800/30 rounded-nova transition-transform hover:scale-[1.02] cursor-pointer"
                        onClick={() => toast.success(`¡Desbloqueaste: ${badge.title}!`)}
                      >
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-white dark:from-gray-600 dark:to-gray-400 flex items-center justify-center text-2xl mr-4 shadow-lg">
                          {badge.emoji}
                        </div>
                        <div className="text-left">
                          <h3 className="font-[Rajdhani] font-bold text-white">{badge.title}</h3>
                          <p className="text-xs text-white/80">{badge.description}</p>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white border-gray-700">
                      <p>Haz click para ver detalles</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Footer Actions */}
      <div className="mt-auto p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={handleExportData}
            className="flex items-center justify-center gap-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-nova py-2.5 px-4 text-white text-sm transition-colors hover:bg-white/20"
          >
            <FileText size={16} />
            <span>Exportar PDF</span>
          </button>
          <button
            onClick={handleShareProgress}
            className="flex items-center justify-center gap-2 bg-white/10 dark:bg-gray-800/20 border border-white/20 dark:border-gray-700/30 rounded-nova py-2.5 px-4 text-white text-sm transition-colors hover:bg-white/20"
          >
            <Share2 size={16} />
            <span>Compartir</span>
          </button>
        </div>
        
        <GoldenButton 
          onClick={handleDeepDive}
          fullWidth
        >
          <PlusCircle size={16} className="mr-1" />
          Análisis Profundo
        </GoldenButton>
      </div>
    </div>
  );
};

export default WeeklyProgressScreen;
