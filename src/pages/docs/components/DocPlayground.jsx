import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, StopIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

export default function DocPlayground() {
  const [code, setCode] = useState(`// Try Vocyth voice features
const vocyth = new Vocyth({
  language: 'en-US',
  voice: 'en-US-Neural2-F'
});

// Start voice chat
await vocyth.start();`);
  
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('');
  const [settings, setSettings] = useState({
    voice: 'en-US-Neural2-F',
    speed: 1,
    pitch: 1
  });

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running voice synthesis...');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setOutput('Voice synthesis completed successfully!');
    } catch (error) {
      setOutput('Error: ' + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-black/30 rounded-xl border border-white/10 overflow-hidden">
      <div className="border-b border-white/10 p-4">
        <h3 className="text-lg font-medium text-white">Interactive Playground</h3>
        <p className="text-sm text-white/50">Test Vocyth features in real-time</p>
      </div>

      <div className="grid lg:grid-cols-2 divide-x divide-white/10">
        {/* Code Editor */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white/70">Code Editor</h4>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isRunning 
                  ? 'bg-red-500/10 text-red-500' 
                  : 'bg-green-500/10 text-green-500 hover:bg-green-500/20'
              }`}
            >
              {isRunning ? (
                <>
                  <StopIcon className="w-4 h-4" />
                  Stop
                </>
              ) : (
                <>
                  <PlayIcon className="w-4 h-4" />
                  Run
                </>
              )}
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-[300px] bg-black/50 rounded-lg p-4 
                     text-white/90 font-mono text-sm resize-none
                     border border-white/10 focus:border-purple-500/50 
                     focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        {/* Output & Settings */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white/70">Output</h4>
            <button
              onClick={() => setOutput('')}
              className="text-xs text-white/50 hover:text-white"
            >
              Clear
            </button>
          </div>

          <div className="h-[200px] bg-black/50 rounded-lg p-4 
                        border border-white/10 overflow-y-auto
                        text-sm font-mono text-white/70">
            {output || 'Output will appear here...'}
          </div>

          <div className="mt-6">
            <div className="flex items-center gap-2 mb-4">
              <AdjustmentsHorizontalIcon className="w-4 h-4 text-white/70" />
              <h4 className="text-sm font-medium text-white/70">Settings</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/50 mb-2 block">Voice</label>
                <select
                  value={settings.voice}
                  onChange={(e) => setSettings({ ...settings, voice: e.target.value })}
                  className="w-full bg-black/50 rounded-lg p-2 
                           text-white border border-white/10"
                >
                  <option value="en-US-Neural2-F">English (Female)</option>
                  <option value="en-US-Neural2-M">English (Male)</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-white/50 mb-2 block">Speed</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.speed}
                  onChange={(e) => setSettings({ ...settings, speed: e.target.value })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm text-white/50 mb-2 block">Pitch</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.pitch}
                  onChange={(e) => setSettings({ ...settings, pitch: e.target.value })}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 