import React from 'react';
import { Link } from 'react-router-dom';

export default function DocHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/voice.svg" alt="Vocyth" className="w-8 h-8" />
            <span className="text-white text-xl font-light">Vocyth Docs</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/yourusername/vocyth" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <Link 
              to="/" 
              className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
} 