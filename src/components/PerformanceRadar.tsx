
import React from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend 
} from 'recharts';

interface PerformanceDataPoint {
  axis: string;
  value: number;
}

interface PerformanceRadarProps {
  data: PerformanceDataPoint[];
}

const PerformanceRadar: React.FC<PerformanceRadarProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <RadarChart 
        cx="50%" 
        cy="50%" 
        outerRadius="70%" 
        width={300} 
        height={220} 
        data={data}
      >
        <PolarGrid stroke="#444" />
        <PolarAngleAxis 
          dataKey="axis" 
          tick={{ fill: '#fff', fontSize: 9 }} 
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: '#fff', fontSize: 8 }}
          tickCount={5}
          stroke="#444"
        />
        <Radar 
          name="Rendimiento" 
          dataKey="value" 
          stroke="#00F5FF" 
          fill="#00F5FF" 
          fillOpacity={0.3} 
        />
        <Legend 
          wrapperStyle={{
            backgroundColor: '#00000020', 
            borderRadius: 3, 
            padding: '2px 5px', 
            fontSize: '9px',
            color: '#fff'
          }} 
        />
      </RadarChart>
    </div>
  );
};

export default PerformanceRadar;
