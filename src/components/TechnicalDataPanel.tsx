
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

// Force curve data
const forceCurveData = [
  { angle: 0, hipHinge: 40, squat: 25, benchPress: 10 },
  { angle: 10, hipHinge: 65, squat: 45, benchPress: 25 },
  { angle: 20, hipHinge: 90, squat: 60, benchPress: 45 },
  { angle: 30, hipHinge: 98, squat: 75, benchPress: 65 },
  { angle: 40, hipHinge: 100, squat: 85, benchPress: 80 },
  { angle: 50, hipHinge: 95, squat: 95, benchPress: 90 },
  { angle: 60, hipHinge: 85, squat: 100, benchPress: 95 },
  { angle: 70, hipHinge: 75, squat: 98, benchPress: 100 },
  { angle: 80, hipHinge: 65, squat: 90, benchPress: 95 },
  { angle: 90, hipHinge: 55, squat: 80, benchPress: 90 },
];

const TechnicalDataPanel: React.FC = () => {
  return (
    <div className="w-full">
      <ChartContainer 
        className="h-60" 
        config={{
          benchPress: { 
            label: "Press Banca",
            color: "#00F5FF"
          },
          squat: { 
            label: "Sentadilla",
            color: "#FF2E4D" 
          },
          hipHinge: { 
            label: "Hip Hinge",
            color: "#E0E0E0" 
          }
        }}
      >
        <LineChart 
          data={forceCurveData}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />
          <XAxis 
            dataKey="angle" 
            label={{ 
              value: 'Ángulo articular (°)', 
              position: 'insideBottom',
              offset: -5,
              fill: '#fff'
            }}
            stroke="#888"
            tick={{fill: '#fff', fontSize: 10}}
          />
          <YAxis 
            label={{ 
              value: '% 1RM aplicado', 
              angle: -90, 
              position: 'insideLeft',
              fill: '#fff'
            }}
            stroke="#888"
            tick={{fill: '#fff', fontSize: 10}}
          />
          <Tooltip content={<ChartTooltipContent />} />
          
          {/* Zone indicators */}
          <ReferenceLine x={20} stroke="#FF2E4D" strokeDasharray="3 3" />
          <ReferenceLine x={60} stroke="#FF2E4D" strokeDasharray="3 3" />
          
          <Line 
            type="monotone" 
            dataKey="benchPress" 
            stroke="#00F5FF" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{r: 6, stroke: "#00F5FF", strokeWidth: 1, fill: "#121212"}}
          />
          <Line 
            type="monotone" 
            dataKey="squat" 
            stroke="#FF2E4D" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{r: 6, stroke: "#FF2E4D", strokeWidth: 1, fill: "#121212"}}
          />
          <Line 
            type="monotone" 
            dataKey="hipHinge" 
            stroke="#E0E0E0" 
            strokeWidth={2.5}
            dot={false}
            activeDot={{r: 6, stroke: "#E0E0E0", strokeWidth: 1, fill: "#121212"}}
          />
        </LineChart>
      </ChartContainer>
      <p className="text-xs text-white/70 mt-2 italic">Análisis vectorial del movimiento con EMG de superficie</p>
    </div>
  );
};

export default TechnicalDataPanel;
