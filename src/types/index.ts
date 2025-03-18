export interface Exercise {
  id: string;
  name: string;
  category: string;
  sets: number;
  reps: number;
  restTime: number; // in seconds
}

export interface WorkoutSession {
  id: string;
  date: string;
  totalTime: number; // in seconds
  exercises: ExerciseLog[];
}

export interface ExerciseLog {
  exerciseId: string;
  sets: SetLog[];
}

export interface SetLog {
  reps: number;
  weight?: number;
  time: number; // in seconds
}