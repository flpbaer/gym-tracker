import React, { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';

interface TimerProps {
  onTick?: (time: number) => void;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ onTick, className }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: number;
    
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prev => {
          const newTime = prev + 1;
          onTick?.(newTime);
          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, onTick]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
    onTick?.(0);
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="text-2xl font-mono">{formatTime(time)}</span>
      <button
        onClick={() => setIsRunning(!isRunning)}
        className="p-2 rounded-full bg-primary hover:bg-primary/80"
      >
        {isRunning ? <Pause size={20} /> : <Play size={20} />}
      </button>
      <button
        onClick={handleReset}
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
      >
        <RefreshCw size={20} />
      </button>
    </div>
  );
};