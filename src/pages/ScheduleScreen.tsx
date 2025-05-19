
import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

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
      // Here you would typically make an API call to book the appointment
      alert(`Reserva exitosa para ${daysOfWeek[selectedDay]} a las ${selectedTime}`);
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
        <h1 className="text-3xl font-poppins font-bold mb-2">Agendar Hora</h1>
        <p className="text-gray-600 dark:text-nova-lightGray">Selecciona el día y horario que prefieras</p>
      </div>
      
      {/* Calendar Week View */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-lg flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            Selecciona un día
          </h2>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map((day, index) => (
            <div
              key={day}
              onClick={() => handleDaySelect(index)}
              className={`cursor-pointer p-4 rounded-lg text-center transition-colors ${
                selectedDay === index 
                  ? 'bg-nova-red text-white' 
                  : 'bg-gray-100 dark:bg-nova-black hover:bg-gray-200 dark:hover:bg-nova-darkGray'
              }`}
            >
              <div className="font-medium">{day.substring(0, 3)}</div>
              <div className="text-lg font-bold mt-1">{currentWeekDates[index]}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Time Slots */}
      <div>
        <h2 className="font-medium text-lg mb-4">Horarios disponibles</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {timeSlots.map((time) => (
            <div
              key={time}
              onClick={() => handleTimeSelect(time)}
              className={`cursor-pointer p-3 rounded-lg text-center border transition-colors ${
                selectedTime === time
                  ? 'bg-nova-red text-white border-nova-red'
                  : 'border-gray-200 dark:border-nova-darkGray hover:border-nova-red dark:hover:border-nova-brightRed'
              }`}
            >
              {time}
            </div>
          ))}
        </div>
      </div>
      
      {/* Booking Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleBooking}
          disabled={!selectedTime}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            selectedTime
              ? 'bg-nova-red text-white hover:bg-nova-brightRed nova-button-gradient'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Confirmar Reserva
        </button>
      </div>
    </div>
  );
};

export default ScheduleScreen;
