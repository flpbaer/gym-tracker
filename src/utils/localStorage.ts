import { Exercise, WorkoutSession } from '../types';

const EXERCISES_KEY = 'workout-tracker-exercises';
const SESSIONS_KEY = 'workout-tracker-sessions';

export const saveExercises = (exercises: Exercise[]) => {
  localStorage.setItem(EXERCISES_KEY, JSON.stringify(exercises));
};

export const getExercises = (): Exercise[] => {
  const exercises = localStorage.getItem(EXERCISES_KEY);
  return exercises ? JSON.parse(exercises) : [];
};

export const saveSessions = (sessions: WorkoutSession[]) => {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

export const getSessions = (): WorkoutSession[] => {
  const sessions = localStorage.getItem(SESSIONS_KEY);
  return sessions ? JSON.parse(sessions) : [];
};