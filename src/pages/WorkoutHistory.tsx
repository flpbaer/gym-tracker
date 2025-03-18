import React, { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar } from '../components/Calendar';
import { getSessions } from '../utils/localStorage';

export const WorkoutHistory: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const sessions = getSessions();
  const trainedDates = sessions.map(s => format(new Date(s.date), 'yyyy-MM-dd'));

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-6">Histórico de Treinos</h1>
      
      <Calendar
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        trainedDates={trainedDates}
      />

      <div className="mt-6 space-y-4">
        {sessions.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-400">Nenhum treino registrado ainda</p>
          </div>
        ) : (
          sessions.map(session => (
            <div key={session.id} className="card">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {format(new Date(session.date), "dd 'de' MMMM", { locale: ptBR })}
                  </h3>
                  <span className="text-gray-400">
                    {Math.floor(session.totalTime / 60)} min
                  </span>
                </div>
                <div className="text-sm text-gray-300">
                  {session.exercises.length} exercícios
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};