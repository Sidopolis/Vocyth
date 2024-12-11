// Free voices configuration
export const getAllVoices = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    return window.speechSynthesis.getVoices().map(voice => ({
      id: voice.voiceURI,
      name: voice.name,
      language: voice.lang,
      description: `${voice.name} (${voice.lang})`,
      preview: null, // Browser voices don't have previews
      tags: [
        voice.localService ? 'local' : 'remote',
        voice.name.toLowerCase().includes('female') ? 'female' : 'male',
        'natural'
      ]
    }));
  }
  return [];
};

export const getVoiceById = (voiceId) => {
  const voices = getAllVoices();
  return voices.find(voice => voice.id === voiceId) || null;
};

export const voiceEffects = {
  emotions: [
    'neutral',
    'happy',
    'sad',
    'excited',
    'calm',
    'professional'
  ],
  speeds: [
    { id: 'very-slow', value: 0.5 },
    { id: 'slow', value: 0.8 },
    { id: 'normal', value: 1.0 },
    { id: 'fast', value: 1.2 },
    { id: 'very-fast', value: 1.5 }
  ],
  pitches: [
    { id: 'very-low', value: 0.5 },
    { id: 'low', value: 0.8 },
    { id: 'normal', value: 1.0 },
    { id: 'high', value: 1.2 },
    { id: 'very-high', value: 1.5 }
  ],
  volumes: [
    { id: 'quiet', value: 0.5 },
    { id: 'normal', value: 1.0 },
    { id: 'loud', value: 1.5 }
  ]
};

// Helper functions for filtering voices
export const getVoicesByLanguage = (language) => {
  return getAllVoices().filter(voice => voice.language.startsWith(language));
};

export const getVoicesByTags = (tags) => {
  return getAllVoices().filter(voice => 
    tags.some(tag => voice.tags.includes(tag))
  );
};

export const getVoicesByGender = (gender) => {
  return getAllVoices().filter(voice => 
    voice.tags.includes(gender.toLowerCase())
  );
};

// Example usage:
/*
const allVoices = getAllVoices();
const englishVoices = getVoicesByLanguage('en');
const femaleVoices = getVoicesByGender('female');
const naturalVoices = getVoicesByTags(['natural']);

const voice = getVoiceById('some-voice-id');
const effects = voiceEffects.emotions;
*/ 