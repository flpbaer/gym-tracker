import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dumbbell, Calendar, History } from 'lucide-react';
import { Home } from './pages/Home';
import { ExerciseList } from './pages/ExerciseList';
import { CurrentWorkout } from './pages/CurrentWorkout';
import { WorkoutHistory } from './pages/WorkoutHistory';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-white">
        <main className="container mx-auto px-4 pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/exercises" element={<ExerciseList />} />
            <Route path="/workout" element={<CurrentWorkout />} />
            <Route path="/history" element={<WorkoutHistory />} />
          </Routes>
        </main>
        
        <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex justify-around py-3">
              <Link to="/" className="flex flex-col items-center gap-1">
                <Calendar size={24} />
                <span className="text-sm">Home</span>
              </Link>
              <Link to="/exercises" className="flex flex-col items-center gap-1">
                <Dumbbell size={24} />
                <span className="text-sm">Exercícios</span>
              </Link>
              <Link to="/history" className="flex flex-col items-center gap-1">
                <History size={24} />
                <span className="text-sm">Histórico</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </BrowserRouter>
  );
}

export default App;