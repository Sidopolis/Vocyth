import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlayIcon, 
  StopIcon, 
  AdjustmentsHorizontalIcon,
  SpeakerWaveIcon
} from '@heroicons/react/24/outline';

export default function DocInteractiveDemo({ theme }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [settings, setSettings] = useState({
    voice: 'en-US-Neural2-F',
    speed: 1,
    pitch: 1,
    effect: 'none'
  });

  // Simulate audio level changes
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const visualizerVariants = {
    recording: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
      }
    },
    idle: {
      scale: 1
    }
  };

  return (
    <div className="space-y-6 p-6 bg-black/30 rounded-xl border border-white/10">
      {/* Voice Visualizer */}
      <div className="relative h-32 bg-black/50 rounded-lg overflow-hidden">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          variants={visualizerVariants}
          animate={isRecording ? 'recording' : 'idle'}
        >
          <SpeakerWaveIcon className={`w-16 h-16 ${
            isRecording ? 'text-purple-500' : 'text-white/20'
          }`} />
        </motion.div>
        
        {/* Audio Level Bars */}
        <div className="absolute inset-0 flex items-end justify-center gap-1 p-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 bg-purple-500/50 rounded-t"
              initial={{ height: 0 }}
              animate={{ 
                height: isRecording ? `${Math.random() * 100}%` : '0%'
              }}
              transition={{
                duration: 0.5,
                repeat: isRecording ? Infinity : 0,
                repeatType: 'reverse'
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsRecording(!isRecording)}
          className={`p-4 rounded-lg flex items-center justify-center gap-2
                   transition-colors ${
                     isRecording 
                       ? 'bg-red-500/20 text-red-500' 
                       : 'bg-purple-500/20 text-purple-500'
                   }`}
        >
          {isRecording ? (
            <>
              <StopIcon className="w-5 h-5" />
              Stop Recording
            </>
          ) : (
            <>
              <PlayIcon className="w-5 h-5" />
              Start Recording
            </>
          )}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="p-4 rounded-lg bg-white/5 text-white/70 
                   hover:bg-white/10 transition-colors"
        >
          Play Sample
        </motion.button>
      </div>

      {/* Settings */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-white/70">
          <AdjustmentsHorizontalIcon className="w-5 h-5" />
          <h3>Voice Settings</h3>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="text-sm text-white/50 mb-2 block">Voice</label>
            <select
              value={settings.voice}
              onChange={(e) => setSettings({ ...settings, voice: e.target.value })}
              className="w-full bg-black/50 rounded-lg p-2 text-white border border-white/10"
            >
              <option value="en-US-Neural2-F">English (Female)</option>
              <option value="en-US-Neural2-M">English (Male)</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-white/50 mb-2 block">Effect</label>
            <select
              value={settings.effect}
              onChange={(e) => setSettings({ ...settings, effect: e.target.value })}
              className="w-full bg-black/50 rounded-lg p-2 text-white border border-white/10"
            >
              <option value="none">None</option>
              <option value="reverb">Reverb</option>
              <option value="echo">Echo</option>
              <option value="pitch-shift">Pitch Shift</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-white/50 mb-2 block">
              Speed: {settings.speed}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.speed}
              onChange={(e) => setSettings({ ...settings, speed: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm text-white/50 mb-2 block">
              Pitch: {settings.pitch}x
            </label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.pitch}
              onChange={(e) => setSettings({ ...settings, pitch: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 