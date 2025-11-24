import React, { useState } from 'react';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { PRICING_PLANS } from '../../constants';

const Pricing = () => {
  // State for Mobile Slider
  const [activeIndex, setActiveIndex] = useState(0); 

  // DESKTOP: Keep original order (Jaya, Tembus, Lulus)
  const desktopPlans = PRICING_PLANS;

  // MOBILE: Reorder as requested (Tembus, Lulus, Jaya)
  // Tembus is index 1, Lulus is index 2, Jaya is index 0 in original constant
  const mobileOrderedPlans = [
    PRICING_PLANS[1], // PastiTembus (Gratis) - First
    PRICING_PLANS[2], // PastiLulus - Second
    PRICING_PLANS[0]  // PastiJaya - Third
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, mobileOrderedPlans.length - 1));
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-primary-light/50 to-neutral-bg">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl font-extrabold text-primary mb-4">
            Paket Ujian
          </h2>
          <p className="text-neutral-text max-w-xl mx-auto text-lg">
            Pilih paket yang sesuai dengan kebutuhan belajarmu. Mulai dari gratis hingga intensif.
          </p>
        </div>

        {/*DESKTOP VIEW (Connected Cards)*/}
        <div className="hidden md:flex flex-row items-end justify-center w-full max-w-6xl mx-auto drop-shadow-sm filter">
          {desktopPlans.map((plan, index) => {
            const isCenter = plan.recommended; // PastiTembus (Center)
            const isFirst = index === 0;
            const isLast = index === desktopPlans.length - 1;

            return (
              <div
                key={`desktop-${index}`}
                className={`
                  relative flex flex-col w-1/3 transition-all duration-300
                  ${isCenter 
                    ? 'z-10 shadow-2xl pb-10 pt-16 -mx-[1px]' 
                    : 'bg-[#F0F9FF] pb-8 pt-8 z-0'
                  }
                  
                  /* Border Logic */
                  border-t border-l border-r border-transparent
                  ${isCenter ? 'border-b-[8px] border-b-accent' : 'border-b-[8px] border-b-primary'}
                  
                  /* Thin borders for definition */
                  before:absolute before:inset-0 before:border before:border-transparent before:pointer-events-none before:z-20
                  ${isFirst ? 'before:border-l before:border-t before:border-primary/20 border-r-0' : ''}
                  ${isLast ? 'before:border-r before:border-t before:border-primary/20 border-l-0' : ''}
                  ${isCenter ? 'before:border-x before:border-t before:border-accent/30 rounded-[40px] rounded-b-none' : ''}

                  /* Rounded Corners */
                  ${isFirst ? 'rounded-tl-[40px] rounded-bl-[40px] rounded-tr-none' : ''}
                  ${isLast ? 'rounded-tr-[40px] rounded-br-[40px] rounded-bl-none rounded-l-none' : ''}
                `}
              >
                {/* Center Card White Background Layer */}
                {isCenter && (
                  <div className="absolute inset-0 bg-white rounded-[40px] rounded-b-none -z-10"></div>
                )}

                {/* Content */}
                <div className="px-8 text-center relative z-0">
                  <h3 className="text-xl font-bold text-neutral-text mb-1">{plan.name}</h3>
                  <div className="flex flex-col items-center justify-center min-h-[5rem]">
                     {plan.originalPrice && (
                        <span className="text-semantic-red line-through text-lg font-bold relative top-2">
                          {plan.originalPrice}
                        </span>
                      )}
                      
                      {isCenter ? (
                          <span className="text-5xl font-extrabold text-accent drop-shadow-sm tracking-wide mt-2">
                            {plan.price}
                          </span>
                      ) : (
                          <span className="text-4xl font-bold text-neutral-text mt-2">
                             {plan.price}
                          </span>
                      )}
                  </div>
                  
                  <div className="text-sm text-neutral-text/70 mt-4 leading-relaxed px-2">
                     Lorem lorem Lorem lorem Lorem lorem
                     Lorem lorem Lorem lorem Lorem lorem
                  </div>
                </div>

                <div className="w-full px-8 my-6 relative z-0">
                    <div className="h-px w-full bg-neutral-border"></div>
                </div>

                <div className="px-8 space-y-4 flex-grow mb-8 relative z-0">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isCenter ? 'bg-accent text-white' : 'bg-[#22C55E] text-white'}`}>
                         <Check size={14} strokeWidth={4} />
                      </div>
                      <span className="text-neutral-text font-medium text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="px-8 pb-4 relative z-0">
                  <button
                    className={`w-full py-3.5 rounded-full font-bold transition-all transform hover:-translate-y-1 ${
                      isCenter
                        ? 'bg-gradient-to-r from-accent to-[#FFD700] text-white shadow-lg shadow-accent/30 hover:shadow-xl'
                        : 'bg-primary hover:bg-primary-hover text-white shadow-md shadow-primary/20'
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* MOBILE VIEW (Stacked Deck Slider)*/}
        <div className="md:hidden relative w-full max-w-sm mx-auto h-[680px] flex items-start justify-center pt-4">
            
            {/* Left Button */}
            {activeIndex > 0 && (
                <button 
                    onClick={handlePrev}
                    className="absolute left-0 top-[40%] z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary -ml-4"
                >
                    <ChevronLeft size={24} />
                </button>
            )}

            {/* Right Button */}
            {activeIndex < mobileOrderedPlans.length - 1 && (
                <button 
                    onClick={handleNext}
                    className="absolute right-0 top-[40%] z-50 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-primary -mr-4"
                >
                    <ChevronRight size={24} />
                </button>
            )}

            {/* Mobile Card Stack */}
            <div className="relative w-full h-full">
              {mobileOrderedPlans.map((plan, index) => {
                  const isCenter = plan.recommended; // PastiTembus (Now index 0 in mobile array)
                  
                  // Stacking Logic
                  // Active card is 0, Next is +1, NextNext is +2
                  // We calculate offset based on index - activeIndex
                  const offset = index - activeIndex;
                  
                  // If offset < 0 (prev card), hide or move away
                  // If offset = 0 (active), front center
                  // If offset > 0 (next), stack behind right
                  
                  let cardStyle = "";
                  let zIndex = 0;

                  if (offset === 0) {
                      // Active Card
                      cardStyle = "translate-x-0 scale-100 opacity-100";
                      zIndex = 30;
                  } else if (offset > 0) {
                      // Next Cards (Stacked behind to the right)
                      // Each subsequent card moves 16px right and scales down slightly
                      cardStyle = `translate-x-[${offset * 16}px] scale-[${1 - (offset * 0.05)}] opacity-100`;
                      zIndex = 30 - offset; // Lower z-index for further cards
                  } else {
                      // Previous Cards (Hidden)
                      cardStyle = "-translate-x-full opacity-0 pointer-events-none";
                      zIndex = 0;
                  }

                  return (
                      <div
                          key={`mobile-${index}`}
                          className={`
                              absolute top-0 left-0 right-0
                              flex flex-col w-full transition-all duration-500 ease-out
                              rounded-[30px] border
                              ${isCenter 
                                  ? 'bg-white shadow-2xl pt-12 pb-10 border-accent/20' 
                                  : 'bg-[#F0F9FF] pt-8 pb-8 border-primary/20 shadow-xl'
                              }
                              
                              /* Bottom Border */
                              border-b-[8px]
                              ${isCenter ? 'border-b-accent' : 'border-b-primary'}

                              ${cardStyle}
                          `}
                          style={{ 
                              zIndex: zIndex,
                              // Inline style for transform needed for dynamic values not in Tailwind safelist
                              transform: offset > 0 ? `translateX(${offset * 20}px) scale(${1 - (offset * 0.05)})` : undefined
                          }}
                      >
                          {/* Content */}
                          <div className="px-6 text-center">
                              <h3 className="text-xl font-bold text-neutral-text mb-1">{plan.name}</h3>
                              <div className="flex flex-col items-center justify-center min-h-[4rem]">
                                  {plan.originalPrice && (
                                      <span className="text-semantic-red line-through text-lg font-bold relative top-2">
                                      {plan.originalPrice}
                                      </span>
                                  )}
                                  
                                  {isCenter ? (
                                      <span className="text-5xl font-extrabold text-accent drop-shadow-sm tracking-wide mt-2">
                                          {plan.price}
                                      </span>
                                  ) : (
                                      <span className="text-4xl font-bold text-neutral-text mt-2">
                                          {plan.price}
                                      </span>
                                  )}
                              </div>
                              
                              <div className="text-sm text-neutral-text/70 mt-4 leading-relaxed px-2">
                                  Lorem lorem Lorem lorem Lorem lorem
                                  Lorem lorem Lorem lorem Lorem lorem
                              </div>
                          </div>

                          {/* Divider */}
                          <div className="w-full px-6 my-6">
                              <div className="h-px w-full bg-neutral-border"></div>
                          </div>

                          {/* Features */}
                          <div className="px-6 space-y-4 flex-grow mb-8">
                              {plan.features.map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-3">
                                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${isCenter ? 'bg-accent text-white' : 'bg-[#22C55E] text-white'}`}>
                                      <Check size={14} strokeWidth={4} />
                                  </div>
                                  <span className="text-neutral-text font-medium text-sm">{feature}</span>
                                  </div>
                              ))}
                          </div>

                          {/* Button */}
                          <div className="px-6 pb-2">
                              <button
                                  className={`w-full py-3.5 rounded-full font-bold shadow-md transition-all active:scale-95 ${
                                  isCenter
                                      ? 'bg-gradient-to-r from-accent to-[#FFD700] text-white shadow-accent/30'
                                      : 'bg-primary text-white shadow-primary/20'
                                  }`}
                              >
                                  {plan.buttonText}
                              </button>
                          </div>
                      </div>
                  );
              })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;