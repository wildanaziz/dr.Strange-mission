import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ACCORDION_WHY_US } from '../../constants';

// Master list of all images used in the component
// Indices 0-2: Default Slideshow (Indonesian Top PTN)
// Index 3: HOTS (For Accordion Point 2)
// Index 4: explain (For Accordion Point 3)
// Index 5: doing (For Accordion Point 4)
const ALL_IMAGES = [
  // Default Slideshow Images
  "/assets/UGM-BG-42.jpg",
  "/assets/ITB-BG.webp",
  "/assets/UI-BG.jpg",

  // Specific Images
  "/assets/HOTS.png",
  "/assets/explain.png",
  "/assets/doing.png"
];

const WhyUs = () => {
  const [openIndex, setOpenIndex] = useState<number>();
  const [slideshowIndex, setSlideshowIndex] = useState(0);

  // Effect to handle the default slideshow (only runs when first item is active)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (openIndex !== 0) {
      interval = setInterval(() => {
        setSlideshowIndex((prev) => (prev + 1) % 3); // Cycle through indices 0, 1, 2
      }, 4000);
    }

    return () => clearInterval(interval);
  }, [openIndex]);

  const toggleAccordion = (index: number) => {
    // If clicking the already open item, revert to default (0). 
    // Otherwise open the new index.
    if (openIndex === index) {
      setOpenIndex();
    } else {
      setOpenIndex(index);
    }
  };

  // Determine which image from ALL_IMAGES to display
  const getActiveImageIndex = () => {
    if (openIndex === 1) return 3; // Accordion Poin 2 
    if (openIndex === 2) return 4; // Accordion Poin 3
    if (openIndex === 3) return 5; // Accordion Poin 4
    
    // Default (Accordion Poin 1)
    return slideshowIndex; 
  };

  const activeImageIndex = getActiveImageIndex();

  return (
    <section className="py-20 bg-neutral-bg">
      <div className="container mx-auto px-6">
        
        {/* Centered Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-text mb-4">
            Kenapa bersama <span className="text-primary">Pasti</span> <span className="text-accent">Pintar</span> ?
          </h2>
          <p className="text-neutral-text/80 text-lg md:text-xl">
            Karena Soal HOTS Try-Out Pasti Pintar sudah terbukti membantu<br className="hidden md:block"/>
            banyak siswa lolos ke <span className="font-bold text-neutral-text">PTN ternama!</span>
          </p>
        </div>

        {/* Content Area */}
        <div className="flex flex-col lg:flex-row items-stretch gap-12 lg:gap-16 min-h-[450px]">
          
          {/* Left Column: Image Display */}
          <div className="w-full lg:w-1/2 h-auto">
            <div className="h-full w-full p-2 bg-white rounded-3xl shadow-lg border border-neutral-border hover:shadow-xl transition-shadow duration-300 relative flex flex-col">
              <div className="relative flex-grow w-full rounded-2xl overflow-hidden bg-neutral-bg min-h-[300px]">
                {ALL_IMAGES.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Visual ${index}`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                            activeImageIndex === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    />
                ))}
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-secondary-dark/10 pointer-events-none z-20"></div>
                
                {/* Label Overlay */}
                <div className="absolute bottom-4 left-4 z-30 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                    <p className="text-white text-xs font-medium tracking-wide">
                        {activeImageIndex <= 2 && "Kampus Impian di Indonesia"}
                        {activeImageIndex === 3 && "Soal Standar Berkualitas"}
                        {activeImageIndex === 4 && "Video Pembahasan Mendalam"}
                        {activeImageIndex === 5 && "Try Out Dimanapun & Kapanpun"}
                    </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-4">
            {ACCORDION_WHY_US.map((item, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden transition-all duration-300 ${
                    openIndex === index 
                    ? 'bg-primary-light border-l-4 border-primary shadow-md' 
                    : 'border-primary-light bg-primary-light/50 hover:bg-primary-light/80 border-l-4 border-transparent'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none group"
                >
                  <span className={`font-bold text-base md:text-lg pr-4 leading-snug transition-colors ${
                      openIndex === index ? 'text-primary' : 'text-neutral-text group-hover:text-primary'
                  }`}>
                    {item.title}
                  </span>
                  <ChevronDown
                    className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${
                        openIndex === index ? 'text-primary' : 'text-neutral-text/50'
                    } ${openIndex === index ? 'rotate-180' : ''}`}
                    strokeWidth={2.5}
                  />
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-48 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 text-neutral-text/80 text-sm md:text-base leading-relaxed">
                    {item.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;