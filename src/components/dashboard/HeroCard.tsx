import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface HeroCardProps {
  title: string;
  dateRange: string;
  duration: string;
  progress: number;
  onRegister: () => void;
}

const HeroCard: React.FC<HeroCardProps> = ({
  title,
  dateRange,
  duration,
  progress,
  onRegister,
}) => {
  // Calculate circle properties for progress ring
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border-2 border-primary/20 relative max-w-3xl">
      {/* Yellow Ribbon with Maroon Text - Top Left Edge */}
      <div className="absolute top-0 left-0 z-10">
        <div className="bg-accent font-bold text-xs px-5 py-2 shadow-lg relative">
          <span className="text-[#800020]">Limited Time</span>
        </div>
      </div>

      <div className="p-6 pt-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-secondary-dark mb-4">{title}</h3>
          
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-semibold text-primary text-sm">{dateRange}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-semibold text-primary text-sm">{duration}</span>
            </div>
          </div>

          <button
            onClick={onRegister}
            className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg text-sm"
          >
            Daftar Sekarang
          </button>
        </div>

        {/* Right Content - Progress Circle with Yellow Outline */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
              {/* Background circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth="10"
                fill="none"
              />
              {/* Progress circle - Yellow */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#f7b400"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-secondary-dark">{progress}%</span>
            </div>
          </div>
          <span className="text-xs font-medium text-accent bg-neutral-bg px-4 py-1 rounded-2xl border border-accent">
            Belum Dikerjakan
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
