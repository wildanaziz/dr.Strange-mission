import React from 'react';

const CTASection = () => {
  return (
    <section className="py-20 bg-primary-light overflow-hidden relative">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        
        {/* Text Content (Left) */}
        <div className="w-full md:w-5/12 z-20 mb-16 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary leading-snug mb-6">
            Siap tembus PTN impian? <br />
            bareng Pasti Pintar, kamu <br />
            <span className="text-accent">#PASTIBISA!</span>
          </h2>
          <p className="text-neutral-text text-lg mb-8 leading-relaxed">
            Asah kemampuanmu lewat Try-out Pasti Pintar! gratis, berkualitas, dan 100% dibuat berdasarkan soal UTBK asli!!
          </p>
          <a
            href="#pricing"
            className="inline-block px-10 py-3.5 bg-gradient-to-b from-primary to-primary-hover text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
          >
            Lihat paket
          </a>
        </div>

        {/* Visual Content (Right) */}
        <div className="w-full md:w-5/12 relative flex justify-center items-center h-[500px] md:h-[650px] select-none">
           
           {/* 
              LAYER 1: Tali Luar 2 (Outermost Decoration) 
              Animation: Spins slowly clockwise (10s)
           */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <img
                src="/assets/Tali Luar 2.png"
                alt="Decoration Ring"
                className="w-[450px] h-[450px] md:w-[550px] md:h-[550px] object-contain opacity-80 animate-[spin_10s_linear_infinite]"
              />
           </div>

           {/*
              LAYER 2: Tali Luar (Main Orbit Track)
              Animation: Spins counter-clockwise (10s)
           */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <img
                src="/assets/Tali Luar.png"
                alt="Outer Orbit Ring"
                className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] object-contain animate-[spin_10s_linear_infinite]"
              />
           </div>

           {/*
              LAYER 3: Tali Dalam (Inner Ring)
              Animation: Spins clockwise (10s)
           */}
           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <img
                src="/assets/Tali Dalam.png"
                alt="Inner Orbit Ring"
                className="w-[260px] h-[260px] md:w-[340px] md:h-[340px] object-contain animate-[spin_10s_linear_infinite]"
              />
           </div>

           {/*
              LAYER 4: Central Figure (Static)
              Placed on top of rings
           */}
           <div className="relative z-10 w-60 h-60 md:w-80 md:h-80 flex items-center justify-center">
              <img
                src="/assets/Figure Illustration.png"
                alt="Happy Students"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
           </div>

        </div>

      </div>
    </section>
  );
};

export default CTASection;