import React from 'react';
import { motion } from 'framer-motion';
import { 
  BeakerIcon, 
  CpuChipIcon, 
  CodeBracketIcon, 
  CommandLineIcon,
  ChatBubbleLeftRightIcon,
  CogIcon
} from '@heroicons/react/24/outline';

export default function DocSidebar({ activeSection, setActiveSection }) {
  const sections = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: <BeakerIcon className="w-5 h-5" />,
      subsections: ['Introduction', 'Quick Start', 'Key Concepts']
    },
    {
      id: 'installation',
      name: 'Installation',
      icon: <CpuChipIcon className="w-5 h-5" />,
      subsections: ['NPM', 'Environment Setup', 'Configuration']
    },
    {
      id: 'api-reference',
      name: 'API Reference',
      icon: <CodeBracketIcon className="w-5 h-5" />,
      subsections: ['Voice Synthesis', 'Speech Recognition', 'Voice Analysis']
    },
    {
      id: 'voice-chat',
      name: 'Voice Chat',
      icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
      subsections: ['Basic Setup', 'Advanced Features', 'Customization']
    },
    {
      id: 'examples',
      name: 'Examples',
      icon: <CommandLineIcon className="w-5 h-5" />,
      subsections: ['Basic Examples', 'Real-world Usage', 'Best Practices']
    },
    {
      id: 'configuration',
      name: 'Configuration',
      icon: <CogIcon className="w-5 h-5" />,
      subsections: ['Settings', 'Voice Models', 'Advanced Options']
    }
  ];

  return (
    <aside className="w-64 fixed left-0 top-[73px] bottom-0 bg-black/90 border-r border-white/10 overflow-y-auto">
      <nav className="p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="space-y-2">
            <button
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm
                       transition-all duration-200 ${
                         activeSection === section.id
                           ? 'bg-white/10 text-white'
                           : 'text-white/70 hover:bg-white/5'
                       }`}
            >
              {section.icon}
              {section.name}
            </button>
            
            {/* Subsections */}
            {activeSection === section.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="ml-9 space-y-1"
              >
                {section.subsections.map((subsection) => (
                  <button
                    key={subsection}
                    className="w-full text-left px-4 py-1.5 text-sm text-white/50 
                             hover:text-white transition-colors rounded-lg hover:bg-white/5"
                  >
                    {subsection}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
} 