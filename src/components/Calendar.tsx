import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '../utils/cn';

interface CalendarProps {
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
  trainedDates?: string[];
}

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate = new Date(),
  onSelectDate,
  trainedDates = []
}) => {
  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="p-4 card">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold">
          {format(selectedDate, 'MMMM yyyy', { locale: ptBR })}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
          <div key={i} className="text-center text-sm text-gray-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => {
          const isSelected = trainedDates.includes(format(day, 'yyyy-MM-dd'));
          return (
            <button
              key={i}
              onClick={() => onSelectDate?.(day)}
              className={cn(
                "h-10 rounded-full flex items-center justify-center text-sm",
                !isSameMonth(day, selectedDate) && "text-gray-500",
                isToday(day) && "border border-primary",
                isSelected && "bg-primary text-white",
                !isSelected && "hover:bg-gray-700"
              )}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};