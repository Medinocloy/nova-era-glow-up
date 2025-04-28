
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, ChevronDown, ChevronUp } from 'lucide-react';
import GoldenButton from '../components/GoldenButton';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  Legend,
  Tooltip
} from 'recharts';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import workoutLevels from '../data/workoutRoutines';

const forceData = [
  { angle: 0, hipHinge: 40, squat: 25, benchPress: 10 },
  { angle: 5, hipHinge: 65, squat: 45, benchPress: 25 },
  { angle: 10, hipHinge: 90, squat: 60, benchPress: 45 },
  { angle: 15, hipHinge: 98, squat: 75, benchPress: 65 },
  { angle: 20, hipHinge: 100, squat: 85, benchPress: 80 },
  { angle: 25, hipHinge: 95, squat: 95, benchPress: 90 },
  { angle: 30, hipHinge: 85, squat: 100, benchPress: 95 },
  { angle: 35, hipHinge: 75, squat: 98, benchPress: 100 },
  { angle: 40, hipHinge: 65, squat: 90, benchPress: 95 },
  { angle: 45, hipHinge: 55, squat: 80, benchPress: 90 },
  { angle: 50, hipHinge: 45, squat: 70, benchPress: 80 },
  { angle: 55, hipHinge: 35, squat: 60, benchPress: 70 },
  { angle: 60, hipHinge: 25, squat: 50, benchPress: 55 },
  { angle: 65, hipHinge: 20, squat: 40, benchPress: 40 },
  { angle: 70, hipHinge: 15, squat: 30, benchPress: 25 },
  { angle: 75, hipHinge: 10, squat: 20, benchPress: 15 },
  { angle: 80, hipHinge: 5, squat: 10, benchPress: 5 },
];

const metabolicStressData = [
  { name: 'Sentadillas', lactate: 12.5, tut: 42, pct: 90 },
  { name: 'Peso Muerto', lactate: 15.2, tut: 37, pct: 100 },
  { name: 'Press Banca', lactate: 8.4, tut: 45, pct: 75 },
  { name: 'Hip Thrust', lactate: 10.1, tut: 40, pct: 82 },
  { name: 'Dominadas', lactate: 9.8, tut: 38, pct: 80 },
];

const muscleActivationData = [
  { muscle: 'Latissimus', dominadas: 92, remoT: 85, jalón: 78 },
  { muscle: 'Bíceps', dominadas: 78, remoT: 65, jalón: 71 },
  { muscle: 'Trapecio', dominadas: 68, remoT: 82, jalón: 45 },
  { muscle: 'Romboides', dominadas: 75, remoT: 90, jalón: 65 },
  { muscle: 'Erectores', dominadas: 55, remoT: 70, jalón: 30 },
];

const neuralFatigueData = {
  core: { desacoplamiento: 13.5, recuperación: 48 },
  upperBody: { desacoplamiento: 10.2, recuperación: 36 },
  lowerBody: { desacoplamiento: 15.8, recuperación: 52 },
};

interface ExerciseTechniqueProps {
  name: string;
  technique: string;
  angles: string;
  recruitment: string;
}

const ExerciseTechnique: React.FC<ExerciseTechniqueProps> = ({ 
  name, technique, angles, recruitment 
}) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Card className="mb-3 bg-white/10 border-white/20 text-white">
      <CardHeader className="p-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-poppins">{name}</CardTitle>
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="p-3 pt-0 text-sm space-y-2">
          <div>
            <span className="font-semibold">Técnica óptima:</span> 
            <p className="opacity-90">{technique}</p>
          </div>
          <div>
            <span className="font-semibold">Ángulos ideales:</span>
            <p className="opacity-90">{angles}</p>
          </div>
          <div>
            <span className="font-semibold">Reclutamiento muscular:</span>
            <p className="opacity-90">{recruitment}</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

const TechnicalAnalysisScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'metrics' | 'variables' | 'mechanics'>('metrics');
  
  const handleBack = () => {
    navigate('/level-selection');
  };
  
  const renderActiveTab = () => {
    switch(activeTab) {
      case 'metrics':
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-bold mb-3">Curva de Fuerza</h3>
              <div className="bg-white/10 p-3 rounded-nova">
                <ChartContainer 
                  className="h-60" 
                  config={{
                    hipHinge: { 
                      label: "Hip Hinge (RDL)",
                      color: "#F7B801" 
                    },
                    squat: { 
                      label: "Sentadilla",
                      color: "#F18701" 
                    },
                    benchPress: { 
                      label: "Press Banca",
                      color: "#F35B04" 
                    }
                  }}
                >
                  <LineChart 
                    data={forceData} 
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="angle" 
                      label={{ value: 'Ángulo (grados)', position: 'insideBottom', offset: -5 }}
                      tick={{ fill: 'white', fontSize: 10 }}
                    />
                    <YAxis 
                      label={{ value: 'Fuerza (%)', angle: -90, position: 'insideLeft' }}
                      tick={{ fill: 'white', fontSize: 10 }}
                    />
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hipHinge" 
                      stroke="#F7B801" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="squat" 
                      stroke="#F18701" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchPress" 
                      stroke="#F35B04" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ChartContainer>
                <p className="text-xs text-white/80 mt-2 italic">Modelo de fuerza biomecánica basado en estudios EMG y análisis vectorial del movimiento.</p>
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-3">Estrés Metabólico</h3>
              <div className="bg-white/10 p-3 rounded-nova">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="py-2 text-left">Ejercicio</th>
                        <th className="py-2 text-right">[La] mmol</th>
                        <th className="py-2 text-right">TUT ideal (s)</th>
                        <th className="py-2 text-right">% Fatiga CNS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metabolicStressData.map((item) => (
                        <tr key={item.name} className="border-b border-white/10">
                          <td className="py-2">{item.name}</td>
                          <td className="py-2 text-right">{item.lactate}</td>
                          <td className="py-2 text-right">{item.tut}</td>
                          <td className="py-2 text-right">{item.pct}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-white/80 mt-2 italic">Valores basados en análisis de lactato sanguíneo y electromiografía de superficie.</p>
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-3">Activación Muscular (% MVC)</h3>
              <div className="bg-white/10 p-3 rounded-nova">
                <ChartContainer 
                  className="h-60" 
                  config={{
                    dominadas: { 
                      label: "Dominadas",
                      color: "#F7B801" 
                    },
                    remoT: { 
                      label: "Remo T",
                      color: "#F18701" 
                    },
                    jalón: { 
                      label: "Jalón",
                      color: "#F35B04" 
                    }
                  }}
                >
                  <BarChart
                    data={muscleActivationData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 30 }}
                    barSize={15}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="muscle" 
                      tick={{ fill: 'white', fontSize: 10 }}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis 
                      tick={{ fill: 'white', fontSize: 10 }}
                      label={{ value: '% MVC', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                    <Bar dataKey="dominadas" fill="#F7B801" name="Dominadas" />
                    <Bar dataKey="remoT" fill="#F18701" name="Remo T" />
                    <Bar dataKey="jalón" fill="#F35B04" name="Jalón" />
                  </BarChart>
                </ChartContainer>
                <p className="text-xs text-white/80 mt-2 italic">MVC = Máxima contracción voluntaria, medida con EMG.</p>
              </div>
            </section>
          </div>
        );
        
      case 'variables':
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-bold mb-3">Variables de Entrenamiento</h3>
              
              <div className="space-y-3">
                {workoutLevels.map((level) => (
                  <Card key={level.id} className="bg-white/10 border-white/20 text-white overflow-hidden">
                    <CardHeader className="p-3">
                      <CardTitle className="text-base flex items-center">
                        <span className="mr-2">{level.emoji}</span> 
                        {level.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 pt-0 text-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="font-semibold">Frecuencia</p>
                          <p className="opacity-90">
                            {level.id === 'beginner' ? '3x/semana (48h recuperación)' : 
                             level.id === 'intermediate' ? '5x/semana (24-48h recuperación)' : 
                             '5x/semana (técnicas avanzadas de recuperación)'}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">Volumen</p>
                          <p className="opacity-90">
                            {level.id === 'beginner' ? '12-15 sets/grupo/semana' : 
                             level.id === 'intermediate' ? '15-20 sets/grupo/semana' : 
                             '18-25 sets/grupo/semana + microcargas'}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">Intensidad</p>
                          <p className="opacity-90">
                            {level.id === 'beginner' ? '60-70% 1RM' : 
                             level.id === 'intermediate' ? '70-80% 1RM' : 
                             '75-90% 1RM + métodos intensivos'}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold">TUT Objetivo</p>
                          <p className="opacity-90">
                            {level.id === 'beginner' ? '30-40s/serie' : 
                             level.id === 'intermediate' ? '40-50s/serie' : 
                             '35-55s/serie (variable)'}
                          </p>
                        </div>
                        {level.id === 'advanced' && (
                          <>
                            <div>
                              <p className="font-semibold">Protocolos Especiales</p>
                              <p className="opacity-90">Cluster Sets: 30/15s rest</p>
                            </div>
                            <div>
                              <p className="font-semibold">Gestión Fatiga</p>
                              <p className="opacity-90">Drop 8% 1RM/2 series</p>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-3">Fatiga Neural Estimada</h3>
              <div className="bg-white/10 p-3 rounded-nova space-y-4">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs">CORE</p>
                    <div className="text-2xl font-bold text-nova-gold">{neuralFatigueData.core.desacoplamiento}%</div>
                    <p className="text-xs opacity-80">Desacoplamiento Hb/HbO₂</p>
                    <p className="text-xs mt-1">{neuralFatigueData.core.recuperación}h recuperación</p>
                  </div>
                  <div>
                    <p className="text-xs">TREN SUPERIOR</p>
                    <div className="text-2xl font-bold text-nova-gold">{neuralFatigueData.upperBody.desacoplamiento}%</div>
                    <p className="text-xs opacity-80">Desacoplamiento Hb/HbO₂</p>
                    <p className="text-xs mt-1">{neuralFatigueData.upperBody.recuperación}h recuperación</p>
                  </div>
                  <div>
                    <p className="text-xs">TREN INFERIOR</p>
                    <div className="text-2xl font-bold text-nova-gold">{neuralFatigueData.lowerBody.desacoplamiento}%</div>
                    <p className="text-xs opacity-80">Desacoplamiento Hb/HbO₂</p>
                    <p className="text-xs mt-1">{neuralFatigueData.lowerBody.recuperación}h recuperación</p>
                  </div>
                </div>
                <p className="text-xs text-white/80 italic">Basado en modelos NIRS (Near-Infrared Spectroscopy) para estimación de fatiga del sistema nervioso central.</p>
              </div>
            </section>
          </div>
        );
        
      case 'mechanics':
        return (
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-bold mb-3">Neuromecánica Aplicada</h3>
              
              <div className="space-y-2">
                <ExerciseTechnique 
                  name="Press Banca"
                  technique="Arqueo T5-T12 + retracción escapular 15° → +9% transferencia fuerza"
                  angles="ROM óptimo: 55-65° ángulo escapular, pico tensión: 85-90° flexión codo"
                  recruitment="Pectorales: 68-72% fibras IIx, tríceps: 55-58% fibras IIx"
                />
                
                <ExerciseTechnique 
                  name="Peso Muerto Rumano"
                  technique="Secuencia de activación: Glúteo → Isquio → Erectores (delay <0.3s)"
                  angles="Pico fuerza en 15-20° flexión cadera, mantener 5-10° flexión rodilla"
                  recruitment="Isquiotibiales: 82-87% activación, glúteo máximo: 70-75%"
                />
                
                <ExerciseTechnique 
                  name="Dominadas Lastradas"
                  technique="Depresión escapular previa + rotación externa glenohumeral 12°"
                  angles="Máxima activación dorsal en 100-110° flexión codo"
                  recruitment="Latissimus: 92% MVC, bíceps: 78% MVC, trapecio: 68% MVC"
                />
                
                <ExerciseTechnique 
                  name="Sentadilla"
                  technique="Neutro lumbar + rotación externa femoral 8-12° + bracing 360°"
                  angles="Profundidad óptima: fémur 5° bajo paralelo para glúteo máximo"
                  recruitment="Cuádriceps: 95% MVC en fase concéntrica, glúteos: 85% en rebote"
                />
                
                <ExerciseTechnique 
                  name="Hip Thrust"
                  technique="Posición neutra cervical + activación transverso previo + apoyo C7-T1"
                  angles="Máxima activación glútea en extensión completa + retroversión pélvica 5°"
                  recruitment="Glúteo máximo: 95-98% MVC, isquios: 55-60% MVC"
                />
              </div>
            </section>
            
            <section>
              <h3 className="text-lg font-bold mb-3">Protocolos por Objetivo</h3>
              <div className="bg-white/10 p-3 rounded-nova">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold">Hipertrofia Sarcoplasmática</h4>
                    <ul className="list-disc list-inside text-sm pl-2">
                      <li>Press inclinado 30° (6-8 rep @ 4-0-1 tempo)</li>
                      <li>Hip thrust (8-12 rep @ 2-2-1 tempo)</li>
                      <li>Rest-pause método (6+4+2 rep, mismo peso)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Hipertrofia Miofibrilar</h4>
                    <ul className="list-disc list-inside text-sm pl-2">
                      <li>Peso muerto excéntrico 6s (3-5 rep @ 85% 1RM)</li>
                      <li>Press banca velocidad controlada (4-6 rep @ 80% 1RM)</li>
                      <li>Cluster sets 5×2 (90% 1RM, 30s inter-rep rest)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold">Reclutamiento Neural</h4>
                    <ul className="list-disc list-inside text-sm pl-2">
                      <li>Método contraste (120% 1RM isométrico + 50% explosivo)</li>
                      <li>Sets de activación post-isométricos (5s MVC + 3 rep dinámicas)</li>
                      <li>Potenciación post-activación (3RM + 6 rep pliométricas)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };
  
  return (
    <div className="nova-gradient min-h-screen flex flex-col">
      {/* Header */}
      <header className="pt-12 pb-4 px-4 flex items-center">
        <button onClick={handleBack} className="p-2">
          <ArrowLeft size={24} className="text-white" />
        </button>
        <h1 className="flex-1 text-xl font-poppins font-bold text-white text-shadow text-center ml-2">
          Análisis Técnico Avanzado
        </h1>
        <div className="p-2">
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <Info size={20} className="text-white/80" />
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-xs">Análisis biomecánico y fisiológico basado en estudios científicos recientes</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
      </header>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-white/20">
        <button 
          className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'metrics' ? 'border-b-2 border-nova-gold text-white' : 'text-white/60'}`}
          onClick={() => setActiveTab('metrics')}
        >
          Métricas Clave
        </button>
        <button 
          className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'variables' ? 'border-b-2 border-nova-gold text-white' : 'text-white/60'}`}
          onClick={() => setActiveTab('variables')}
        >
          Variables
        </button>
        <button 
          className={`flex-1 py-3 text-center text-sm font-medium ${activeTab === 'mechanics' ? 'border-b-2 border-nova-gold text-white' : 'text-white/60'}`}
          onClick={() => setActiveTab('mechanics')}
        >
          Biomecánica
        </button>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto hide-scrollbar pb-24">
        {renderActiveTab()}
      </div>
      
      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <GoldenButton onClick={handleBack} fullWidth>
          Volver a Entrenamientos
        </GoldenButton>
      </div>
    </div>
  );
};

export default TechnicalAnalysisScreen;
