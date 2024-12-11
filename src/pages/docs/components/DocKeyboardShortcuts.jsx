import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CommandLineIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function DocKeyboardShortcuts({ isOpen, setIsOpen, theme }) {
  const shortcuts = [
    { key: '⌘ K', description: 'Open search' },
    { key: '⌘ /', description: 'Show keyboard shortcuts' },
    { key: '⌘ [', description: 'Previous section' },
    { key: '⌘ ]', description: 'Next section' },
    { key: '⌘ D', description: 'Toggle dark mode' },
    { key: '⌘ \\', description: 'Toggle sidebar' },
    { key: 'ESC', description: 'Close modal' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`max-w-lg mx-auto mt-[20vh] rounded-xl shadow-2xl
                     ${theme === 'dark' 
                       ? 'bg-black/90 border border-white/10' 
                       : 'bg-white border border-gray-200'}`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <CommandLineIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
                  <h2 className={`text-lg font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Keyboard Shortcuts
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`p-1 rounded-lg transition-colors
                           ${theme === 'dark' 
                             ? 'hover:bg-white/10' 
                             : 'hover:bg-gray-100'}`}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="grid gap-3">
                {shortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg
                             ${theme === 'dark' 
                               ? 'bg-white/5 hover:bg-white/10' 
                               : 'bg-gray-50 hover:bg-gray-100'}`}
                  >
                    <span className={theme === 'dark' ? 'text-white/70' : 'text-gray-600'}>
                      {shortcut.description}
                    </span>
                    <kbd className={`px-2 py-1 rounded text-sm font-mono
                                 ${theme === 'dark'
                                   ? 'bg-black/50 border border-white/10 text-white/70'
                                   : 'bg-white border border-gray-200 text-gray-500'}`}>
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 