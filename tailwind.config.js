/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#121212',
        primary: '#6366f1',
        secondary: '#4f46e5',
        surface: '#1e1e1e',
        'surface-light': '#2d2d2d',
      },
    },
  },
  plugins: [],
};