import React, { useState, useEffect } from 'react';
import Vocyth from '../lib/vocyth.js';

const VoiceDemo = () => {
  const [vocyth] = useState(new Vocyth());
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [text, setText] = useState('Hello! This is a test of the voice synthesis.');

  useEffect(() => {
    const loadVoices = async () => {
      await vocyth.init();
      setVoices(vocyth.getAvailableVoices());
    };
    loadVoices();
  }, []);

  const handleSpeak = async () => {
    try {
      await vocyth.synthesize({
        text,
        voice: selectedVoice,
        speed: 1,
        pitch: 1
      });
    } catch (error) {
      console.error('Speech failed:', error);
    }
  };

  return (
    <div className="p-6 space-y-4">
      <div>
        <label className="block text-sm text-white/70 mb-2">Select Voice</label>
        <select 
          className="w-full p-2 bg-black/30 border border-white/10 rounded-lg text-white"
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          <option value="">Choose a voice...</option>
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-white/70 mb-2">Text to Speak</label>
        <textarea
          className="w-full p-2 bg-black/30 border border-white/10 rounded-lg text-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
        />
      </div>

      <button
        onClick={handleSpeak}
        className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 
                 border border-purple-500/30 rounded-lg text-white
                 transition-all duration-300"
      >
        Speak
      </button>
    </div>
  );
};

export default VoiceDemo; 