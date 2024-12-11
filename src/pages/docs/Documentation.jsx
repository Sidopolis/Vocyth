import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './context/ThemeContext';

// Import all components from barrel file
import {
  DocSidebar,
  DocHeader,
  DocContent,
  DocSearch,
  DocKeyboardShortcuts,
  DocInteractiveDemo,
  DocAdvancedExamples
} from './components';

export default function Documentation() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');
  const [isSearching, setIsSearching] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setShowKeyboardShortcuts(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle mobile menu
  const toggleMobileMenu = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    }
  };

  // Handle search selection
  const handleSearchSelect = (path) => {
    setActiveSection(path);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  // Add scroll management
  useEffect(() => {
    // Reset scroll position on mount
    window.scrollTo(0, 0);
    
    // Prevent scroll position restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Handle route changes
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  // Handle section changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
      <DocHeader 
        theme={theme} 
        toggleTheme={toggleTheme}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleMobileMenu}
        isMobile={isMobile}
        onShowKeyboardShortcuts={() => setShowKeyboardShortcuts(true)}
      />
      
      <div className="flex">
        <AnimatePresence mode="wait">
          {(sidebarOpen || !isMobile) && (
            <motion.div
              initial={isMobile ? { x: -300 } : false}
              animate={{ x: 0 }}
              exit={isMobile ? { x: -300 } : false}
              className={`${isMobile ? 'fixed inset-y-0 left-0 z-40' : 'relative'}`}
            >
              <DocSidebar 
                activeSection={activeSection} 
                setActiveSection={(section) => {
                  setActiveSection(section);
                  if (isMobile) toggleMobileMenu();
                  window.scrollTo(0, 0); // Scroll to top on section change
                }}
                theme={theme}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <main className={`flex-1 transition-all duration-300
                       ${(!isMobile && sidebarOpen) ? 'ml-64' : 'ml-0'}
                       pt-16 px-4 md:px-6 lg:px-8`}> {/* Adjusted padding-top */}
          <div className="max-w-4xl mx-auto">
            <DocSearch 
              query={searchQuery}
              setQuery={setSearchQuery}
              setIsSearching={setIsSearching}
              theme={theme}
              onSelect={handleSearchSelect}
            />

            <DocContent 
              activeSection={activeSection}
              isSearching={isSearching}
              searchQuery={searchQuery}
              theme={theme}
            >
              {activeSection === 'interactive-demo' && (
                <DocInteractiveDemo theme={theme} />
              )}
              {activeSection === 'advanced-examples' && (
                <DocAdvancedExamples theme={theme} />
              )}
            </DocContent>
          </div>
        </main>
      </div>

      <DocKeyboardShortcuts 
        isOpen={showKeyboardShortcuts}
        setIsOpen={setShowKeyboardShortcuts}
        theme={theme}
      />
    </div>
  );
} 