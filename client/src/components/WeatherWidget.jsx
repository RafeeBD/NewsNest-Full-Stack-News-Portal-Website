import React, { useState, useEffect } from 'react';
import { Sun, Calendar, MapPin } from 'lucide-react';

const WeatherWidget = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    setCurrentDate(now.toLocaleDateString('en-US', options));
  }, []);

  return (
    <div className="hidden md:flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
      <div className="flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5 text-rose-500" />
        <span>{currentDate}</span>
      </div>
      <div className="h-3 w-[1px] bg-slate-200 dark:bg-slate-800" />
      <div className="flex items-center gap-1.5">
        <MapPin className="w-3.5 h-3.5 text-sky-500" />
        <span>Global Edition</span>
      </div>
      <div className="h-3 w-[1px] bg-slate-200 dark:bg-slate-800" />
      <div className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
        <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
        <span>24°C Sunny</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
