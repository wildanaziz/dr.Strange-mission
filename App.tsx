import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './src/context/AuthContext';
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
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import ForgotPassword from './src/pages/ForgotPassword';
import ResetPassword from './src/pages/ResetPassword';
import AuthCallback from './src/pages/AuthCallback';
import Dashboard from './src/pages/Dashboard';
import Profile from './src/pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      {/* AuthProvider wraps everything so ALL components can access auth state */}
      <AuthProvider>
      <Routes>
        {/* Home Route - Your existing landing page */}
        <Route path="/" element={
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
        } />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* OAuth callback route - handles Google OAuth redirect */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Dashboard Route - User lands here after login */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Profile Route - User profile settings */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}