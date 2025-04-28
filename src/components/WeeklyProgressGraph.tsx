
import React from 'react';

interface DayProgress {
  day: string;
  completed: boolean;
  percentage: number; // 0-100
  date: string; // "Lun 15"
}

interface WeeklyProgressGraphProps {
  days: DayProgress[];
  onDayClick: (day: string) => void;
}

const WeeklyProgressGraph: React.FC<WeeklyProgressGraphProps> = ({ days, onDayClick }) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center relative px-2">
        {/* Connection line */}
        <div className="absolute h-1 bg-white/30 left-[10%] right-[10%] top-1/2 transform -translate-y-1/2 z-0" />
        
        {/* Day bubbles */}
        {days.map((day, index) => (
          <div 
            key={day.day} 
            className="flex flex-col items-center z-10"
            onClick={() => onDayClick(day.day)}
          >
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 cursor-pointer transition-transform hover:scale-110
                ${day.completed 
                  ? 'nova-button-gradient shadow-nova border border-white/70' 
                  : 'bg-white/20 border border-white/40'}`
              }
            >
              <span className="font-poppins font-bold text-white text-shadow">
                {day.date.split(' ')[0]}
              </span>
            </div>
            <span className="text-xs text-white/80">{day.date.split(' ')[1]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyProgressGraph;
