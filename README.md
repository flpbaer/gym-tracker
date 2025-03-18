# Gym Tracker

## 📱 About the Project
This project is a Progressive Web App (PWA) designed to help track and organize weekly workouts easily. It allows you to log completed exercises, check workout history, and plan future sessions.

## 🗂️ Project Structure
```
📁 src
 ├── 📁 components
 │    ├── Calendar.tsx: Calendar component.
 │    ├── Modal.tsx: Custom modal component.
 │    ├── Timer.tsx: Timer for exercise intervals.
 │    └── 📁 animated: Animated components for enhanced user experience.
 ├── 📁 pages
 │    ├── CurrentWorkout.tsx: Screen to log the current workout.
 │    ├── ExerciseList.tsx: List of available exercises.
 │    ├── Home.tsx: Main app screen.
 │    └── WorkoutHistory.tsx: History of completed workouts.
 ├── 📁 types
 │    └── index.ts: Shared types used across the project.
 ├── 📁 utils
 │    └── localStorage.ts: Hook for Local Storage data handling.
 ├── App.tsx: Root app component.
 ├── index.css: Global styles.
 ├── main.tsx: App entry point.
 └── vite-env.d.ts: Vite environment configuration.
```

## 🔧 Technologies Used
- **React** with **TypeScript**
- **Vite** for fast build
- **Local Storage** for offline data persistence
- **CSS Modules** for styling
- **PWA** for offline use and installation

## 🚀 Features
- Log exercises during workouts
- Check workout history
- Timer for intervals
- Modal for additional information

## 🔮 Future Improvements
- Add user authentication
- Integrate APIs for workout suggestions
- Performance charts

## 📂 How to Run the Project
1. Clone the repository
```bash
  git clone <REPOSITORY_URL>
```
2. Install dependencies
```bash
  npm install
```
3. Run the project
```bash
  npm run dev
```

