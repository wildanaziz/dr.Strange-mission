import React from 'react';
import { Twitter } from 'lucide-react';
import { TESTIMONIALS } from '../../constants';

interface TestimonialCardProps {
  item: typeof TESTIMONIALS[0];
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ item }) => (
  <div className="w-[350px] md:w-[400px] bg-white p-6 rounded-3xl shadow-sm border border-neutral-border flex-shrink-0 hover:shadow-md transition-all h-full mx-4 flex flex-col justify-between">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <img
          src={item.avatar}
          alt={item.name}
          className="w-12 h-12 rounded-full object-cover border border-neutral-border"
        />
        <div>
          <h4 className="font-bold text-neutral-text leading-none mb-1 text-base">{item.name}</h4>
          <p className="text-neutral-text/60 text-sm font-medium">{item.handle}</p>
        </div>
      </div>
      <div className="bg-[#1DA1F2] p-2 rounded-lg">
          <Twitter className="w-5 h-5 text-white fill-white" />
      </div>
    </div>
    <p className="text-neutral-text text-base leading-relaxed font-medium">
      {item.content}
    </p>
    {/* Add subtle date or metrics if needed to match tweet style more closely */}
    <div className="mt-4 pt-4 border-t border-neutral-bg flex gap-4 text-neutral-text/40 text-xs">
        <span>10:42 AM · Jun 22, 2025</span>
    </div>
  </div>
);

const Testimonials = () => {
  // Split testimonials into two groups for two rows
  const midPoint = Math.ceil(TESTIMONIALS.length / 2);
  const rowOne = TESTIMONIALS.slice(0, midPoint);
  const rowTwo = TESTIMONIALS.slice(midPoint);

  return (
    <section id="testimonials" className="py-1 bg-primary-light overflow-hidden relative font-sans">
      <div className="container mx-auto px-6 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mb-6 tracking-tight">
          Pengalaman Mereka Bersama Pasti Pintar
        </h2>
        <p className="text-neutral-text text-lg max-w-3xl mx-auto font-medium">
           Ribuan siswa telah membuktikan efektivitas metode belajar kami. Sekarang giliranmu!
        </p>
      </div>

      <div className="relative w-full flex flex-col gap-8">
         {/* Gradient masks for fading effect at edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-primary-light to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-primary-light to-transparent pointer-events-none"></div>

        {/* Row 1: Scroll Left */}
        <div className="flex w-full overflow-hidden group">
            {/* Increased duration to 120s to slow down the scroll speed significantly */}
            <div className="flex animate-[scroll-left_120s_linear_infinite] group-hover:[animation-play-state:paused]">
                {/* Triple list for seamless loop */}
                {[...rowOne, ...rowOne, ...rowOne].map((item, index) => (
                    <TestimonialCard key={`row1-${index}`} item={item} />
                ))}
            </div>
        </div>

        {/* Row 2: Scroll Right */}
        <div className="flex w-full overflow-hidden group">
            {/* Increased duration to 120s to slow down the scroll speed significantly */}
            <div className="flex animate-[scroll-right_120s_linear_infinite] group-hover:[animation-play-state:paused]">
                {/* Triple list for seamless loop */}
                 {[...rowTwo, ...rowTwo, ...rowTwo].map((item, index) => (
                    <TestimonialCard key={`row2-${index}`} item={item} />
                ))}
            </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;