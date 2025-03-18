import React, { useState, useEffect } from 'react';
import { Timer } from '../components/Timer';
import { Modal } from '../components/Modal';
import { Exercise, WorkoutSession, ExerciseLog } from '../types';
import { getExercises, getSessions, saveSessions } from '../utils/localStorage';
import { Check, CheckCircle2 } from 'lucide-react';
import { cn } from '../utils/cn';

export const CurrentWorkout: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [totalTime, setTotalTime] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [showSummary, setShowSummary] = useState(false);
  const [manualTime, setManualTime] = useState('');

  useEffect(() => {
    setExercises(getExercises());
  }, []);

  const handleCompleteExercise = (id: string) => {
    setCompletedExercises(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleFinishWorkout = () => {
    const session: WorkoutSession = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      totalTime: manualTime ? parseInt(manualTime) * 60 : totalTime,
      exercises: exercises
        .filter(ex => completedExercises.has(ex.id))
        .map(ex => ({
          exerciseId: ex.id,
          sets: Array(ex.sets).fill({ reps: ex.reps, time: 0 })
        }))
    };

    const sessions = getSessions();
    saveSessions([...sessions, session]);
    setShowSummary(false);
    setCompletedExercises(new Set());
    setTotalTime(0);
  };

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Treino Atual</h1>
        <Timer onTick={setTotalTime} />
      </div>

      <div className="space-y-4">
        {exercises.map(exercise => {
          const isCompleted = completedExercises.has(exercise.id);
          return (
            <div key={exercise.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{exercise.name}</h3>
                  <p className="text-gray-400 capitalize">{exercise.category}</p>
                  <div className="text-sm text-gray-300">
                    {exercise.sets} séries × {exercise.reps} repetições
                    <span className="mx-2">•</span>
                    {exercise.restTime}s descanso
                  </div>
                  <Timer className="mt-2" />
                </div>
                <button
                  onClick={() => handleCompleteExercise(exercise.id)}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    isCompleted ? "text-green-500" : "text-gray-400 hover:text-gray-300"
                  )}
                >
                  <CheckCircle2 size={24} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {completedExercises.size > 0 && (
        <button
          onClick={() => setShowSummary(true)}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 btn btn-primary"
        >
          Finalizar Treino
        </button>
      )}

      <Modal
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        title="Resumo do Treino"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-2">Tempo Total (minutos)</label>
            <input
              type="number"
              value={manualTime}
              onChange={(e) => setManualTime(e.target.value)}
              placeholder={Math.floor(totalTime / 60).toString()}
              className="input w-full"
            />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Exercícios Concluídos</h3>
            <div className="space-y-2">
              {exercises
                .filter(ex => completedExercises.has(ex.id))
                .map(ex => (
                  <div key={ex.id} className="flex items-center gap-2 text-green-500">
                    <Check size={16} />
                    <span>{ex.name}</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => setShowSummary(false)}
              className="btn bg-gray-700 hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleFinishWorkout}
              className="btn btn-primary"
            >
              Confirmar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};