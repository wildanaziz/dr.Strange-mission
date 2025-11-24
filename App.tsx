import React from 'react';
import Navbar from './src/components/Navbar';
import Hero from './src/components/Hero';
import CTASection from './src/components/CTASection';
import WhyUs from './src/components/WhyUs';
import JejaringPintar from './src/components/JejaringPintar';
import LogoTicker from './src/components/LogoTicker';
import Testimonials from './src/components/Testimonials';
import Pricing from './src/components/Pricing';
import FAQ from './src/components/FAQ';
import Footer from './src/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-bg font-sans text-neutral-text selection:bg-accent selection:text-secondary-dark">
      <Navbar />
      <main>
        <Hero />
        {/* Section 2: Call To Action / University Acceptance */}
        <CTASection />
        
        <WhyUs />

        <JejaringPintar />
        
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}