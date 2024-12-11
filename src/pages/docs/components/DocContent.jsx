import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  PlayIcon,
  StopIcon
} from '@heroicons/react/24/outline';

export default function DocContent({ activeSection, theme }) {
  const [activeDemo, setActiveDemo] = useState(null);

  const renderInteractiveDemo = ({ id, title, description, code, preview }) => {
    const isActive = activeDemo === id;

    return (
      <div className="p-4 bg-black/30 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-white font-medium">{title}</h4>
            <p className="text-sm text-white/50">{description}</p>
          </div>
          <button
            onClick={() => setActiveDemo(isActive ? null : id)}
            className={`p-2 rounded-lg transition-colors ${
              isActive 
                ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20' 
                : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
            }`}
          >
            {isActive ? <StopIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
          </button>
        </div>

        <div className="space-y-4">
          {renderCodeBlock(code)}
          
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-white/10 pt-4"
            >
              {preview}
            </motion.div>
          )}
        </div>
      </div>
    );
  };

  const renderCodeBlock = (code, language = 'javascript') => (
    <div className="relative group">
      <pre className="p-4 bg-black/50 border border-white/10 rounded-lg overflow-x-auto">
        <code className="text-sm text-white/90">{code}</code>
      </pre>
      <button 
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 px-2 py-1 bg-white/5 rounded-md 
                 text-xs text-white/50 opacity-0 group-hover:opacity-100 
                 hover:bg-white/10 transition-all"
      >
        Copy
      </button>
    </div>
  );

  const renderNote = ({ type = 'info', title, children }) => (
    <div className={`p-4 rounded-lg border ${
      type === 'warning' 
        ? 'bg-yellow-500/10 border-yellow-500/20' 
        : 'bg-purple-500/10 border-purple-500/20'
    }`}>
      <div className="flex items-start gap-3">
        {type === 'warning' 
          ? <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />
          : <CheckCircleIcon className="w-5 h-5 text-purple-500" />
        }
        <div>
          <h4 className="text-white font-medium mb-1">{title}</h4>
          <div className="text-white/70 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );

  const content = {
    'installation': {
      title: 'Installation Guide',
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-white">Installation Steps</h2>
            
            {renderNote({
              title: 'Prerequisites',
              children: 'Node.js >= 14.0.0 and npm >= 6.0.0 are required.'
            })}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-light text-white mb-4">1. NPM Installation</h3>
                {renderCodeBlock(`npm install @vocyth/core @vocyth/react`)}
              </div>

              <div>
                <h3 className="text-xl font-light text-white mb-4">2. Environment Setup</h3>
                {renderCodeBlock(`# .env
VITE_GROQ_API_KEY=your-api-key-here
VOCYTH_MODEL=mixtral-8x7b-32768`)}
              </div>

              <div>
                <h3 className="text-xl font-light text-white mb-4">3. Basic Configuration</h3>
                {renderCodeBlock(`// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // ... other config
  define: {
    'process.env.VITE_GROQ_API_KEY': JSON.stringify(process.env.VITE_GROQ_API_KEY),
  }
})`)}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-light text-white">Package Options</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h3 className="text-lg font-medium text-white mb-2">@vocyth/core</h3>
                <p className="text-white/70 text-sm">Core functionality for voice synthesis and analysis</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <h3 className="text-lg font-medium text-white mb-2">@vocyth/react</h3>
                <p className="text-white/70 text-sm">React components and hooks for easy integration</p>
              </div>
            </div>
          </section>
        </div>
      )
    },
    'examples': {
      title: 'Code Examples',
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-white">Basic Examples</h2>
            
            {renderInteractiveDemo({
              id: 'basic-synthesis',
              title: 'Basic Voice Synthesis',
              description: 'Convert text to speech',
              code: `import { VoiceSynthesizer } from '@vocyth/core';

const synthesizer = new VoiceSynthesizer({
  voice: 'en-US-Neural2-F'
});

// Convert text to speech
await synthesizer.speak('Hello, welcome to Vocyth!');`,
              preview: (
                <div className="p-4 bg-black/50 rounded-lg">
                  <div className="flex items-center justify-center gap-4">
                    <button className="px-4 py-2 bg-purple-500/20 text-purple-500 
                                   rounded-lg hover:bg-purple-500/30 transition-colors">
                      Play Audio
                    </button>
                  </div>
                </div>
              )
            })}

            {renderInteractiveDemo({
              id: 'react-component',
              title: 'React Component Example',
              description: 'Using Vocyth in React',
              code: `import { useVoice } from '@vocyth/react';

function VoiceComponent() {
  const { speak, isLoading } = useVoice();

  return (
    <button 
      onClick={() => speak('Hello!')}
      disabled={isLoading}
    >
      {isLoading ? 'Speaking...' : 'Speak'}
    </button>
  );
}`,
              preview: (
                <div className="p-4 bg-black/50 rounded-lg">
                  <button 
                    className="px-4 py-2 bg-purple-500/20 text-purple-500 
                             rounded-lg hover:bg-purple-500/30 transition-colors"
                  >
                    Try Component
                  </button>
                </div>
              )
            })}
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-light text-white">Advanced Examples</h2>
            {renderNote({
              type: 'warning',
              title: 'Advanced Usage',
              children: 'These examples demonstrate more complex features. Make sure you understand the basics first.'
            })}
            
            {/* Add more advanced examples */}
          </section>
        </div>
      )
    },
    'getting-started': {
      title: 'Getting Started with Vocyth',
      description: 'Learn how to integrate Vocyth into your applications.',
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-white">Quick Start</h2>
            <p className="text-white/70">
              Vocyth provides a simple way to add voice capabilities to your applications.
              Follow these steps to get started quickly.
            </p>
            
            {renderNote({
              title: 'Prerequisites',
              children: 'Make sure you have Node.js >= 14.0.0 and npm >= 6.0.0 installed.'
            })}

            {renderCodeBlock(`npm install @vocyth/core @vocyth/react`)}
            
            <h3 className="text-xl font-light text-white mt-8">Basic Usage</h3>
            {renderCodeBlock(`import { Vocyth } from '@vocyth/core';

const vocyth = new Vocyth({
  apiKey: 'your-api-key',
  model: 'mixtral-8x7b-32768'
});

// Initialize voice synthesis
await vocyth.init();

// Start using voice features
const response = await vocyth.synthesize({
  text: 'Hello, World!',
  voice: 'en-US-Neural2-F'
});`)}
          </section>

          {renderNote({
            type: 'warning',
            title: 'Important Security Note',
            children: 'Never expose your API keys in client-side code. Use environment variables instead.'
          })}
        </div>
      )
    },
    'voice-chat': {
      title: 'Voice Chat Integration',
      content: (
        <div className="space-y-8">
          <section className="space-y-4">
            <h2 className="text-2xl font-light text-white">Interactive Voice Chat</h2>
            
            {renderInteractiveDemo({
              id: 'basic-voice-chat',
              title: 'Basic Voice Chat',
              description: 'Try out basic voice chat functionality',
              code: `const voiceChat = new Vocyth.VoiceChat({
  language: 'en-US',
  voice: 'en-US-Neural2-F'
});

// Start listening
await voiceChat.start();

// Handle voice input
voiceChat.onSpeech((text) => {
  console.log('User said:', text);
});`,
              preview: (
                <div className="p-4 bg-black/50 rounded-lg">
                  <div className="flex items-center justify-center gap-4">
                    <button className="px-4 py-2 bg-purple-500/20 text-purple-500 
                                   rounded-lg hover:bg-purple-500/30 transition-colors">
                      Start Recording
                    </button>
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  </div>
                  <div className="mt-4 text-center text-white/50 text-sm">
                    Click to start recording your voice
                  </div>
                </div>
              )
            })}

            {renderInteractiveDemo({
              id: 'voice-analysis',
              title: 'Voice Analysis',
              description: 'Analyze voice patterns and emotions',
              code: `const analyzer = new Vocyth.VoiceAnalyzer();

// Start analysis
const analysis = await analyzer.analyze({
  text: 'Hello, how are you?',
  voice: 'en-US-Neural2-F'
});

console.log('Emotion:', analysis.emotion);
console.log('Confidence:', analysis.confidence);`,
              preview: (
                <div className="p-4 bg-black/50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Emotion</span>
                      <span className="text-purple-500">Happy</span>
                    </div>
                    <div className="h-2 bg-black/50 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-purple-500 rounded-full" />
                    </div>
                    <div className="text-right text-sm text-white/50">
                      75% confidence
                    </div>
                  </div>
                </div>
              )
            })}
          </section>
        </div>
      )
    },
    // Add more sections as needed
  };

  return (
    <motion.div
      key={activeSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="prose prose-invert max-w-none"
    >
      {content[activeSection]?.content}
    </motion.div>
  );
} 