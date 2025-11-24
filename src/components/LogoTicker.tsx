import React from 'react';
import { UNIVERSITIES } from '../../constants';
import { GraduationCap } from 'lucide-react';

interface LogoTickerProps {
    direction?: 'left' | 'right';
}

const LogoTicker: React.FC<LogoTickerProps> = ({ direction = 'left' }) => {
  const animateClass = direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right';

  return (
    <section className="py-10 bg-white border-y border-neutral-border overflow-hidden">
      <div className="container mx-auto px-6 mb-6 text-center">
          <p className="text-neutral-text/60 font-medium text-sm uppercase tracking-widest">
              Siap Tembus PTN Impian Bareng #JejaringPintar
          </p>
      </div>
      <div className="flex relative w-full overflow-hidden group">
          {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent"></div>
        
        <div className={`flex gap-12 w-max ${animateClass} group-hover:[animation-play-state:paused]`}>
            {/* Triple the list to ensure smooth loop */}
          {[...UNIVERSITIES, ...UNIVERSITIES, ...UNIVERSITIES].map((uni, index) => (
            <div key={index} className="flex flex-col items-center justify-center opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 min-w-[120px]">
              <div className="w-16 h-16 bg-neutral-bg rounded-full flex items-center justify-center mb-2 border border-neutral-border">
                  {/* Placeholder for Uni Logo */}
                  <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <span className="text-xs font-bold text-neutral-text text-center w-32 truncate">{uni.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;