import React from 'react';
import { Calendar, Clock } from 'lucide-react';

interface ExamCardProps {
  title: string;
  dateRange: string;
  duration: string;
  daysLeft: number;
  variant?: 'yellow' | 'blue';
  onStart: () => void;
}

const ExamCard: React.FC<ExamCardProps> = ({
  title,
  dateRange,
  duration,
  daysLeft,
  variant = 'yellow',
  onStart,
}) => {
  const headerColors = {
    yellow: 'bg-accent',
    blue: 'bg-primary',
  };

  const textColors = {
    yellow: 'text-secondary-dark',
    blue: 'text-white',
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral-border hover:shadow-lg transition-shadow">
      {/* Header with days left */}
      <div className={`${headerColors[variant]} px-4 py-3`}>
        <span className={`text-sm font-bold ${textColors[variant]}`}>
          Waktu tersisa
        </span>
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-extrabold ${textColors[variant]}`}>
            {daysLeft}
          </span>
          <span className={`text-sm font-bold ${textColors[variant]}`}>hari</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-bold text-secondary-dark mb-3">{title}</h4>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-primary text-sm">
            <Calendar className="w-4 h-4" />
            <span>{dateRange}</span>
          </div>
          <div className="flex items-center gap-2 text-primary text-sm">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full border-2 border-primary text-primary font-bold py-2 rounded-full hover:bg-primary hover:text-white transition-all"
        >
          Mulai Kerjakan
        </button>
      </div>
    </div>
  );
};

export default ExamCard;
