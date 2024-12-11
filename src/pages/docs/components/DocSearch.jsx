import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, CommandLineIcon, ArrowRightIcon, CodeBracketIcon, BookOpenIcon, DocumentIcon } from '@heroicons/react/24/outline';
import Fuse from 'fuse.js';

// Enhanced searchable content
const searchableContent = [
  {
    title: 'Getting Started',
    path: 'getting-started',
    content: 'Quick start guide for Vocyth integration...',
    tags: ['setup', 'installation', 'quickstart'],
    type: 'guide'
  },
  {
    title: 'Voice Synthesis',
    path: 'api-reference/synthesis',
    content: 'Learn about voice synthesis API and features...',
    tags: ['api', 'synthesis', 'voice'],
    type: 'api'
  },
  // Add more content categories
];

const fuseOptions = {
  keys: ['title', 'content', 'tags'],
  threshold: 0.3,
  includeMatches: true,
  minMatchCharLength: 2
};

const fuse = new Fuse(searchableContent, fuseOptions);

export default function DocSearch({ query, setQuery, setIsSearching, theme, onSelect }) {
  const searchRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsModalOpen(true);
      } else if (e.key === 'Escape') {
        setIsModalOpen(false);
      } else if (isModalOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
        } else if (e.key === 'Enter' && searchResults[selectedIndex]) {
          e.preventDefault();
          handleSelect(searchResults[selectedIndex].item);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, searchResults, selectedIndex]);

  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    if (searchTerm.length > 1) {
      const results = fuse.search(searchTerm);
      setSearchResults(results);
      setSelectedIndex(0);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSelect = (item) => {
    onSelect?.(item.path);
    setIsModalOpen(false);
    setQuery('');
    setSearchResults([]);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'api':
        return <CodeBracketIcon className="w-5 h-5 text-blue-500" />;
      case 'guide':
        return <BookOpenIcon className="w-5 h-5 text-green-500" />;
      default:
        return <DocumentIcon className="w-5 h-5 text-purple-500" />;
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsModalOpen(true)}
        className="relative cursor-pointer mb-8"
      >
        <div className="relative">
          <input
            readOnly
            placeholder="Search documentation... (⌘K)"
            className={`w-full px-4 py-3 pl-12 rounded-xl cursor-pointer
                     ${theme === 'dark' 
                       ? 'bg-black/50 border border-white/10 text-white placeholder-white/50' 
                       : 'bg-gray-100 border border-gray-200 text-gray-900 placeholder-gray-500'}`}
          />
          <MagnifyingGlassIcon className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5
                                       ${theme === 'dark' ? 'text-white/50' : 'text-gray-500'}`} />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 
                        flex items-center gap-1 px-2 py-1 rounded-md border
                        text-xs opacity-50">
            ⌘K
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl mx-auto mt-[20vh] p-2 bg-black/90 rounded-xl 
                       border border-white/10 shadow-2xl"
            >
              <div className="relative">
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search documentation..."
                  autoFocus
                  className="w-full px-4 py-3 pl-12 bg-transparent text-white 
                           placeholder-white/50 border-none focus:ring-0"
                />
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 
                                              transform -translate-y-1/2 w-5 h-5 text-white/50" />
              </div>

              <div className="max-h-[60vh] overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="p-2 space-y-2">
                    {searchResults.map((result, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSelect(result.item)}
                        className={`w-full p-3 flex items-start gap-3 rounded-lg
                                 transition-colors text-left
                                 ${index === selectedIndex 
                                   ? 'bg-white/10' 
                                   : 'hover:bg-white/5'}`}
                      >
                        {getTypeIcon(result.item.type)}
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{result.item.title}</h4>
                          <p className="text-sm text-white/50 line-clamp-2">
                            {result.item.content}
                          </p>
                          <div className="mt-1 flex gap-2">
                            {result.item.tags.map((tag, i) => (
                              <span 
                                key={i}
                                className="px-2 py-0.5 bg-purple-500/10 rounded-full
                                         text-purple-500 text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ArrowRightIcon className="w-5 h-5 text-white/30" />
                      </motion.button>
                    ))}
                  </div>
                ) : query && (
                  <div className="p-8 text-center text-white/50">
                    No results found for "{query}"
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 