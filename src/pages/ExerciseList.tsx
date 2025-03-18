import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Exercise } from '../types';
import { getExercises, saveExercises } from '../utils/localStorage';

export const ExerciseList: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [showForm, setShowForm] = useState(false);
  
  useEffect(() => {
    setExercises(getExercises());
  }, []);

  const handleAddExercise = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const newExercise: Exercise = {
      id: crypto.randomUUID(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      sets: Number(formData.get('sets')),
      reps: Number(formData.get('reps')),
      restTime: Number(formData.get('restTime')),
    };

    const updatedExercises = [...exercises, newExercise];
    setExercises(updatedExercises);
    saveExercises(updatedExercises);
    setShowForm(false);
    form.reset();
  };

  const handleDelete = (id: string) => {
    const updatedExercises = exercises.filter(ex => ex.id !== id);
    setExercises(updatedExercises);
    saveExercises(updatedExercises);
  };

  const groupedExercises = exercises.reduce((acc, exercise) => {
    if (!acc[exercise.category]) acc[exercise.category] = [];
    acc[exercise.category].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Exercícios</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn btn-primary">
          <Plus size={20} className="inline mr-2" />
          Adicionar
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddExercise} className="card mb-6 space-y-4">
          <div>
            <label className="block mb-1">Nome do exercício</label>
            <input type="text" name="name" required className="input w-full" placeholder="Ex: Supino reto" />
          </div>

          <div>
            <label className="block mb-1">Categoria</label>
            <select name="category" required className="input w-full">
              <option value="peito">Peito</option>
              <option value="costas">Costas</option>
              <option value="pernas">Pernas</option>
              <option value="ombros">Ombros</option>
              <option value="bracos">Braços</option>
              <option value="abdomen">Abdômen</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Séries</label>
              <input type="number" name="sets" required min="1" className="input w-full" />
            </div>
            <div>
              <label className="block mb-1">Repetições</label>
              <input type="number" name="reps" required min="1" className="input w-full" />
            </div>
            <div>
              <label className="block mb-1">Descanso (s)</label>
              <input type="number" name="restTime" required min="0" className="input w-full" />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="btn bg-gray-700 hover:bg-gray-600">Cancelar</button>
            <button type="submit" className="btn btn-primary">Salvar</button>
          </div>
        </form>
      )}

      {Object.entries(groupedExercises).map(([category, exercises]) => (
        <div key={category} className="mb-4">
          <h2 className="text-xl font-semibold mb-2 capitalize">{category}</h2>
          <div className="space-y-2">
            {exercises.map(exercise => (
              <div key={exercise.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{exercise.name}</h3>
                    <div className="mt-2 text-sm text-gray-300">
                      {exercise.sets} séries × {exercise.reps} repetições
                      <span className="mx-2">•</span>
                      {exercise.restTime}s descanso
                    </div>
                  </div>
                  <button onClick={() => handleDelete(exercise.id)} className="p-2 text-red-400 hover:text-red-300">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
