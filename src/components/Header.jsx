import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Enhanced scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Only update active section if not in initial load
      if (!isInitialLoad) {
        const sections = ['features', 'use-cases', 'developers', 'pricing'];
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(sectionId);
              break;
            }
          }
        }

        // Reset active section when at the top
        if (window.scrollY < 100) {
          setActiveSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isInitialLoad]);

  // Smooth scroll with dynamic offset
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Add offset for header height
      const headerHeight = 80; // Adjust this value based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Modern navigation items
  const navItems = [
    { id: 'features', label: 'Features', icon: '○' },
    { id: 'usecases', label: 'Use Cases', icon: '◇' },
    { id: 'developer', label: 'Developers', icon: '□' },
    { id: 'pricing', label: 'Pricing', icon: '△' }
  ];

  const navigation = [
    { name: 'Features', sectionId: 'features' },
    { name: 'Use Cases', sectionId: 'use-cases' },
    { name: 'Developers', sectionId: 'developers' },
    { name: 'Pricing', sectionId: 'pricing' }
  ];

  const scrollToWaitlist = () => {
    const element = document.getElementById('waitlist');
    if (element) {
      const headerHeight = 80; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Add this to clear any stored scroll position on initial load
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    setIsInitialLoad(false);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
                    ${isScrolled 
                      ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' 
                      : 'bg-transparent'}`}
      >
        <nav className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center
                          border border-white/20 group-hover:border-white/30 transition-all"
              >
                <motion.img 
                  src="/voice.svg" 
                  alt="Vocyth" 
                  className="w-6 h-6"
                  animate={{ rotate: isScrolled ? 360 : 0 }}
                  transition={{ duration: 0.7 }}
                />
              </motion.div>
              <span className="text-white font-light text-xl tracking-wider">
                Voc<span className="font-semibold bg-clip-text text-transparent 
                              bg-gradient-to-r from-white to-white/90">yth</span>
              </span>
            </motion.div>

            {/* Main Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-white/70 hover:text-white transition-colors">
                Home
              </Link>
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.sectionId)}
                  className={`text-sm transition-colors relative
                    ${activeSection === item.sectionId 
                      ? 'text-white' 
                      : 'text-white/70 hover:text-white'}`}
                >
                  {item.name}
                  {activeSection === item.sectionId && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] 
                               bg-gradient-to-r from-purple-500/50 via-white to-blue-500/50"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              <Link
                to="/docs"
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg
                         text-white/80 hover:text-white hover:bg-white/5
                         transition-all duration-300 border border-white/10 hover:border-white/20"
              >
                <span className="text-xs">○</span>
                Documentation
              </Link>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToWaitlist}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-500/80 to-blue-500/80 
                         text-white hover:from-purple-500 hover:to-blue-500
                         transition-all duration-300
                         border border-white/10 hover:border-white/20
                         text-sm font-medium"
              >
                Join Beta
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden relative w-10 h-10 rounded-xl bg-white/5 
                         border border-white/10 flex items-center justify-center"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-white transform transition-all duration-300 
                                ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`w-full h-0.5 bg-white transition-all duration-300 
                                ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-white transform transition-all duration-300 
                                ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[88px] left-0 right-0 bg-black/95 backdrop-blur-xl 
                     border-b border-white/5 md:hidden"
          >
            <div className="max-w-7xl mx-auto px-8 py-6">
              <div className="flex flex-col gap-4">
                {navigation.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => {
                      scrollToSection(item.sectionId);
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 text-white/50 hover:text-white 
                             transition-colors py-2"
                  >
                    {item.name}
                  </motion.button>
                ))}
                <Link
                  to="/docs"
                  className="flex items-center gap-3 text-white/50 hover:text-white 
                           transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Documentation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}