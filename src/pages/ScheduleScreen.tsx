
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import GoldenButton from '../components/GoldenButton';
import { toast } from 'sonner';

const timeSlots = [
  "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const ScheduleScreen: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  const handleDaySelect = (index: number) => {
    setSelectedDay(index);
    setSelectedTime(null); // Reset time selection when changing day
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleBooking = () => {
    if (selectedTime) {
      toast.success(`Reserva exitosa para ${daysOfWeek[selectedDay]} a las ${selectedTime}`);
    }
  };

  // Get current date and calculate the week's dates
  const today = new Date();
  const currentWeekDates = daysOfWeek.map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - today.getDay() + 1 + index);
    return date.getDate();
  });
  
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-gothic uppercase tracking-wider mb-2">Agendar Hora</h1>
        <div className="gothic-divider"></div>
        <p className="text-nova-gold mt-4">Selecciona el día y horario que prefieras</p>
      </div>
      
      {/* Calendar Week View */}
      <div className="mb-8 gothic-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-gothic text-lg flex items-center text-white">
            <CalendarIcon className="mr-2 h-5 w-5 text-nova-gold" />
            Selecciona un día
          </h2>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              onClick={() => handleDaySelect(index)}
              className={`cursor-pointer p-4 gothic-card transition-colors ${
                selectedDay === index 
                  ? 'border-nova-red bg-nova-darkGray' 
                  : 'hover:border-nova-gold'
              }`}
            >
              <div className="font-gothic uppercase">{day.substring(0, 3)}</div>
              <div className="text-lg font-bold mt-1 text-nova-gold">{currentWeekDates[index]}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Time Slots */}
      <div className="gothic-card p-6">
        <h2 className="font-gothic text-lg mb-4 text-white">Horarios disponibles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {timeSlots.map((time) => (
            <div
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`cursor-pointer p-3 text-center transition-colors ${
                selectedTime === time
                  ? 'border nova-button-gradient text-white'
                  : 'border border-nova-gray/30 hover:border-nova-red'
              }`}
            >
              {time}
            </div>
          ))}
        </div>
        
        {/* Booking Button */}
        <div className="mt-8 text-center">
          <GoldenButton
            onClick={handleBooking}
            disabled={!selectedTime}
            className={`px-8 py-3 ${!selectedTime ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Confirmar Reserva
          </GoldenButton>
        </div>
      </div>
    </div>
  );
};

export default ScheduleScreen;
