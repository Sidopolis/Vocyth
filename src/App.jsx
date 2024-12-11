import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import CircularFeature from './components/CircularFeature.jsx';
import UseCases from './components/UseCases.jsx';
import DeveloperSection from './components/DeveloperSection.jsx';
import Testimonials from './components/Testimonials.jsx';
import Pricing from './components/Pricing.jsx';
import FAQ from './components/FAQ.jsx';
import Footer from './components/Footer.jsx';
import AIChatWidget from './components/AIChatWidget.jsx';
import Documentation from './pages/docs/Documentation.jsx';
import { ThemeProvider } from './pages/docs/context/ThemeContext';

// Scroll to top component
function ScrollToTop() {
  const location = useLocation();
  
  useEffect(() => {
    // Force scroll to top with a slight delay to ensure DOM is ready
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // Use instant instead of smooth for immediate effect
      });
    }, 0);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

// Wrapper component to handle home page scroll
function HomeWrapper() {
  useEffect(() => {
    // Force scroll to top on mount
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <CircularFeature />
      <Features />
      <UseCases />
      <DeveloperSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
      <AIChatWidget />
    </>
  );
}

export default function App() {
  // Disable browser's scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    // Force initial scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomeWrapper />} />
          <Route path="/docs/*" element={<Documentation />} />
          <Route path="/documentation" element={<Navigate to="/docs" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}