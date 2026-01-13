import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import './DatePicker.css';

const DatePicker = ({ value, onChange, placeholder = "Select date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const startDay = firstDay.getDay();
    
    // Previous month days
    for (let i = startDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    return days;
  };

  const calendarDays = generateCalendar(currentDate);

  return (
    <div className="date-picker">
      <div 
        className="date-input"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Calendar size={18} />
        <span>{value ? value.toDateString() : placeholder}</span>
      </div>

      {isOpen && (
        <div className="date-picker-popup">
          <div className="calendar-header">
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
              <ChevronLeft size={16} />
            </button>
            <h4>
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </h4>
            <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-header">{day}</div>
            ))}
            
            {calendarDays.map((day, index) => (
              <button
                key={index}
                className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${
                  value && day.date.toDateString() === value.toDateString() ? 'selected' : ''
                }`}
                onClick={() => {
                  onChange(day.date);
                  setIsOpen(false);
                }}
                disabled={!day.isCurrentMonth}
              >
                {day.date.getDate()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;