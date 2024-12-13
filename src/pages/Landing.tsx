import React, { useState } from 'react';
import Navbar from '../components/Landing/Navbar';
import Hero from '../components/Landing/Hero';
import Features from '../components/Landing/Features';
import Benefits from '../components/Landing/Benefits';
import MobileControlled from '../components/Landing/MobileControlled';
import Testimonials from '../components/Landing/Testimonials';

const Landing = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const handleGetStarted = () => {
    setAuthMode('signup');
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar 
        isAuthOpen={isAuthOpen}
        setIsAuthOpen={setIsAuthOpen}
        authMode={authMode}
        setAuthMode={setAuthMode}
      />
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <MobileControlled />
      <Benefits />
      <Testimonials />
    </div>
  );
};

export default Landing;