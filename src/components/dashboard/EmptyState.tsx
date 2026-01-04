import React from 'react';
import { Info, Plus } from 'lucide-react';

interface EmptyStateProps {
  onRegister: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ onRegister }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-white rounded-2xl border border-neutral-border">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Info className="w-10 h-10 text-primary" />
      </div>
      
      <h3 className="text-xl font-bold text-secondary-dark mb-2 text-center">
        Kamu belum mendaftar Try Out
      </h3>
      <p className="text-neutral-text text-center mb-8 max-w-md">
        Kamu belum mendaftar Try Out. Daftar Try Out gratis untuk mulai latihan!
      </p>
      
      <button
        onClick={onRegister}
        className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-white font-bold px-8 py-3 rounded-full transition-all shadow-lg hover:shadow-xl"
      >
        <Plus className="w-5 h-5" />
        Daftar Try Out
      </button>
    </div>
  );
};

export default EmptyState;
