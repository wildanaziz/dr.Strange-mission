import React from 'react';
import ExamCard from './ExamCard';
import EmptyState from './EmptyState';

interface Exam {
  id: string;
  title: string;
  dateRange: string;
  duration: string;
  daysLeft: number;
  variant: 'yellow' | 'blue';
}

interface ExamGridProps {
  exams: Exam[];
  onStartExam: (examId: string) => void;
  onRegister: () => void;
}

const ExamGrid: React.FC<ExamGridProps> = ({ exams, onStartExam, onRegister }) => {
  // Show empty state if no exams
  if (exams.length === 0) {
    return <EmptyState onRegister={onRegister} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {exams.map((exam, index) => (
        <ExamCard
          key={exam.id}
          title={exam.title}
          dateRange={exam.dateRange}
          duration={exam.duration}
          daysLeft={exam.daysLeft}
          variant={index % 2 === 0 ? 'yellow' : 'blue'}
          onStart={() => onStartExam(exam.id)}
        />
      ))}
    </div>
  );
};

export default ExamGrid;
