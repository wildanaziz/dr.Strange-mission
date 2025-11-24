import React, { useEffect, useState, useRef } from 'react';
import { UNIVERSITIES } from '../../constants';

const JejaringPintar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger only once
        }
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="pt-16 md:pt-20 pb-10 bg-gradient-to-b from-neutral-bg to-primary-light relative overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-0 md:gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left z-20 mb-2 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mb-4 leading-tight">
              Jadi Bagian dari <br />
              <span className="text-accent">#JejaringPintar!</span>
            </h2>
            <p className="text-neutral-text text-lg md:text-xl mb-6 md:mb-8 leading-relaxed font-medium">
              Ikuti jejak mereka yang sukses tembus <br className="hidden md:block" />
              PTN impian bareng <span className="font-bold text-secondary">#JejaringPintar!</span>
            </p>
            <a
              href="#testimonials"
              className="px-10 py-4 bg-primary hover:bg-primary-hover text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Lihat Selengkapnya
            </a>
          </div>

          {/* Image Content with Appear Up Animation */}
          {/* Added mb-12 to lift the gradient/image block up from the ticker */}
          {/* Adjusted height and margin-top for mobile AND tablet to reduce gap */}
          <div className="w-full md:w-1/2 flex justify-center items-end relative h-[320px] md:h-[400px] lg:h-[500px] -mt-4 md:-mt-12 lg:mt-120 mb-12">
             
             {/* Animation Container */}
             <div className="relative w-full h-full flex items-end justify-center overflow-hidden">
                
                {/* 
                   The Image Group 
                   Uses state-based class switching triggered by IntersectionObserver.
                   starts translated down and invisible, moves to 0 and visible.
                */}
                <img
                  src="/assets/graduation-image.png"
                  alt="Graduation Students"
                  className={`w-auto h-[90%] md:h-[95%] object-contain object-bottom z-10 transition-all duration-[1500ms] ease-out transform ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30%]'
                  }`}
                />

                {/* Bottom Gradient Threshold / Mask 
                    This creates the "emerging from the mist" look at the very bottom line 
                */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary-light via-primary-light/80 to-transparent z-20 pointer-events-none"></div>
             </div>
          </div>
        </div>

        {/* Integrated Logo Ticker - Positioned below the image baseline */}
        <div className="relative w-full overflow-hidden py-4">
            <div className="flex animate-scroll-left whitespace-nowrap w-max hover:[animation-play-state:paused]">
                {[...UNIVERSITIES, ...UNIVERSITIES, ...UNIVERSITIES].map((uni, idx) => (
                    <div key={idx} className="mx-6 flex flex-col items-center justify-center group cursor-pointer">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-border group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                             <img 
                                src={uni.logoUrl}
                                alt={uni.name}
                                className="w-full h-full object-contain p-2.5 grayscale group-hover:grayscale-0 transition-all"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default JejaringPintar;