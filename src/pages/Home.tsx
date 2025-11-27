import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CTASection from '../components/CTASection';
import WhyUs from '../components/WhyUs';
import JejaringPintar from '../components/JejaringPintar';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CTASection />
        <WhyUs />
        <JejaringPintar />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
};

export default Home;
