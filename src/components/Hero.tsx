import React from 'react';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-center pt-20 overflow-hidden bg-secondary-dark"
    >
      {/* Full Background Image */}
      <img
        src="/assets/hero-bg.png" 
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover object-center z-0 opacity-90"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-secondary-dark/40 z-0"></div>

      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center h-full justify-center text-center">
        
        {/* Main Text Content */}
        <div className="max-w-4xl mx-auto mt-10 md:mt-0">
          <h1 className="text-4xl md:text-6xl lg:text-[64px] font-extrabold text-white leading-tight mb-6 drop-shadow-lg">
            Lolos UTBK SNBT 2026, <br />
            <span className="uppercase">#PASTIBISA</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-neutral-bg/90 font-normal mb-10 max-w-2xl mx-auto leading-relaxed">
            Raih skor UTBK terbaik dengan try-out <br className="hidden md:block"/> 
            terbaik, GRATIS!
          </p>
          
          <button className="px-10 py-4 bg-gradient-to-r from-primary to-primary-hover text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50 transition-all transform hover:-translate-y-1 text-lg">
            Daftar Try-Out Gratis
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;