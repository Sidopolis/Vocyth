import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BeakerIcon, 
  SpeakerWaveIcon, 
  CodeBracketIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

export default function DocAdvancedExamples({ theme }) {
  const [activeTab, setActiveTab] = useState('voice-effects');

  const examples = {
    'voice-effects': {
      title: 'Voice Effects & Filters',
      code: `import { VoiceProcessor } from '@vocyth/core';

const processor = new VoiceProcessor();

// Apply effects chain
await processor.addEffect('reverb', { 
  roomSize: 0.8, 
  dampening: 3000 
});

await processor.addEffect('pitch', { 
  shift: 1.5,
  timeStretch: true
});

// Process audio
const enhancedAudio = await processor.process(audioBuffer);`,
      demo: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <button className="p-3 bg-purple-500/10 rounded-lg text-purple-500 
                           hover:bg-purple-500/20 transition-colors">
              Original Audio
            </button>
            <button className="p-3 bg-purple-500/10 rounded-lg text-purple-500 
                           hover:bg-purple-500/20 transition-colors">
              Processed Audio
            </button>
          </div>
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="h-24 bg-purple-500/10 rounded-lg relative overflow-hidden">
              <motion.div 
                className="absolute inset-0 bg-purple-500/20"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 0%'],
                  transition: { duration: 2, repeat: Infinity }
                }}
              />
            </div>
          </div>
        </div>
      )
    },
    'voice-recognition': {
      title: 'Advanced Voice Recognition',
      code: `import { VoiceRecognizer } from '@vocyth/core';

const recognizer = new VoiceRecognizer({
  model: 'enhanced',
  language: 'en-US',
  features: {
    sentiment: true,
    speaker: true,
    language: true
  }
});

// Start recognition with advanced features
recognizer.start({
  onResult: (result) => {
    console.log('Text:', result.text);
    console.log('Sentiment:', result.sentiment);
    console.log('Speaker ID:', result.speakerId);
    console.log('Language:', result.detectedLanguage);
  }
});`,
      demo: (
        <div className="space-y-4">
          <div className="p-4 bg-black/30 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white/70">Recognition Status</span>
                <span className="text-green-500">Active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Detected Language</span>
                <span className="text-purple-500">English (US)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Sentiment</span>
                <span className="text-blue-500">Positive (0.8)</span>
              </div>
            </div>
          </div>
          <button className="w-full p-3 bg-purple-500/10 rounded-lg text-purple-500 
                         hover:bg-purple-500/20 transition-colors">
            Start Recognition
          </button>
        </div>
      )
    }
  };

  return (
    <div className={`rounded-xl overflow-hidden border
                  ${theme === 'dark' 
                    ? 'bg-black/30 border-white/10' 
                    : 'bg-white border-gray-200'}`}>
      <div className="border-b border-white/10 p-4">
        <h3 className="text-lg font-medium text-white">Advanced Examples</h3>
        <div className="mt-4 flex gap-2">
          {Object.keys(examples).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors
                       ${activeTab === key
                         ? 'bg-purple-500/20 text-purple-500'
                         : 'text-white/50 hover:text-white/70'}`}
            >
              {examples[key].title}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <pre className="p-4 bg-black/50 rounded-lg overflow-x-auto">
            <code className="text-sm text-white/90">
              {examples[activeTab].code}
            </code>
          </pre>
          {examples[activeTab].demo}
        </div>
      </div>
    </div>
  );
} 