import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from '../components/Calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getSessions } from '../utils/localStorage';
import { Dumbbell, History, Timer } from 'lucide-react';

export const Home: React.FC = () => {
  const sessions = getSessions();
  const trainedDates = sessions.map(s => format(new Date(s.date), 'yyyy-MM-dd'));
  const today = new Date();
  
  const lastSession = sessions[sessions.length - 1];
  const averageTime = sessions.length > 0
    ? Math.floor(sessions.reduce((acc, s) => acc + s.totalTime, 0) / sessions.length / 60)
    : 0;

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Olá!</h1>
        <span className="text-gray-400">
          {format(today, "dd 'de' MMMM", { locale: ptBR })}
        </span>
      </div>

      <div className="grid gap-4 mb-6">
        <Link
          to="/workout"
          className="card bg-primary hover:bg-primary/90 transition-colors"
        >
          <div className="flex items-center gap-4 p-2">
            <div className="p-3 bg-white/10 rounded-lg">
              <Dumbbell size={24} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Iniciar Treino</h2>
              <p className="text-sm text-white/70">
                {sessions.length} treinos realizados
              </p>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4">
          <div className="card">
            <div className="flex flex-col items-center gap-2">
              <Timer className="text-primary" size={24} />
              <div className="text-center">
                <div className="text-2xl font-bold">{averageTime}min</div>
                <div className="text-sm text-gray-400">Tempo médio</div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex flex-col items-center gap-2">
              <History className="text-primary" size={24} />
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {lastSession
                    ? format(new Date(lastSession.date), 'dd/MM', { locale: ptBR })
                    : '--/--'
                  }
                </div>
                <div className="text-sm text-gray-400">Último treino</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Calendar trainedDates={trainedDates} />
    </div>
  );
};